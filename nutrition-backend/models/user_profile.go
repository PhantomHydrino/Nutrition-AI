package models

import "time"

// UserProfile stores health data needed for metabolism, BMI, and fitness calculations.
type UserProfile struct {
	ID     uint `gorm:"primaryKey"`
	UserID uint `gorm:"uniqueIndex"` // one profile per user

	// Body metrics
	Height float64 // centimetres
	Weight float64 // kilograms
	Age    int

	// "male" or "female"
	Gender string

	// One of: "sedentary" | "light" | "moderate" | "active" | "very_active"
	ActivityLevel string

	CreatedAt time.Time
	UpdatedAt time.Time
}
