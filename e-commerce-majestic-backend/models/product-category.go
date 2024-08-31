package models

import "gorm/db"

type ProductsByCategory struct {
	Category Category `json:"category"`
	Products []Product `json:"users"`
}

type ProductsByCategories []ProductsByCategory

func MigrateProductByCategory(){
	db.Database().AutoMigrate(ProductsByCategory{})
}