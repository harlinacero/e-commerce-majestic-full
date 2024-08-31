package models

import "gorm/db"

type Product struct {
	Id          int64   `json:"id"`
	Title       string  `json:"title"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	CategoryId  int64   `json:"category_id"`
	Taxes       float64 `json:"taxes"`
	Disccount   float64 `json:"disccount"`
	Inventory   int64   `json:"inventory"`

	Category Category `json:"category" gorm:"foreignKey:CategoryId;references:Id"`
}

type Products []Product

func MigrateProduct() {
	db.Database().AutoMigrate(Product{})
}
