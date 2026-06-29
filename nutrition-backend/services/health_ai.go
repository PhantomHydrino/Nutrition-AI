package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"nutrition-backend/models"
)

// ─────────────────────────────────────────────
// AI-only narrative output — no numbers duplicated here.
// ─────────────────────────────────────────────

type MealPlanItem struct {
	Meal     string   `json:"meal"`
	Timing   string   `json:"timing"`
	Calories float64  `json:"calories"`
	Foods    []string `json:"foods"`
}

type WeeklyPlanDay struct {
	Day             string   `json:"day"`
	Focus           string   `json:"focus"`
	DurationMinutes int      `json:"duration_minutes"`
	RestDay         bool     `json:"rest_day"`
	Exercises       []string `json:"exercises"`
}

type HealthAIInsights struct {
	OverallSummary        string              `json:"overall_summary"`
	MetabolismNarrative   string              `json:"metabolism_narrative"`
	BMINarrative          string              `json:"bmi_narrative"`
	DietNarrative         string              `json:"diet_narrative"`
	FitnessNarrative      string              `json:"fitness_narrative"`
	FoodLogInsight        string              `json:"food_log_insight"`
	TopPriorities         []string            `json:"top_priorities"`
	WeeklyGoal            string              `json:"weekly_goal"`
	WeeklyPlan            []WeeklyPlanDay     `json:"weekly_plan"`
	MealPlan              []MealPlanItem      `json:"meal_plan"`
	RecommendedFoodGroups map[string][]string `json:"recommended_food_groups"`
	Tips                  []string            `json:"tips"`
}

// HealthAIInput bundles every computed fact so the prompt is fully self-contained.
type HealthAIInput struct {
	Profile      models.UserProfile
	Metabolism   MetabolismResult
	BMI          BMIResult
	Diet         DietSuggestion
	Fitness      FitnessAdvice
	FitnessScore FitnessScore
	FoodLogs     []models.FoodLog
}

// AskHealthAI sends all deterministic health data to the LLM and returns
// only the narrative / interpretive fields. Numbers live in the typed structs.
func AskHealthAI(input HealthAIInput) (*HealthAIInsights, error) {
	prompt := buildHealthPrompt(input)

	body := map[string]any{
		"model": "llama-3.3-70b-versatile",
		"messages": []map[string]string{
			{"role": "user", "content": prompt},
		},
		"temperature": 0.6,
	}

	jsonBody, err := json.Marshal(body)
	if err != nil {
		return nil, fmt.Errorf("marshal request: %w", err)
	}

	req, err := http.NewRequest(
		"POST",
		"https://api.groq.com/openai/v1/chat/completions",
		bytes.NewBuffer(jsonBody),
	)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+os.Getenv("GROQ_API_KEY"))
	req.Header.Set("Content-Type", "application/json")

	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		return nil, fmt.Errorf("http request: %w", err)
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read body: %w", err)
	}

	var groqResp map[string]any
	if err := json.Unmarshal(raw, &groqResp); err != nil {
		return nil, fmt.Errorf("unmarshal groq response: %w", err)
	}

	content, err := extractContent(groqResp)
	if err != nil {
		return nil, err
	}

	content = cleanJSON(content)

	var insights HealthAIInsights
	if err := json.Unmarshal([]byte(content), &insights); err != nil {
		return nil, fmt.Errorf("parse AI JSON: %w | raw: %s", err, content)
	}

	return &insights, nil
}

// buildHealthPrompt constructs a rich, structured prompt from computed data.
func buildHealthPrompt(in HealthAIInput) string {
	logLines := "No recent logs."
	if len(in.FoodLogs) > 0 {
		var sb strings.Builder
		limit := len(in.FoodLogs)
		if limit > 7 {
			limit = 7
		}
		for _, l := range in.FoodLogs[:limit] {
			sb.WriteString(fmt.Sprintf(
				"  - %s: %.0f kcal | P %.0fg | C %.0fg | F %.0fg\n",
				l.Food, l.Calories, l.Protein, l.Carbs, l.Fats,
			))
		}
		logLines = sb.String()
	}

	return fmt.Sprintf(`
You are a world-class registered dietitian and certified personal trainer.
Analyse the data below and return ONLY a minified JSON object — no markdown, no backticks, no explanation.

=== USER PROFILE ===
Age: %d | Gender: %s | Height: %.1f cm | Weight: %.1f kg | Activity: %s

=== METABOLISM ===
BMR: %.2f kcal/day | TDEE: %.2f kcal/day | Multiplier: %.3f
System note: %s

=== BMI ===
BMI: %.1f | Category: %s | Health Risk: %s
Ideal weight: %.1f–%.1f kg

=== DIET (target %.0f kcal/day) ===
Protein: %.0fg (%.0f kcal) | Carbs: %.0fg (%.0f kcal) | Fats: %.0fg (%.0f kcal)

=== FITNESS ===
Level: %s | Est. weekly burn: %.0f kcal
BMI recs: %s

=== FITNESS SCORE ===
Score: %d/100
Rating: %s

=== RECENT FOOD LOGS ===
%s

=== TASK ===
Write warm, specific, actionable narratives for this individual — not generic advice.
Reference their actual numbers. Be concise (2–4 sentences per field).


Requirements for Weekly Plan:
- Include exactly 7 entries (Monday through Sunday).
- Each day must contain:
  - day
  - focus
  - duration_minutes
  - rest_day
  - exercises
- Rest days should have rest_day=true, duration_minutes=0, and exercises=[].
- Workout days should contain 4–8 specific exercises.
- Tailor intensity appropriately for the user's fitness level and BMI.
- Include a balanced mix of strength, cardio, mobility, and recovery throughout the week.


Return exactly this JSON shape:
{
	"overall_summary": "string",
	"metabolism_narrative": "string",
	"bmi_narrative": "string",
	"diet_narrative": "string",
	"fitness_narrative": "string",
	"food_log_insight": "string",
	"top_priorities": ["string", "string", "string"],
	"weekly_goal": "string",
  
  	"weekly_plan": [
	{
		"day": "Monday",
		"focus": "",
		"duration_minutes": 0,
		"rest_day": false,
		"exercises": []
		}
	], 
	
	"meal_plan":[
    {
      "meal":"",
      "timing":"",
      "calories":0,
      "foods":[]
    }
  ],


  	

  "recommended_food_groups":{

    "proteins":[],

    "carbohydrates":[],

    "healthy_fats":[],

    "vegetables":[],

    "fruits":[]
  },

  "tips":[]
}
`,
		in.Profile.Age, in.Profile.Gender,
		in.Profile.Height, in.Profile.Weight, in.Profile.ActivityLevel,
		in.Metabolism.BMR, in.Metabolism.TDEE, in.Metabolism.ActivityMultiplier,
		in.Metabolism.Interpretation,
		in.BMI.BMI, in.BMI.Category, in.BMI.HealthRisk,
		in.BMI.IdealWeightRange.MinKg, in.BMI.IdealWeightRange.MaxKg,
		in.Diet.TargetCalories,
		in.Diet.Macros.ProteinG, in.Diet.Macros.ProteinCal,
		in.Diet.Macros.CarbsG, in.Diet.Macros.CarbsCal,
		in.Diet.Macros.FatsG, in.Diet.Macros.FatsCal,
		in.Fitness.FitnessLevel, in.Fitness.EstimatedWeeklyCalBurn,
		strings.Join(in.Fitness.BMIRecommendations, "; "),
		in.FitnessScore.Score, in.FitnessScore.Rating,
		logLines,
	)
}

func extractContent(groqResp map[string]any) (string, error) {
	choices, ok := groqResp["choices"].([]any)
	if !ok || len(choices) == 0 {
		return "", fmt.Errorf("invalid groq response: %+v", groqResp)
	}
	choice, ok := choices[0].(map[string]any)
	if !ok {
		return "", fmt.Errorf("invalid choice format")
	}
	message, ok := choice["message"].(map[string]any)
	if !ok {
		return "", fmt.Errorf("missing message field")
	}
	content, ok := message["content"].(string)
	if !ok {
		return "", fmt.Errorf("missing content field")
	}
	return content, nil
}

func cleanJSON(s string) string {
	s = strings.TrimSpace(s)
	s = strings.TrimPrefix(s, "```json")
	s = strings.TrimPrefix(s, "```")
	s = strings.TrimSuffix(s, "```")
	return strings.TrimSpace(s)
}
