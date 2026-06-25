package main

import (
	"log"
	"nutrition-backend/db"
	"nutrition-backend/models"
	"nutrition-backend/routes"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load() // or godotenv.Load(".env")

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173", // Vite
			"http://localhost:3000", // CRA
		},
		AllowMethods: []string{
			"GET", "POST", "PUT", "DELETE", "OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// 1. Connect SQLite DB
	err := db.InitDB()
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}

	// 2. Auto-create tables
	db.DB.AutoMigrate(
		&models.User{},
		&models.FoodLog{},
		&models.AICache{},
	)

	// 3. Register routes
	routes.RegisterRoutes(router)

	// 4. Start server
	router.Run(":8080")
}
