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

    shoes:= Category{Id: 1, Name: "Shoes", Image: "shoes.jpg"}
    tshirts:= Category{Id: 2, Name: "T-Shirts", Image: "tshirts.jpg"}
    pants:= Category{Id: 3, Name: "Pants", Image: "pants.jpg"}
    
    for _, category := range []Category{shoes, tshirts, pants} {
        db.Database().FirstOrCreate(&category, category)
    }
}