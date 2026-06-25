package models

import "time"

// Cache AI responses to reduce API calls
type AICache struct {
	ID uint `gorm:"primaryKey"`

	Input string `gorm:"uniqueIndex"`

	Response string `gorm:"type:text"`

	CreatedAt time.Time
}
