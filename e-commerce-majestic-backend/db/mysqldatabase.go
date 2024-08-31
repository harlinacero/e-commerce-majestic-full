package db

import (
	"fmt"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// const dsn = "root:12345@/goweb_db"
// var dsn = "root:1234@tcp(127.0.0.1:3306)/majesticdb?charset=utf8mb4&parseTime=True&loc=Local"

// Database es la conexión a la base de datos
var Database = func() (db *gorm.DB) {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	// dbHost := "localhost"
	// dbPort := "3306"
	// dbUser := "harlin"
	// dbPassword := "1234"
	// dbName := "majesticdb"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Error en la conexión", err)
		panic(err)
	} else {
		sqlDB, err := db.DB()
		if err != nil {
			fmt.Println("Error al obtener la conexión subyacente: %v", err)
		}

		sqlDB.SetMaxIdleConns(10)
		sqlDB.SetMaxOpenConns(100)
		sqlDB.SetConnMaxLifetime(time.Hour)

		fmt.Println("Conexión exitosa")
		return db
	}
}
