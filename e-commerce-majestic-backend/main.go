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


	models.MigrateRoles()
	models.MigrateCategory()
	models.MigrateProduct()
	models.MigrateUser()

	mux := mux.NewRouter()

	mux.Handle("/api/role/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetRoles), "admin")).Methods(http.MethodGet)
	mux.Handle("/api/role/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetRole), "admin")).Methods(http.MethodGet)
	mux.Handle("/api/role/userByRole/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetRoleComplete), "admin")).Methods(http.MethodGet)
	mux.Handle("/api/role/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.CreateRole), "admin")).Methods(http.MethodPost)
	mux.Handle("/api/role/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateRole), "admin")).Methods(http.MethodPut)
	mux.Handle("/api/role/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteRole), "admin")).Methods(http.MethodDelete)

	mux.HandleFunc("/api/user/", handlers.CreateUser).Methods(http.MethodPost)
	mux.Handle("/api/user/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetUser), "admin","seller","shooper")).Methods(http.MethodGet)
	mux.Handle("/api/user/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetUsers),"admin")).Methods(http.MethodGet)
	mux.Handle("/api/user/userByRole/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetUsersByRole),"admin")).Methods(http.MethodGet)
	mux.Handle("/api/user/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateUser),"admin")).Methods(http.MethodPut)
	mux.Handle("/api/user/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteUser),"admin")).Methods(http.MethodDelete)

	mux.Handle("/api/category/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetCategories), "admin","seller")).Methods(http.MethodGet)
	mux.Handle("/api/category/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetCategory), "admin","seller","shooper")).Methods(http.MethodGet)
	mux.Handle("/api/category/productsByCategory/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetCategoryComplete),"admin","seller","shooper")).Methods(http.MethodGet)
	mux.Handle("/api/category/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.CreateCategory),"admin","seller")).Methods(http.MethodPost)
	mux.Handle("/api/category/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateCategory),"admin","seller")).Methods(http.MethodPut)
	mux.Handle("/api/category/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteCategory),"admin")).Methods(http.MethodDelete)

	mux.Handle("/api/product/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetProducts),"admin","seller","shooper")).Methods(http.MethodGet)
	mux.Handle("/api/product/productByCategory/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetProductsByCategory),"admin","seller","shooper")).Methods(http.MethodGet)
	mux.Handle("/api/product/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.GetProduct),"admin","seller","shooper")).Methods(http.MethodGet)
	mux.Handle("/api/product/", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.CreateProduct),"admin","seller")).Methods(http.MethodPost)
	mux.Handle("/api/product/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.UpdateProduct),"admin","seller")).Methods(http.MethodPut)
	mux.Handle("/api/product/{id:[0-9]+}", middleware.JWTAuthMiddleware(http.HandlerFunc(handlers.DeleteProduct),"admin","seller")).Methods(http.MethodDelete)

	mux.HandleFunc("/api/session/", handlers.GetSessionUser).Methods(http.MethodPost)
	
	//Aplica el middleware de CORS
	wrappedMux := middleware.EnableCORS(mux)
	log.Fatal(http.ListenAndServe(":3000", wrappedMux))
}
