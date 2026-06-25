package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"nutrition-backend/db"
	"nutrition-backend/models"
)

type NutritionResponse struct {
	Calories float64 `json:"Calories"`
	Protein  float64 `json:"Protein"`
	Carbs    float64 `json:"Carbs"`
	Fats     float64 `json:"Fats"`
	Advice   string  `json:"Advice"`
}

func cleanAIResponse(content string) string {
	content = strings.TrimSpace(content)

	// remove ```json or ``` at start
	content = strings.TrimPrefix(content, "```json")
	content = strings.TrimPrefix(content, "```")

	// remove trailing ```
	content = strings.TrimSuffix(content, "```")

	content = strings.TrimSpace(content)

	return content
}

func AnalyzeWithAI(food string) (*NutritionResponse, error) {

	// 1. CACHE CHECK
	var cache models.AICache
	if err := db.DB.Where("input = ?", food).First(&cache).Error; err == nil {
		var res NutritionResponse
		json.Unmarshal([]byte(cache.Response), &res)
		return &res, nil
	}

	// 2. CALL AI
	prompt := fmt.Sprintf(`
	Return ONLY minified JSON. No markdown. No backticks. No explanation.

	%s

	Format:
	{
	"Calories": 0,
	"Protein": 0,
	"Carbs": 0,
	"Fats": 0,
	"Advice": ""
	}
	`, food)

	body := map[string]any{
		"model": "llama-3.3-70b-versatile",
		"messages": []map[string]string{
			{"role": "user", "content": prompt},
		},
	}

	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest(
		"POST",
		"https://api.groq.com/openai/v1/chat/completions",
		bytes.NewBuffer(jsonBody),
	)

	req.Header.Set(
		"Authorization",
		"Bearer "+os.Getenv("GROQ_API_KEY"),
	)
	req.Header.Set("Content-Type", "application/json")

	fmt.Printf("LEN=%d\n", len(os.Getenv("GROQ_API_KEY")))

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		return nil, err
	}
	fmt.Println("Status:", resp.Status)
	defer resp.Body.Close()

	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	fmt.Println(string(raw))

	var groqResp map[string]any
	if err := json.Unmarshal(raw, &groqResp); err != nil {
		return nil, err
	}

	choices, ok := groqResp["choices"].([]any)
	if !ok || len(choices) == 0 {
		return nil, fmt.Errorf("invalid groq response: %+v", groqResp)
	}

	choice := choices[0].(map[string]any)

	message, ok := choice["message"].(map[string]any)
	if !ok {
		return nil, fmt.Errorf("missing message field")
	}

	content, ok := message["content"].(string)
	if !ok {
		return nil, fmt.Errorf("missing content field")
	}

	content = cleanAIResponse(content)

	var result NutritionResponse

	if err := json.Unmarshal([]byte(content), &result); err != nil {
		return nil, fmt.Errorf("failed to parse AI JSON: %w | raw: %s", err, content)
	}
	// 3. SAVE CACHE
	cacheData, _ := json.Marshal(result)

	db.DB.Create(&models.AICache{
		Input:    food,
		Response: string(cacheData),
	})

	return &result, nil

}
