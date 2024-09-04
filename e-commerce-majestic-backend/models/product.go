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

	shoes := Product{Title: "Shoes", Price: 50.0, Description: "Shoes", Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuIGmNvQ-a055sivvGsNg8xy_FB2l0i5Ws2g&s", CategoryId: 1, Taxes: 0.16, Disccount: 0.0, Inventory: 100}
	pants := Product{Title: "Pants", Price: 20.0, Description: "Pants", Image: "https://w7.pngwing.com/pngs/63/280/png-transparent-jeans-denim-slim-fit-pants-bell-bottoms-jeans-blue-fashion-boy-thumbnail.png", CategoryId: 2, Taxes: 0.16, Disccount: 0.0, Inventory: 100}
	tshirts := Product{Title: "T-Shirts", Price: 10.0, Description: "T-Shirts", Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAl8KTbZXd-W2ptU6bvqKxgG67GJHP98emPw&s", CategoryId: 3, Taxes: 0.16, Disccount: 0.0, Inventory: 100}

	for _, product := range []Product{shoes, pants, tshirts} {
		db.Database().FirstOrCreate(&product, product)
	}

}
