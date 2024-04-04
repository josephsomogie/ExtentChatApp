//Joseph Somogie 2024
//Reusable list component for our conversation navigation.
//props/params: chats -- an array of chat objects | setSelectedChat -- a function passed in to control an external state variable
import { useSession } from 'next-auth/react';
import React, {useEffect, useState} from 'react';
import { Conversation } from '~/ClientFunctions/interfaces';
import pullConversations from '~/FrontendApiCalls/pullConversations';
interface Chat {
    id: string;
    name: string;
  }
  
  interface ChatListProps {
    chats: Chat[];
    setSelectedChat: (name: string) => void;
    newChatFunc: (convoId: string, userId: string, content: string) => void;
  }
  
export default function ChatList({setSelectedChat, newChatFunc}: ChatListProps){
  const {data: session, status} = useSession();
  const [convos, setConvos] = useState<Conversation | null>([])
  const getConvos = async () => {
    
    if(session){
    const data = await pullConversations(session.user.id);
      try{
    setConvos(data);
      }catch(e){
        console.log("error setting convos:"+ e)
      }
    }else{console.log("No User Session")}
  }

  useEffect(()=>{getConvos()},[session]);

    return(
      
<div className="chatlist">
            {convos !== null ? convos.map((convo) => (
             
                <div
                  key={convo.id}
                  onClick={() => setSelectedChat( convo.name)}
                  className=" mb-2 cursor-pointer rounded-full bg-blue-500 px-4 py-2"
                >
                  {convo.name}
                </div>
            )) : <p>Loading...</p>}
          </div>
          
    )
}