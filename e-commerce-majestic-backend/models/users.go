package models

import (
	"gorm/db"

	"golang.org/x/crypto/bcrypt"
)

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

	// Hash the password	
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte("admin1234"), bcrypt.DefaultCost)
    if err != nil {        
        return
    }

	password := string(hashedPassword)

	admin := User{ Id: 1, Username : "admin", Password : password, Email : "admin@gmail.com", RoleId : 1, Avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&s"}

	db.Database().FirstOrCreate(&admin, admin)
}
