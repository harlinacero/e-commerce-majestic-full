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
}