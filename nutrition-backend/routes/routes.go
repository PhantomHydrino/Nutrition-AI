package routes

import (
	"nutrition-backend/controllers"
	"nutrition-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	// ── AUTH ──────────────────────────────────────────────────────────────────
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

	// ── FOOD (protected) ──────────────────────────────────────────────────────
	food := router.Group("/food")
	food.Use(middleware.AuthMiddleware())
	{
		food.POST("/analyze", controllers.AnalyzeFood)
		food.GET("/history", controllers.GetFoodHistory)
	}

	// ── ANALYTICS (protected) ────────────────────────────────────────────────
	analytics := router.Group("/analytics")
	analytics.Use(middleware.AuthMiddleware())
	{
		analytics.GET("/daily", controllers.GetDailySummary)
		analytics.GET("/weekly", controllers.GetWeeklySummary)
	}

	// ── HEALTH (protected) ───────────────────────────────────────────────────
	//
	// Flow:
	//   1. POST /health/profile  → create / update height, weight, age, gender, activity level
	//   2. GET  /health/profile  → read stored profile
	//   3. GET  /health/summary  → all deterministic calculations + AI narrative in one response
	//
	// The old individual routes (/metabolism, /bmi, /diet, /fitness) have been
	// removed. All data is now served through /health/summary to keep the client
	// simple and ensure AI insights always accompany the structured data.
	//
	health := router.Group("/health")
	health.Use(middleware.AuthMiddleware())
	{
		health.POST("/profile", controllers.UpdateProfile)
		health.GET("/profile", controllers.GetProfile)
		health.GET("/summary", controllers.GetHealthSummary)
	}
}
