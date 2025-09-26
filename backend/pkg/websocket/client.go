package websocket

import (
    "fmt"
    "log"

    "github.com/gorilla/websocket"
)

type Client struct {
	ID string
	Conn *websocket.Conn
	Pool *Pool
}

type Message struct {
	Type int `json:"type"`
	Body string `json:"body"`
	ClientId string `json:"clientid"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Printf("Client ID: %s", c.ID)

		message := Message{Type: messageType, Body: string(p), ClientId: c.ID}
		c.Pool.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)
	}
}