//Home page component for Extent Chat App
//Joseph Somogie 2024

"use client";

import React, { useState, useEffect } from "react";

import toggleDarkMode from "~/ClientFunctions/DarkmodeToggle";
//Components used
import ChatWindow from "~/components/ChatWindow";
import ChatList from "~/components/ChatList";
import TabBar from "./tabBar";
import MessageInput from "~/components/messageInput";
import HomeHeader from "~/components/homeHeader";
import NewList from "~/components/newChatList";
//api calls used
import pullMessages from "~/FrontendApiCalls/pullMessages";
import pushChat from "~/FrontendApiCalls/pushChat";
//types imported for chat array
import type { Chat } from "@prisma/client";
//session handling
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

//websocket

import { socket } from "~/socket";


/*****************MAIN  COMPONENT***********************/
export default function HomePage() {

   // stateful variable for which conversation is selected from chatlist in form of conversation ID
 const [convoID, setConvoID] = useState<String | any>('')
/***********************************Session Establishment*********************************/
  const {data: session, status } = useSession();
/************************************Dark Mode Toggle*************************************/
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    toggleDarkMode(darkMode);
  }, [darkMode]);
 


  /***********************************TabBar Variables*********************************/
  // stateful variable that tracks which tab is selected
  const [selectedTab, setSelectedTab] = useState("Chats");
  // setter functions to change the tab bar selected value
  const setTabChats = () => {
    setSelectedTab("Chats");
  };
  const setTabNew = () => {
    setSelectedTab("New");
  };
  const setTabFriends = () => {
    setSelectedTab("Friends");
  };

  /***********************************Message Sending Functions & Variables**************************/
  //on form submit, not used
  const handleMessageSubmit = (e: any) => {
    e.preventDefault();
  };
  // stateful variable for tracking content of  message input field
  const [content, setContent] = useState<string> ('');
  // async function to handle sending a message
  const handleSend = async () => {
    if(session){
      //push chat to DB with correct params
      try{
    await pushChat(convoID, session.user.id, content, session.user.name);
    socket.emit('messageSent', { convoID });
      }catch(e){
        console.log(e)
      }
    
    }
    //reload messages
    await loadMessages();
  }
// stateful variable for which conversation is selected from chatlist in form of conversation name 
 const [selectedConvo, setSelectedConvo] = useState<String | any>('')

// stateful array of messages from given conversation 
const [messages, setMessages] = useState<Chat | any>([]);
// async function to pull messages from DB, then load them into messages array
 const loadMessages = async () => {
  const data = await pullMessages(convoID)
  setMessages(data); 
 }
// function to load appropriate messages when conversation is switched
 useEffect(()=> {
  loadMessages();
  
},[convoID])

/*************************************WEBSOCKET INTEGRATION**************************************/
useEffect(() => {
  // Connect to Socket.IO server
  if (socket.connected) {
    console.log("socket: "+socket.id);
  }

  const fetchMessages = async () => {
    console.log('new message!!')
    await loadMessages();
  };

  if (convoID) {
    // Join the conversation
    console.log("convoID: "+convoID)
    socket.emit('joinConversation', { convoID });
  }

  socket.on('fetchMessages', fetchMessages);

    
/*() => {console.log('successful sginal')}*/


  return () => {
    socket.off('fetchMessages', fetchMessages);
    if (convoID) {
      // Optionally, handle leaving the conversation if needed
      socket.emit('leaveConversation', { convoID });
    }
  };
}, [convoID]);



/**************************************USER INTERFACE*****************************************/
  return (
    <>  
      <div className="wrapper">
       
        <HomeHeader
          buttonOneClick={() =>
            signOut({ callbackUrl: "http://localhost:3000" })
          }
          buttonTwoClick={() => {setDarkMode(!darkMode)}}
          buttonThreeClick={() => {}} 
          darkMode={darkMode}
        />
        <div className="  flex h-5/6 w-screen justify-start pl-4  bg-white pb-4 pt-4 dark:bg-zinc-900">
    
          <div className="h-full w-1/5 flex-col overflow-hidden  rounded-lg bg-gray-300 dark:bg-gradient-to-r from-indigo-900 to-gray-900">
            <TabBar 
              buttonOneClick={setTabNew}
              buttonTwoClick={setTabChats}
              buttonThreeClick={setTabFriends}
              selected={selectedTab}
            />
          
            {selectedTab === "Chats" ? <ChatList setSelectedChat={setSelectedConvo} setID={setConvoID}/> : <NewList/>}
            
          </div>
          <div className="w-[70%] justify-self-center  pl-4">
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
