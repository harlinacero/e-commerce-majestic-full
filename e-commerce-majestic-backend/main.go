package main

import (
	"log"
	"net/http"

	"gorm/handlers"
	"gorm/middleware"
	"gorm/models"

	"github.com/gorilla/mux"
)

func main() {


	models.MigrateUser()
	models.MigrateRoles()
	models.MigrateCategory()
	models.MigrateProduct()

	mux := mux.NewRouter()

	mux.Handle("/api/role/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetRoles))).Methods(http.MethodGet)
	mux.Handle("/api/role/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetRole))).Methods(http.MethodGet)
	mux.Handle("/api/role/userByRole/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetRoleComplete))).Methods(http.MethodGet)
	mux.Handle("/api/role/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.CreateRole))).Methods(http.MethodPost)
	mux.Handle("/api/role/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateRole))).Methods(http.MethodPut)
	mux.Handle("/api/role/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteRole))).Methods(http.MethodDelete)

	mux.HandleFunc("/api/user/", handlers.CreateUser).Methods(http.MethodPost)
	mux.Handle("/api/user/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetUser))).Methods(http.MethodGet)
	mux.Handle("/api/user/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetUsers))).Methods(http.MethodGet)
	mux.Handle("/api/user/userByRole/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetUsersByRole))).Methods(http.MethodGet)
	mux.Handle("/api/user/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateUser))).Methods(http.MethodPut)
	mux.Handle("/api/user/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteUser))).Methods(http.MethodDelete)

	mux.Handle("/api/category/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetCategories))).Methods(http.MethodGet)
	mux.Handle("/api/category/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetCategory))).Methods(http.MethodGet)
	mux.Handle("/api/category/productsByCategory/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetCategoryComplete))).Methods(http.MethodGet)
	mux.Handle("/api/category/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.CreateCategory))).Methods(http.MethodPost)
	mux.Handle("/api/category/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateCategory))).Methods(http.MethodPut)
	mux.Handle("/api/category/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteCategory))).Methods(http.MethodDelete)

	mux.Handle("/api/product/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetProducts))).Methods(http.MethodGet)
	mux.Handle("/api/product/productByCategory/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetProductsByCategory))).Methods(http.MethodGet)
	mux.Handle("/api/product/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetProduct))).Methods(http.MethodGet)
	mux.Handle("/api/product/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.CreateProduct))).Methods(http.MethodPost)
	mux.Handle("/api/product/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateProduct))).Methods(http.MethodPut)
	mux.Handle("/api/product/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteProduct))).Methods(http.MethodDelete)

	mux.HandleFunc("/api/session/", handlers.GetSessionUser).Methods(http.MethodPost)
	
	//Aplica el middleware de CORS
	wrappedMux := middleware.EnableCORS(mux)
	log.Fatal(http.ListenAndServe(":3000", wrappedMux))
}
