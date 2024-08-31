package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"gorm/db"
	"gorm/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

/**
 * Obtiene la lista de todos los registros
 */
func GetProducts(rw http.ResponseWriter, r *http.Request) {
	products := models.Products{}


	if err := db.Database().Preload("Category").Find(&products).Error; err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		sendData(rw, products, http.StatusOK)
	}
	// db.Database().Find(&products)
	// sendData(rw, products, http.StatusOK)
}

func GetProductsByCategory(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	categoryId, _ := strconv.Atoi(vars["id"])
	products := models.Products{}

	if err := db.Database().Where(models.Product{CategoryId: int64(categoryId)}).Find(&products); err.Error != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		sendData(rw, products, http.StatusOK)
	}
}

func GetProduct(rw http.ResponseWriter, r *http.Request) {
	if product, err := getProductById(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		sendData(rw, product, http.StatusOK)
	}
}

func getProductById(r *http.Request) (models.Product, *gorm.DB) {
	vars := mux.Vars(r)
	productId, _ := strconv.Atoi(vars["id"])
	product := models.Product{}
	if err := db.Database().First(&product, productId); err.Error != nil {
		return product, err
	} else {
		return product, nil
	}
}

func CreateProduct(rw http.ResponseWriter, r *http.Request) {
	// Crear el objeto vacio
	product := models.Product{}
	// Obtiener el body
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&product); err != nil {
		sendError(rw, http.StatusUnprocessableEntity)
	} else {
		db.Database().Create(&product)
		sendData(rw, product, http.StatusOK)
	}
}

func UpdateProduct(rw http.ResponseWriter, r *http.Request) {
	var productId int64

	if old_product, err := getProductById(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {

		productId = old_product.Id

		product := models.Product{}
		decoder := json.NewDecoder(r.Body)

		if err := decoder.Decode(&product); err != nil {
			sendError(rw, http.StatusUnprocessableEntity)
		} else {
			product.Id = productId
			db.Database().Save(&product)
			sendData(rw, product, http.StatusOK)
		}
	}
}

func DeleteProduct(rw http.ResponseWriter, r *http.Request) {
	if product, err := getProductById(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		db.Database().Delete(&product)
		sendData(rw, product, http.StatusOK)
	}
}