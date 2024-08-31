package models

import "gorm/db"

type UsersByRole struct {
	Role Role `json:"role"`
	Users []User `json:"users"`
}

type UsersByRoles []UsersByRole

func MigrateUserByRole(){
	db.Database().AutoMigrate(UsersByRole{})
}