// This is an EXAMPLE of cmd/server/main.go — showing how the auth
// package plugs in. Merge the relevant parts into your real main.go
// rather than dropping this file in as-is, since you'll also be
// wiring in your cards and users packages here.
package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq" // or your chosen Postgres driver

	"github.com/onuigboprecious/infarbloom/backend/internal/auth"
	"github.com/onuigboprecious/infarbloom/backend/internal/middleware"
)

func main() {
	env := os.Getenv("APP_ENV") // "production" or "development"
	if env == "" {
		env = "development"
	}

	dbURL := os.Getenv("DATABASE_URL")
	var db *sql.DB
	if dbURL != "" {
		var err error
		db, err = sql.Open("postgres", dbURL)
		if err != nil {
			log.Printf("Warning: database connection setup error: %v", err)
		} else if err := db.Ping(); err != nil {
			log.Printf("Warning: PostgreSQL database ping failed: %v", err)
		} else {
			log.Println("Successfully connected to PostgreSQL database!")
		}
	} else {
		log.Println("Notice: DATABASE_URL is not set. Server running without live database.")
	}
	if db != nil {
		defer db.Close()
	}

	authSvc := auth.New(db, env)
	// cardsSvc := cards.New(db, authSvc)
	// usersSvc := users.New(db, authSvc)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok","message":"Infarbloom Backend API Server is running"}`))
	})

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok","environment":"` + env + `"}`))
	})

	mux.HandleFunc("POST /api/signup", authSvc.HandleSignup)
	mux.HandleFunc("POST /api/login", authSvc.HandleLogin)
	mux.HandleFunc("POST /api/logout", authSvc.HandleLogout)
	mux.HandleFunc("GET /api/me", authSvc.HandleMe)

	// Route aliases for /api/auth/*
	mux.HandleFunc("POST /api/auth/signup", authSvc.HandleSignup)
	mux.HandleFunc("POST /api/auth/login", authSvc.HandleLogin)
	mux.HandleFunc("POST /api/auth/logout", authSvc.HandleLogout)
	mux.HandleFunc("GET /api/auth/me", authSvc.HandleMe)

	// Example of a protected route once you add one:
	// mux.HandleFunc("GET /api/dashboard", authSvc.RequireAuth(usersSvc.HandleDashboard))

	frontendOrigin := os.Getenv("FRONTEND_ORIGIN") // e.g. http://localhost:5173
	handler := middleware.CORS(frontendOrigin, mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
