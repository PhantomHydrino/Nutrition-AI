package controllers

import (
	"fmt"
	"nutrition-backend/db"
	"nutrition-backend/models"
	"nutrition-backend/services"

	"github.com/gin-gonic/gin"
)

type FoodRequest struct {
	Food string `json:"food"`
}

func AnalyzeFood(c *gin.Context) {

	userID := c.GetUint("user_id")

	fmt.Println("USER ID:", userID)

	var req FoodRequest
	c.ShouldBindJSON(&req)

	// AI + hybrid system
	result, err := services.AnalyzeWithAI(req.Food)

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	if result == nil {
		c.JSON(500, gin.H{
			"error": "AI returned nil result",
		})
		return
	}

	log := models.FoodLog{
		UserID: userID,
		Food:   req.Food,

		Calories: result.Calories,
		Protein:  result.Protein,
		Carbs:    result.Carbs,
		Fats:     result.Fats,
		Advice:   result.Advice,
	}

	fmt.Println("hello world")

	res := db.DB.Create(&log)
	fmt.Println("DB ERROR:", res.Error)
	fmt.Println("ROWS:", res.RowsAffected)
	c.JSON(200, log)
}

func GetFoodHistory(c *gin.Context) {

	userID := c.GetUint("user_id")

	var logs []models.FoodLog

	db.DB.Where("user_id = ?", userID).
		Order("created_at desc").
		Find(&logs)

	c.JSON(200, logs)
}
