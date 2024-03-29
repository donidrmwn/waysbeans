package routes

import (
	"nis-waybeans/handlers"
	"nis-waybeans/pkg/middleware"
	"nis-waybeans/pkg/mysql"
	"nis-waybeans/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	productRepository := repositories.RepositoryProduct(mysql.DB)
	cartRepository := repositories.RepositoryCart(mysql.DB)

	h := handlers.HandlerTransaction(
		transactionRepository,
		productRepository,
		cartRepository,
	)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/transactions/user", middleware.Auth(h.FindTransactionsByUser))
	e.GET("/transactions/filter/admin/by-date", middleware.Auth(h.FindTransactionsByDate))
	e.GET("/transactions/filter/user/by-date", middleware.Auth(h.FindTransactionsByDateUser))
	e.GET("/transactions/filter/by-product", middleware.Auth(h.FindTransactionsByProductID))
	e.GET("/transactions/filter/id", middleware.Auth(h.FindTransactionByOrderID))
	e.GET("/transactions/filter/product_name", middleware.Auth(h.FindTransactionByProductName))
	e.GET("/transactions/unfinished", middleware.Auth(h.GetUncheckedOutTransaction))
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.PATCH("/transaction", middleware.Auth((h.UpdateTransaction)))
	e.DELETE("/transaction/:id", h.DeleteTransaction)
	e.POST("/notification", h.Notification)
}
