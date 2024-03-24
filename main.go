package main

import (
	"math/rand"
	"github.com/labstack/echo/v4"
	"github.com/medeirosvictor/rollover/templates"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func generateTableNumber() string {
    var output []byte
    for i := 0; i < 6; i++ {
        randomIndex := rand.Intn(len(charset))
        output = append(output, charset[randomIndex])
    }
    return string(output)
}


func main() {
	e := echo.New()
	e.Static("/static", "static")

	component := templates.Home()

	e.GET("/", func(c echo.Context) error {
          return component.Render(c.Request().Context(), c.Response().Writer)
	})

        e.GET("/create-table", func(c echo.Context) error {
              return component.Render(c.Request().Context(), c.Response().Writer)
	})

        e.GET("/join-table", func(c echo.Context) error {
            tableID := c.QueryParam("id")
            component := templates.Table(tableID)
            return component.Render(c.Request().Context(), c.Response().Writer)
        })

	e.Logger.Fatal(e.Start(":8000"))
}
