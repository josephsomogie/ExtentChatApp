export interface User {

    id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
  }
  
  export interface Chat {
    id: string;
    message: string;
    createdAt: Date;
  }

  export interface Conversation {
    id: string;
    name: string | null;
    users: User[] |null;
    chats: Chat[] |null;
    creatorId: string | null;
  }