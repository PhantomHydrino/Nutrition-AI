package controllers

import (
	"nutrition-backend/db"
	"nutrition-backend/models"
	"nutrition-backend/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type AuthRequest struct {
	Email    string
	Password string
}

func Register(c *gin.Context) {

	var req AuthRequest

	c.ShouldBindJSON(&req)

	hashed, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 14)

	user := models.User{
		Email:    req.Email,
		Password: string(hashed),
	}

	db.DB.Create(&user)

	c.JSON(200, gin.H{"message": "registered"})
}

func Login(c *gin.Context) {

	var req AuthRequest
	var user models.User

	c.ShouldBindJSON(&req)

	db.DB.Where("email = ?", req.Email).First(&user)

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		c.JSON(401, gin.H{"error": "invalid credentials"})
		return
	}

	token, _ := utils.GenerateToken(user.ID)

	c.JSON(200, gin.H{"token": token})
}

func Me(c *gin.Context) {
	userID := c.GetUint("user_id")

	var user models.User

	if err := db.DB.First(&user, userID).Error; err != nil {
		c.JSON(404, gin.H{"error": "user not found"})
		return
	}

	c.JSON(200, gin.H{
		"id":    user.ID,
		"email": user.Email,
	})
}
