package models

import "time"

// User of system
type User struct {
	ID uint `gorm:"primaryKey"`

	Email    string
	Password string `json:"-"`

	CreatedAt time.Time
}
