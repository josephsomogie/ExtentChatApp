"use client";
import toggleDarkMode from "~/ClientFunctions/DarkmodeToggle";
import ChatWindow from "~/components/ChatWindow";
import ChatList from "~/components/ChatList";
import {  Conversation, User } from "~/ClientFunctions/interfaces";
import React, { useState, useEffect } from "react";

import TabBar from "./tabBar";
import MessageInput from "~/components/messageInput";
import HomeHeader from "~/components/homeHeader";
import NewList from "~/components/newChatList";

import pullMessages from "~/FrontendApiCalls/pullMessages";
import pushChat from "~/FrontendApiCalls/pushChat";
import type { Chat } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function HomePage() {

  const {data: session, status } = useSession();

  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    toggleDarkMode(darkMode);
  }, [darkMode]);
 


  //tab name useState
  const [selectedTab, setSelectedTab] = useState("Chats");
  const setTabChats = () => {
    setSelectedTab("Chats");
  };
  const setTabNew = () => {
    setSelectedTab("New");
  };
  const setTabFriends = () => {
    setSelectedTab("Friends");
  };

  const handleMessageSubmit = (e: any) => {
    e.preventDefault();
  };

  const [content, setContent] = useState<string> ('');
  const handleSend = async () => {
    if(session){
    await pushChat(convoID, session.user.id, content, session.user.name);
    }
    await loadMessages();
  }

 const [selectedConvo, setSelectedConvo] = useState<String | any>('')
 const [convoID, setConvoID] = useState<String | any>('')

const [messages, setMessages] = useState<Chat | any>([]);
 const loadMessages = async () => {
  const data = await pullMessages(convoID)
  //if(data && data.length > 0){
  setMessages(data); 
  //}
 }

 useEffect(()=> {
  loadMessages();
  
},[convoID])



 

  return (
    <>  
      <div className="wrapper ">
        <HomeHeader
          buttonOneClick={() =>
            signOut({ callbackUrl: "http://localhost:3000" })
          }
          buttonTwoClick={() => {setDarkMode(!darkMode)}}
          buttonThreeClick={() => {}}
          darkMode={darkMode}
        />
        <div className="  flex h-5/6 w-screen justify-start  bg-white pb-4 pt-2 dark:bg-zinc-900">
          <div className="h-full w-1/5 flex-col overflow-hidden  rounded-lg bg-gray-300 dark:bg-slate-500">
            <center>
              <div className="flex flex-col">
                <text>{selectedTab}</text>
              </div>
            </center>
            <TabBar 
              buttonOneClick={setTabNew}
              buttonTwoClick={setTabChats}
              buttonThreeClick={setTabFriends}
              selected={selectedTab}
            />
          
            {selectedTab === "Chats" ? <ChatList setSelectedChat={setSelectedConvo} setID={setConvoID}/> : <NewList/>}
            
          </div>
          <div className="w-3/5 justify-self-center  pl-2">
            <ChatWindow selectedChat={selectedConvo} Messages={messages} />
          </div>
        </div>
          {convoID !=='' ?
        <MessageInput
          handleSend={handleSend}
          handleSubmit={handleMessageSubmit}
          setContent={setContent}
        /> : <center><p>No Conversation!</p></center>
          }
      </div>
      
    </>
  );
}
