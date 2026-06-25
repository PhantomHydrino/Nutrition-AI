package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {

	database, err := gorm.Open(sqlite.Open("nutrition.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	DB = database
	return nil
}
