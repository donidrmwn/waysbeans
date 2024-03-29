package main

import (
	"fmt"
	"nis-waybeans/database"
	"nis-waybeans/pkg/mysql"
	"nis-waybeans/routes"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	e := echo.New()
	var port = os.Getenv("PORT")
	mysql.DatabaseInit()
	database.RunMigration()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	routes.RouteInit(e.Group("/api/v1"))
	e.Static("/uploads", "./uploads")

	fmt.Println("server running localhost:5000")
	e.Logger.Fatal(e.Start(":" + port))
}
