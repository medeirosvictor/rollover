package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/medeirosvictor/rollover/backend/pkg/websocket"
)

func serveWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	ws, err := websocket.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	go websocket.Writer(ws)
	websocket.Reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/ws", serveWs)
}

func main() {
    setupRoutes()
    http.ListenAndServe(":8080", nil)
}