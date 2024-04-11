//Joseph Somogie 2024
//Reusable list component for our conversation navigation in Extent. see end of file for detailed description
//props/params: chats -- an array of chat objects | setSelectedChat -- a function passed in to control an external state variable
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Conversation } from "~/ClientFunctions/interfaces";
import pullConversations from "~/FrontendApiCalls/pullConversations";
interface Chat {
  id: string;
  name: string;
}

interface ChatListProps {
  chats: Chat[];
  selectedChat: string;
  setSelectedChat: (name: string) => void;
  setID: (convoId: string) => void;
}

export default function ChatList({ selectedChat, setSelectedChat, setID }: ChatListProps) {
  const { data: session, status } = useSession();

  const [convos, setConvos] = useState<Conversation[] | null>([]);

  const getConvos = async () => {
    if (session) {
      const data = await pullConversations(session.user.id);
      try {
        setConvos(data);
      } catch (e) {
        console.log("error setting convos:" + e);
      }
    } else {
      console.log("No User Session");
    }
  };
  const setData = (name: any, id: any) => {
    setSelectedChat(name);
    setID(id);
  };

  useEffect(() => {
    getConvos();
  }, [session]);

  return (
    <div className="chatlist">
      {convos !== null ? (
        convos.map((convo) => (
          <div
            key={convo.id}
            onClick={() => setData(convo.name, convo.id)}
            className={convo.name === selectedChat ? " mb-2 cursor-pointer rounded-sm bg-blue-400 px-4 py-2 text-white  ":" mb-2 cursor-pointer rounded-sm bg-gray-600 px-4 py-2 dark:text-white text-black hover:bg-gray-400"}
          >
            {convo.name}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

/**********Description*************/
/*
This React component, ChatList, is designed for navigating conversation 
threads in the Extent application. It uses useSession from NextAuth for 
session management. The component accepts chats, an array of chat objects, 
and two functions, setSelectedChat and setID, to manage external state 
based on user interaction. Upon initialization and whenever the session 
updates, it fetches conversation data using pullConversations, updating 
local state with the response. Each conversation is rendered as a 
clickable element, which upon click, updates selected chat details through 
setData, invoking the passed-in state management functions with the 
conversation's name and ID. Error handling is in place for both unsuccessful 
data fetching and absence of a user session.
*/
