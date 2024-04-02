export interface User {
    id: string;
    name: string;
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
    users: User[];
    chats: Chat[];
    creatorId: string;
  }