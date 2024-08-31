package middleware

import (
    "net/http"
    "strings"
    "github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("my_secret_key")

func JWTAuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Forbidden", http.StatusForbidden)
            return
        }

        tokenString := strings.Split(authHeader, "Bearer ")[1]
        claims := &jwt.MapClaims{}

        token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
            return jwtKey, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Forbidden", http.StatusForbidden)
            return
        }

        next.ServeHTTP(w, r)
    })
}

