package models

import "gorm/db"

type Category struct {
    Id         int64     `json:"id"`
    Name       string    `json:"name"`
    Image      string    `json:"image"`

    Products []Product   `json:"products"`
}

type Categories []Category

func MigrateCategory() {
	db.Database().AutoMigrate(Category{})
}