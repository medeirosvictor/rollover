package main

import (
	"github.com/labstack/echo/v4"
	"github.com/medeirosvictor/rollover/templates"
)

func main() {
	e := echo.New()
	e.Static("/static", "static")

	component := templates.Home()

	e.GET("/", func(c echo.Context) error {
		return component.Render(c.Request().Context(), c.Response().Writer)
	})
	e.Logger.Fatal(e.Start(":8000"))
}
