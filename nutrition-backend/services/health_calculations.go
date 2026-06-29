package services

import (
	"math"
	"nutrition-backend/models"
)

//
// =========================
// RESULT TYPES
// =========================
//

type MetabolismResult struct {
	BMR                float64 `json:"bmr"`
	TDEE               float64 `json:"tdee"`
	ActivityLevel      string  `json:"activity_level"`
	ActivityMultiplier float64 `json:"activity_multiplier"`
	Interpretation     string  `json:"interpretation"`
}

type BMIChartRanges struct {
	UnderweightUpper float64 `json:"underweight_upper"`
	NormalUpper      float64 `json:"normal_upper"`
	OverweightUpper  float64 `json:"overweight_upper"`
	ObeseClass1Upper float64 `json:"obese_class1_upper"`
}

type IdealWeightRange struct {
	MinKg float64 `json:"min_kg"`
	MaxKg float64 `json:"max_kg"`
}

type BMIResult struct {
	BMI                  float64          `json:"bmi"`
	Category             string           `json:"category"`
	HealthRisk           string           `json:"health_risk"`
	ChartPositionPercent float64          `json:"chart_position_percent"`
	ChartRanges          BMIChartRanges   `json:"chart_ranges"`
	IdealWeightRange     IdealWeightRange `json:"ideal_weight_range"`
}

type MacroBreakdown struct {
	ProteinG float64 `json:"protein_g"`
	CarbsG   float64 `json:"carbs_g"`
	FatsG    float64 `json:"fats_g"`

	ProteinCal float64 `json:"protein_calories"`
	CarbsCal   float64 `json:"carbs_calories"`
	FatsCal    float64 `json:"fats_calories"`
}

type DietSuggestion struct {
	TargetCalories float64        `json:"target_calories"`
	Macros         MacroBreakdown `json:"macros"`
}

type FitnessAdvice struct {
	FitnessLevel           string   `json:"fitness_level"`
	EstimatedWeeklyCalBurn float64  `json:"estimated_weekly_calorie_burn"`
	BMIRecommendations     []string `json:"bmi_based_recommendations"`
}

type FitnessScore struct {
	Score  int    `json:"score"`
	Rating string `json:"rating"`
}

//
// =========================
// METABOLISM
// =========================
//

func CalculateMetabolism(profile models.UserProfile) MetabolismResult {

	var bmr float64

	if profile.Gender == "male" {

		bmr =
			10*profile.Weight +
				6.25*profile.Height -
				5*float64(profile.Age) +
				5

	} else {

		bmr =
			10*profile.Weight +
				6.25*profile.Height -
				5*float64(profile.Age) -
				161
	}

	multipliers := map[string]float64{
		"sedentary":   1.2,
		"light":       1.375,
		"moderate":    1.55,
		"active":      1.725,
		"very_active": 1.9,
	}

	m := multipliers[profile.ActivityLevel]

	if m == 0 {
		m = 1.2
	}

	return MetabolismResult{
		BMR:                math.Round(bmr),
		TDEE:               math.Round(bmr * m),
		ActivityLevel:      profile.ActivityLevel,
		ActivityMultiplier: m,
		Interpretation:     "Calculated using the Mifflin-St Jeor equation.",
	}
}

//
// =========================
// BMI
// =========================
//

func CalculateBMI(profile models.UserProfile) BMIResult {

	heightMeters := profile.Height / 100

	bmi := profile.Weight / (heightMeters * heightMeters)

	category := ""
	risk := ""

	switch {

	case bmi < 18.5:
		category = "Underweight"
		risk = "Nutritional deficiency"

	case bmi < 25:
		category = "Normal"
		risk = "Low"

	case bmi < 30:
		category = "Overweight"
		risk = "Moderate"

	default:
		category = "Obese"
		risk = "High"

	}

	minChart := 10.0
	maxChart := 45.0

	pos := ((bmi - minChart) / (maxChart - minChart)) * 100

	if pos < 0 {
		pos = 0
	}

	if pos > 100 {
		pos = 100
	}

	h := heightMeters * heightMeters

	return BMIResult{

		BMI:                  math.Round(bmi*10) / 10,
		Category:             category,
		HealthRisk:           risk,
		ChartPositionPercent: pos,

		ChartRanges: BMIChartRanges{

			UnderweightUpper: 18.5,
			NormalUpper:      24.9,
			OverweightUpper:  29.9,
			ObeseClass1Upper: 34.9,
		},

		IdealWeightRange: IdealWeightRange{

			MinKg: math.Round(18.5*h*10) / 10,
			MaxKg: math.Round(24.9*h*10) / 10,
		},
	}
}

//
// =========================
// DIET
// =========================
//

func GetDietSuggestion(profile models.UserProfile, tdee float64) DietSuggestion {

	protein := profile.Weight * 1.8

	fat := profile.Weight * 0.8

	proteinCalories := protein * 4

	fatCalories := fat * 9

	carbsCalories := tdee - proteinCalories - fatCalories

	carbs := carbsCalories / 4

	return DietSuggestion{

		TargetCalories: tdee,

		Macros: MacroBreakdown{

			ProteinG: protein,
			CarbsG:   carbs,
			FatsG:    fat,

			ProteinCal: proteinCalories,
			CarbsCal:   carbsCalories,
			FatsCal:    fatCalories,
		},
	}
}

//
// =========================
// FITNESS
// =========================
//

func GetFitnessAdvice(profile models.UserProfile, bmi BMIResult) FitnessAdvice {

	level := "Intermediate"

	switch profile.ActivityLevel {

	case "sedentary":
		level = "Beginner"

	case "light":
		level = "Beginner"

	case "moderate":
		level = "Intermediate"

	default:
		level = "Advanced"

	}

	recommendations := []string{}

	switch bmi.Category {

	case "Underweight":

		recommendations = append(recommendations,
			"Focus on strength training.",
			"Increase protein intake.",
		)

	case "Overweight", "Obese":

		recommendations = append(recommendations,
			"Walk daily.",
			"Strength train 3x/week.",
			"Prioritize calorie deficit.",
		)

	default:

		recommendations = append(recommendations,
			"Maintain your current routine.",
		)
	}

	return FitnessAdvice{

		FitnessLevel: level,

		EstimatedWeeklyCalBurn: 2000,

		BMIRecommendations: recommendations,
	}
}

func CalculateFitnessScore(
	profile models.UserProfile,
	bmi BMIResult,
	fitness FitnessAdvice,
) FitnessScore {

	score := 100

	// BMI
	switch bmi.Category {
	case "Normal":
	case "Overweight":
		score -= 10
	case "Obese":
		score -= 20
	case "Underweight":
		score -= 10
	}

	// Activity
	switch profile.ActivityLevel {
	case "Sedentary":
		score -= 15
	case "Light":
		score -= 8
	case "Moderate":
	case "Active":
		score += 5
	case "Very Active":
		score += 10
	}

	// Fitness level
	switch fitness.FitnessLevel {
	case "Beginner":
		score -= 5
	case "Intermediate":
	case "Advanced":
		score += 5
	}

	if score > 100 {
		score = 100
	}
	if score < 0 {
		score = 0
	}

	rating := "Needs Improvement"

	switch {
	case score >= 90:
		rating = "Excellent"
	case score >= 75:
		rating = "Good"
	case score >= 60:
		rating = "Fair"
	}

	return FitnessScore{
		Score:  score,
		Rating: rating,
	}
}
