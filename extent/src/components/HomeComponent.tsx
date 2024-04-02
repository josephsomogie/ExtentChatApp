"use client";
import toggleDarkMode from "~/ClientFunctions/DarkmodeToggle";
import ChatWindow from "~/components/ChatWindow";
import ChatList from "~/components/ChatList";
import { Chat, Conversation, User } from "~/ClientFunctions/interfaces";
import React, { useState, useEffect } from "react";

import TabBar from "./tabBar";
import MessageInput from "~/components/messageInput";
import HomeHeader from "~/components/homeHeader";
import NewList from "~/components/newChatList";

import { signOut } from "next-auth/react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    toggleDarkMode(darkMode);
  }, [darkMode]);

  const chats = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
    { id: 4, name: "Chat 1" },
    { id: 5, name: "Chat 2" },
    { id: 6, name: "Chat 3" },
    { id: 7, name: "Chat 1" },
    { id: 8, name: "Chat 2" },
    { id: 9, name: "Chat 3" },
    { id: 10, name: "Chat 1" },
    { id: 11, name: "Chat 2" },
    { id: 12, name: "Chat 3" },
    { id: 13, name: "Chat 1" },
    { id: 14, name: "Chat 2" },
    { id: 15, name: "Chat 3" },
    { id: 16, name: "Chat 1" },
    { id: 17, name: "Chat 2" },
    { id: 18, name: "Chat 3" },
  ];
  const [test, setTest] = useState(String);
  const newFunc = () => {};
  const Mess = [{ userID: "1", data: "HeyHELP" }];

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
            {selectedTab === "Chats" ? <ChatList chats={chats} /> : <NewList/>}
            <TabBar
              buttonOneClick={setTabNew}
              buttonTwoClick={setTabChats}
              buttonThreeClick={setTabFriends}
            />
          </div>
          <div className="w-3/5 justify-self-center  pl-2">
            <ChatWindow selectedChat="1" testMessages={Mess} />
          </div>
        </div>

        <MessageInput
          handleSend={handleMessageSubmit}
          handleSubmit={handleMessageSubmit}
        />
      </div>
    </>
  );
}
