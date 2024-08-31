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
 * Obtiene la lista de categorias
 */
func GetCategories(rw http.ResponseWriter, r *http.Request) {
	categories := models.Categories{}
	if err := db.Database().Find(&categories); err.Error != nil {
		sendError(rw, http.StatusInternalServerError)
	} else {
		for i, v := range categories {
			if err := db.Database().Where(&models.Product{CategoryId: v.Id}).Find(&v.Products); err.Error != nil {
				sendError(rw, http.StatusInternalServerError)
			} else {
				categories[i] = v
			}
		}
	}
	
	sendData(rw, categories, http.StatusOK)
}

/**
 * Obtiene una Categoria por su id
 */
func GetCategory(rw http.ResponseWriter, r *http.Request) {
	if category, err := getCategoryById(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		sendData(rw, category, http.StatusOK)
	}
}

/**
 * Busca la categoria indicada por su id y devuelve error si no lo encuentra
 */
func getCategoryById(r *http.Request) (models.Category, *gorm.DB) {
	vars := mux.Vars(r)
	categoryId, _ := strconv.Atoi(vars["id"])
	category := models.Category{}

	if err := db.Database().First(&category, categoryId); err.Error != nil {
		return category, err
	} else {
		if err := db.Database().Where(&models.Product{CategoryId: category.Id}).Find(&category.Products); err.Error != nil {
			return category, err
		} else {
			return category, nil
		}
	}
}

func GetCategoryComplete(rw http.ResponseWriter, r *http.Request) {
	if category, err := getCategoryById(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		if productsByCategory, erro := getProductsByCategory(category); erro != nil {
			sendError(rw, http.StatusNotFound)
		} else {
			sendData(rw, productsByCategory, http.StatusOK)
		}
	}
}

func getProductsByCategory(category models.Category) (models.ProductsByCategory, *gorm.DB) {
	productsByCategory := models.ProductsByCategory{
		Category: category,
	}
	products := models.Products{}

	if err := db.Database().Where(&models.Product{CategoryId: category.Id}).Find(&products); err.Error != nil {
		return productsByCategory, err
	} else {
		productsByCategory.Products = products
		return productsByCategory, nil
	}
}

/**
 * Crea una categoria
 */
func CreateCategory(rw http.ResponseWriter, r *http.Request) {
	category := models.Category{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&category); err != nil {
		sendError(rw, http.StatusUnprocessableEntity)
	} else {
		db.Database().Create(&category)
		sendData(rw, category, http.StatusCreated)
	}
}

/**
 * Actualiza una categoria
 */
func UpdateCategory(rw http.ResponseWriter, r *http.Request) {
	var categoryId int64

	if old_category, err := getCategoryById(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		categoryId = old_category.Id

		category := models.Category{}
		decoder := json.NewDecoder(r.Body)

		if err := decoder.Decode(&category); err != nil {
			sendError(rw, http.StatusUnprocessableEntity)
		} else {
			category.Id = categoryId
			db.Database().Save(&category)
			sendData(rw, category, http.StatusAccepted)
		}

	}
}

/**
 * Elimina una Categoria
 */
func DeleteCategory(rw http.ResponseWriter, r *http.Request) {
	if category, err := getCategoryById(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		db.Database().Delete(&category)
		sendData(rw, category, http.StatusOK)
	}
}