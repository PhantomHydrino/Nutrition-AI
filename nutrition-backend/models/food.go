package models

import "time"

type FoodLog struct {
	ID uint `gorm:"primaryKey"`

	UserID uint
	Food   string

	Calories float64
	Protein  float64
	Carbs    float64
	Fats     float64

	Advice string

	CreatedAt time.Time
}
