package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/google/uuid"

	"github.com/medeirosvictor/rollover/backend/pkg/websocket"
	gws "github.com/gorilla/websocket"
)

var rooms = make(map[string]*websocket.Pool)

func createClientAndSubscribeToRoom(pool *websocket.Pool, conn *gws.Conn) {
	client := &websocket.Client{
        ID:   uuid.New().String(),
        Conn: conn,
        Pool: pool,
    }

	pool.Register <- client
	client.Read()
}

type CreateRoomRequest struct {
	RoomCode string `json:"roomCode"`
}

func createRoomHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateRoomRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	var roomCode = req.RoomCode

	pool := websocket.NewPool(roomCode)
	rooms[roomCode] = pool
	go pool.Start()

	//spin the websocket connection and create a client and subscribe to room
	http.HandleFunc("/room/"+roomCode, func(w http.ResponseWriter, r *http.Request) {
		// Upgrade initial GET request to a websocket
		conn, err := websocket.Upgrade(w, r)
		if err != nil {
			log.Println(err)
			return
		}
		createClientAndSubscribeToRoom(pool, conn)
	})

	fmt.Printf("Room created with code: %s\n", req.RoomCode)

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(fmt.Sprintf(`{"roomCode": "%s"}`, req.RoomCode)))
}

func joinRoomHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
            RoomCode string `json:"roomCode"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil || req.RoomCode == "" {
		http.Error(w, "Room code missing or invalid", http.StatusBadRequest)
		return
	}
	roomCode := req.RoomCode

	fmt.Fprintf(w, "Joining room: %s", roomCode)

	pool, exists := rooms[roomCode]
	if !exists {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf(`{"roomCode"}: %s`, roomCode)))

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
		return
	}

	createClientAndSubscribeToRoom(pool, conn)
}

func setupRoutes() {
	fmt.Println("Spinning up server[watching for room creation]...")

	http.HandleFunc("/room/", joinRoomHandler)

	http.HandleFunc("/create-room", createRoomHandler)
}

func main() {
    setupRoutes()
    http.ListenAndServe(":8080", nil)
}