package routes

import (
	"nutrition-backend/controllers"
	"nutrition-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {

	// AUTH
	auth := router.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
		authProtected := auth.Group("/")
		authProtected.Use(middleware.AuthMiddleware())
		{
			authProtected.GET("/me", controllers.Me)
		}
	}

	// FOOD (protected)
	food := router.Group("/food")
	food.Use(middleware.AuthMiddleware())
	{
		food.POST("/analyze", controllers.AnalyzeFood)
		food.GET("/history", controllers.GetFoodHistory)
	}

	// ANALYTICS (protected)
	analytics := router.Group("/analytics")
	analytics.Use(middleware.AuthMiddleware())
	{
		analytics.GET("/daily", controllers.GetDailySummary)
		analytics.GET("/weekly", controllers.GetWeeklySummary)
	}
}
