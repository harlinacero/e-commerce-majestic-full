package models

import "gorm/db"

type Role struct {
	Id int64 `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`

	Users []User `json:"users"`
}

type Roles []Role

func MigrateRoles() {
	db.Database().AutoMigrate(Role{})

	admin := Role{Id: 1,  Name: "admin", Description: "Admin role"}
	seller := Role{Id: 2, Name: "seller", Description: "Seller role"}
	shooper := Role{Id: 3, Name: "shooper", Description: "Customer role"}

	for _, role := range []Role{admin, seller, shooper} {
		db.Database().FirstOrCreate(&role, role)
	}
}
