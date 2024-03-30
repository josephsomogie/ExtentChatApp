import React from 'react';

interface Chat {
    id: string;
    name: string;
  }
  
  interface ChatListProps {
    chats: Chat[];
    setSelectedChat: (name: string) => void;
  }
export default function ChatList({chats, setSelectedChat}: ChatListProps){
    return(
<div className="chatlist">
            <text>Chat List</text>
            {chats.map((chat) => (
              <div>
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.name)}
                  className="mb-2 cursor-pointer rounded-full bg-blue-500 px-4 py-2"
                >
                  {chat.name}
                </div>
                <p className="pb-1"></p>
              </div>
            ))}
          </div>
    )
}