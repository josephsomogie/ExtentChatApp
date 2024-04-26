//Home page component for Extent Chat App
//Joseph Somogie 2024

"use client";

import React, { useState, useEffect, useRef } from "react";

import toggleDarkMode from "~/ClientFunctions/DarkmodeToggle";
//Components used
import ChatWindow from "~/components/ChatWindow";
import ChatList from "~/components/ChatList";
import TabBar from "./tabBar";
import MessageInput from "~/components/messageInput";
import HomeHeader from "~/components/homeHeader";
import NewList from "~/components/newChatList";
//api calls used
import pullMessages from "~/customMiddleware/pullMessages";
import pushChat from "~/customMiddleware/pushChat";
//types imported for chat array
import type { Chat } from "@prisma/client";
//session handling
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

//websocket

import { initializeSocket } from "~/socket";
import FriendsTab from "./newFriends";

/*****************MAIN  COMPONENT***********************/
export default function HomePage() {
  // stateful variable for which conversation is selected from chatlist in form of conversation ID
  const [convoID, setConvoID] = useState<String | any>("");

  const socket = initializeSocket();
  /***********************************Session Establishment*********************************/
  const { data: session, status } = useSession();
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
  const [content, setContent] = useState<string>("");

  // async function to handle sending a message
  const handleSend = async () => {
    if (session) {
      //push chat to DB with correct params
      try {
        await pushChat(convoID, session.user.id, content, session.user.name);
        socket.emit("messageSent", { convoId: convoID });
      } catch (e) {
        console.log(e);
      }
    }
    //reload messages
    await loadMessages();
  };
  // stateful variable for which conversation is selected from chatlist in form of conversation name
  const [selectedConvo, setSelectedConvo] = useState<String | any>("");

  // stateful array of messages from given conversation
  const [messages, setMessages] = useState<Chat | any>([]);
  // async function to pull messages from DB, then load them into messages array
  const loadMessages = async () => {
    const data = await pullMessages(convoID);
    setMessages(data);
  };
  // function to load appropriate messages when conversation is switched
  useEffect(() => {
    loadMessages();
  }, [convoID]);

  /*************************************WEBSOCKET INTEGRATION**************************************/
  const ifTyping = () => {
    setTyping(true);
    console.log("other is typing!");
  };
  const notTyping = () => {
    setTyping(false);
    console.log("other not typing!");
  };

  useEffect(() => {
    const currentConvoID = convoID;
    console.log("Convo ID changed: ", convoID);
    if (socket.connected) {
      console.log("socket ID: " + socket.id);
    }

    const fetchMessages = async () => {
      console.log("Fetching messages for: ", convoID);
      await loadMessages();
    };

    const cleanupListeners = () => {
      socket.off("fetchMessages", fetchMessages);
      socket.off("userTyping", ifTyping);
      socket.off("notTyping", notTyping);
    };

    cleanupListeners();
    if (convoID) {
      // socket.emit('leaveConversation', { convoId: currentConvoID });
      socket.emit("joinConversation", { convoId: convoID });
      socket.on("fetchMessages", fetchMessages);
      socket.on("userTyping", ifTyping);
      socket.on("notTyping", notTyping);
    }

    return () => {
      console.log(
        "Leaving convo on cleanup for convo",
        currentConvoID,
        convoID,
      );
      socket.emit("notTyping", { convoId: convoID });
      socket.emit("leaveConversation", { convoId: currentConvoID });
      cleanupListeners();
    };
  }, [convoID]); // Dependency on convoID

  /***********************************TYPING NOTIFICATION *******************************************************/

  const [typing, setTyping] = useState(false);
  const lastVal = useRef(content); // Tracks the last value of content
  const lastEmitTypingStatus = useRef<any | null>(); // Tracks the last emitted typing status

  useEffect(() => {
    const checkTyping = () => {
      // Determine the current typing status
      const isCurrentlyTyping = content !== "" && lastVal.current !== content;

      // Emit typing status only if it has changed
      if (isCurrentlyTyping !== lastEmitTypingStatus.current) {
        if (isCurrentlyTyping) {
          console.log("im typing!");
          socket.emit("isTyping", { convoId: convoID });
        } else {
          console.log("im not typing!");
          socket.emit("notTyping", { convoId: convoID });
        }
        lastEmitTypingStatus.current = isCurrentlyTyping;
      }
      // Update lastVal to the current content
      lastVal.current = content;
    };
    // Initial check and set interval
    checkTyping();
    const timer = setInterval(checkTyping, 1500);
    // Cleanup: clear interval and ensure not typing is emitted when content is cleared
    return () => {
      clearInterval(timer);
      if (lastEmitTypingStatus.current) {
        //  socket.emit('notTyping', { convoID });
      }
    };
  }, [content, convoID]); // Dependencies: content and convoID

  /**************************************USER INTERFACE*****************************************/
  return (
    <>
      <div className="animated-background flex h-screen w-screen flex-col">
        <HomeHeader
          buttonOneClick={() =>
            signOut({ callbackUrl: "http://localhost:3000" })
          }
          buttonTwoClick={() => {
            setDarkMode(!darkMode);
          }}
          buttonThreeClick={() => {}}
          darkMode={darkMode}
        />

        <div className="  flex h-5/6 w-screen justify-start bg-transparent  pb-4 pl-4 pt-4">
          <div className="h-full w-1/5 flex-col overflow-hidden  rounded-lg bg-gray-300 from-gray-900 to-indigo-900 font-ubuntu dark:bg-gradient-to-r">
            <TabBar
              buttonOneClick={setTabNew}
              buttonTwoClick={setTabChats}
              buttonThreeClick={setTabFriends}
              selected={selectedTab}
            />

            {selectedTab === "Chats" ? (
              <ChatList
                selectedChat={selectedConvo}
                setSelectedChat={setSelectedConvo}
                setID={setConvoID}
              />
            ) : selectedTab === "New" ? (
              <NewList />
            ) : (
              <FriendsTab />
            )}
          </div>
          <div className="w-[70%] justify-self-center  pl-4">
            <ChatWindow
              selectedChat={selectedConvo}
              Messages={messages}
              typing={typing}
            />
          </div>
        </div>
        {convoID !== "" ? (
          <MessageInput
            handleSend={handleSend}
            handleSubmit={handleMessageSubmit}
            setContent={setContent}
          />
        ) : (
          <center>
            <p className="content-center font-ubuntu dark:text-white">
              Select a Conversation...
            </p>
          </center>
        )}
      </div>
    </>
  );
}

/************************Description*************************************
The HomePage component is a central part of the Extent Chat App, 
orchestrating various functionalities pivotal to the app's operation. 
It integrates session management, real-time messaging via WebSocket, 
and dynamic UI changes like dark mode. Key features include:

Session Management: Utilizes next-auth for handling user authentication and 
session management, ensuring secure and context-aware interactions within the app.
Dark Mode Toggle: Allows users to switch between light and dark themes.
Real-time Communication: Establishes a WebSocket connection to handle real-time interactions 
like sending messages, joining conversations, and displaying typing indicators.
Dynamic Chat Interface:
Displays different tabs (Chats, New, Friends) for managing conversations and contacts.
Uses a ChatWindow for displaying messages in the current conversation 
and a MessageInput for sending new messages.
Lists all chats and updates dynamically when users switch between conversations.
Efficient Message Handling: Messages are fetched and displayed in real-time, 
with added functionality to show when a user is typing.
Component Modularization: Relies on several smaller components
 (HomeHeader, TabBar, ChatList, NewList, FriendsTab, ChatWindow, MessageInput) 
to manage various parts of the UI, promoting reusability and separation of concerns. 
*/
