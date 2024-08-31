package models

import "gorm/db"

type User struct {
	Id       int64  `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	RoleId   int64  `json:"roleId"`
	Avatar   string `json:"avatar"`

	Role Role `json:"role" gorm:"foreignKey:RoleId;references:Id"`
}

type Users []User

func MigrateUser() {
	db.Database().AutoMigrate(User{})
}
