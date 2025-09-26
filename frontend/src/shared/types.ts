export interface Message {
    type: number;
    body: string;
    clientid: string;
    roomCode: string;
    timestamp: number;
    senderName: string;
}

export interface UserContextType {
    user: UnregisteredUser | null;
    setUser: (user: UnregisteredUser) => void;
}

export interface UnregisteredUser {
    clientId: string;
    name: string;
    colorTheme: string;
    avatarUrl: string;
}
