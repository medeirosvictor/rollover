package main

import (
	"context"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/medeirosvictor/rollover/templates"
)

func main() {
	e := echo.New()
	e.Static("/static", "static")

	component := templates.Hello("Victor")
	component.Render(context.Background(), os.Stdout)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":8000"))
}
