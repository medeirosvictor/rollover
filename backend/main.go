package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"

	"github.com/medeirosvictor/rollover/backend/pkg/websocket"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}

	client := &websocket.Client{
		ID:   uuid.New().String(),
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	fmt.Println("Spinning up pools, channels and serving...")
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
    setupRoutes()
    http.ListenAndServe(":8080", nil)
}