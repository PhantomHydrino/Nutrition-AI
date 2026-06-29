package controllers

import (
	"net/http"
	"time"

	"nutrition-backend/db"
	"nutrition-backend/models"
	"nutrition-backend/services"

	"github.com/gin-gonic/gin"
)

// ─────────────────────────────────────────────
// Profile endpoints (unchanged)
// ─────────────────────────────────────────────

type ProfileRequest struct {
	Height        float64 `json:"height"`
	Weight        float64 `json:"weight"`
	Age           int     `json:"age"`
	Gender        string  `json:"gender"`
	ActivityLevel string  `json:"activity_level"`
}

func UpdateProfile(c *gin.Context) {
	userID := c.GetUint("user_id")
	var req ProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var profile models.UserProfile
	result := db.DB.Where("user_id = ?", userID).First(&profile)

	profile.UserID = userID
	profile.Height = req.Height
	profile.Weight = req.Weight
	profile.Age = req.Age
	profile.Gender = req.Gender
	profile.ActivityLevel = req.ActivityLevel

	if result.Error != nil {
		db.DB.Create(&profile)
	} else {
		db.DB.Save(&profile)
	}

	c.JSON(http.StatusOK, profile)
}

func GetProfile(c *gin.Context) {
	userID := c.GetUint("user_id")
	var profile models.UserProfile
	if err := db.DB.Where("user_id = ?", userID).First(&profile).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found. Please set up your profile first."})
		return
	}
	c.JSON(http.StatusOK, profile)
}

// ─────────────────────────────────────────────
// GET /health/summary
// ─────────────────────────────────────────────

// HealthSummaryResponse is the single merged payload for the dashboard.
type HealthSummaryResponse struct {
	Profile      models.UserProfile         `json:"profile"`
	Metabolism   services.MetabolismResult  `json:"metabolism"`
	BMI          services.BMIResult         `json:"bmi"`
	Diet         services.DietSuggestion    `json:"diet"`
	Fitness      services.FitnessAdvice     `json:"fitness"`
	FitnessScore services.FitnessScore      `json:"fitness_score"`
	AIInsights   *services.HealthAIInsights `json:"ai_insights"`
	GeneratedAt  time.Time                  `json:"generated_at"`
}

func GetHealthSummary(c *gin.Context) {
	userID := c.GetUint("user_id")

	// 1. Load profile
	var profile models.UserProfile
	if err := db.DB.Where("user_id = ?", userID).First(&profile).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Profile not found. Please POST /health/profile first.",
		})
		return
	}

	// 2. Load recent food logs (last 7 days)
	var foodLogs []models.FoodLog
	db.DB.Where("user_id = ? AND created_at >= ?", userID, time.Now().AddDate(0, 0, -7)).
		Order("created_at desc").
		Limit(20).
		Find(&foodLogs)

	// 3. Compute deterministic values
	metabolism := services.CalculateMetabolism(profile)
	bmi := services.CalculateBMI(profile)
	diet := services.GetDietSuggestion(profile, metabolism.TDEE)
	fitness := services.GetFitnessAdvice(profile, bmi)

	fitnessScore := services.CalculateFitnessScore(
		profile,
		bmi,
		fitness,
	)

	// 4. Call AI for narrative fields
	aiInput := services.HealthAIInput{
		Profile:      profile,
		Metabolism:   metabolism,
		BMI:          bmi,
		Diet:         diet,
		Fitness:      fitness,
		FitnessScore: fitnessScore,
		FoodLogs:     foodLogs,
	}

	aiInsights, err := services.AskHealthAI(aiInput)
	if err != nil {
		// AI failure is non-fatal — return deterministic data with a nil AI block
		c.JSON(http.StatusOK, HealthSummaryResponse{
			Profile:      profile,
			Metabolism:   metabolism,
			BMI:          bmi,
			Diet:         diet,
			Fitness:      fitness,
			FitnessScore: fitnessScore,
			AIInsights:   nil,
			GeneratedAt:  time.Now(),
		})
		return
	}

	// 5. Merge and respond
	c.JSON(http.StatusOK, HealthSummaryResponse{
		Profile:      profile,
		Metabolism:   metabolism,
		BMI:          bmi,
		Diet:         diet,
		Fitness:      fitness,
		FitnessScore: fitnessScore,
		AIInsights:   aiInsights,
		GeneratedAt:  time.Now(),
	})
}
