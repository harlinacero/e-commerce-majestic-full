package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"gorm/db"
	"gorm/models"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

/**
 * Obtiene la lista de todos los registros
 */
func GetUsers(rw http.ResponseWriter, r *http.Request) {
	users := models.Users{}
	if err := db.Database().Preload("Role").Find(&users).Error; err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		sendData(rw, users, http.StatusOK)
	}
}

func GetUsersByRole(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roleId, _ := strconv.Atoi(vars["id"])
	users := models.Users{}

	if err := db.Database().Where(models.User{RoleId: int64(roleId)}).Find(&users); err.Error != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		sendData(rw, users, http.StatusOK)
	}
}


func GetUser(rw http.ResponseWriter, r *http.Request) {
	if user, err := getuserBYId(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		sendData(rw, user, http.StatusOK)
	}
}

func getuserBYId(r *http.Request) (models.User, *gorm.DB) {
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["id"])
	user := models.User{}
	if err := db.Database().First(&user, userId); err.Error != nil {
		return user, err
	} else {
		return user, nil
	}
}


func CreateUser(rw http.ResponseWriter, r *http.Request) {
	// Crear el objeto vacio
	user := models.User{}
	// Obtiener el body
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		sendError(rw, http.StatusUnprocessableEntity)
		return
	} 
	
	// Hash the password	
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        sendError(rw, http.StatusUnprocessableEntity)
        return
    }

	user.Password = string(hashedPassword)
	if err := db.Database().Create(&user).Error; err != nil {
        http.Error(rw, "Error creating user", http.StatusInternalServerError)
        return
    }

    sendData(rw, user, http.StatusCreated)
}

func UpdateUser(rw http.ResponseWriter, r *http.Request) {
	var userId int64

	if old_user, err := getuserBYId(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {

		userId = old_user.Id

		user := models.User{}
		decoder := json.NewDecoder(r.Body)

		if err := decoder.Decode(&user); err != nil {
			sendError(rw, http.StatusUnprocessableEntity)
		} else {
			user.Id = userId
			// Hash the password
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			if err != nil {
				http.Error(rw, "Error hashing password", http.StatusInternalServerError)
				return
			}
			user.Password = string(hashedPassword)
			db.Database().Save(&user)
			sendData(rw, user, http.StatusOK)
		}
	}
}

func DeleteUser(rw http.ResponseWriter, r *http.Request) {
	if user, err := getuserBYId(r); err != nil {
		sendError(rw, http.StatusNotFound)
	} else {
		db.Database().Delete(&user)
		sendData(rw, user, http.StatusOK)
	}
}