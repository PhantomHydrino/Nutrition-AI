package controllers

import (
	"nutrition-backend/db"
	"nutrition-backend/models"
	"time"

	"github.com/gin-gonic/gin"
)

func GetDailySummary(c *gin.Context) {

	userID := c.GetUint("user_id")

	today := time.Now().Format("2006-01-02")

	var logs []models.FoodLog

	db.DB.Where("user_id = ? AND date(created_at) = ?", userID, today).
		Find(&logs)

	total := 0.0

	for _, l := range logs {
		total += l.Calories
	}

	insight := "Balanced intake"

	switch {
	case total < 1200:
		insight = "Calorie intake is quite low today. Ensure you're meeting your nutritional needs."
	case total <= 2000:
		insight = "Balanced intake"
	case total <= 2500:
		insight = "Slightly above the recommended daily calorie intake."
	default:
		insight = "High calorie intake detected. Consider reviewing portion sizes and food choices."
	}

	c.JSON(200, gin.H{
		"calories": total,
		"insight":  insight,
	})
}

func GetWeeklySummary(c *gin.Context) {

	userID := c.GetUint("user_id")

	start := time.Now().AddDate(0, 0, -7)

	var logs []models.FoodLog

	db.DB.Where("user_id = ? AND created_at >= ?", userID, start).
		Find(&logs)

	weekly := map[string]float64{}

	for _, l := range logs {
		day := l.CreatedAt.Format("2006-01-02")
		weekly[day] += l.Calories
	}

	c.JSON(200, weekly)
}
