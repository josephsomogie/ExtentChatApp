import React, { useState, useEffect } from "react";
import TextInput from "~/components/TextInput";
import Image from "next/image";
import { useRouter } from "next/router";
import Wrapper from "~/components/PurpleWrapper";
import { Logo } from "~/components/LogoComponent";
import { Pfp } from "~/components/PfpComponent";
import Button from "~/components/SubmitButton";

//this is where we import the api functions to push to the DB
//view /FrontendApiCalls/pushSample & /FrontendApiCalls/pullSamples for more documentation
import createSample from "~/FrontendApiCalls/pushSample";
import getSamples from "~/FrontendApiCalls/pullSamples";

import { getServerAuthSession } from "~/server/auth";
import { signOut, useSession } from "next-auth/react";

import ChatWindow from "~/components/ChatWindow";
import ChatList from "~/components/ChatList";

import toggleDarkMode from "~/ClientFunctions/DarkmodeToggle";

import pushConversations from "~/FrontendApiCalls/pushConversation";
import pullConversations from "~/FrontendApiCalls/pullConversations";
import pushChat from "~/FrontendApiCalls/pushChat";

import { User, Conversation, Chat } from "~/ClientFunctions/interfaces";

export default function HomeP() {
  const { data: session } = useSession();

  //this is our pages router, it allows us to navigate the application via file names.
  const router = useRouter();

   //This is a variable and its setter function to to set which conversation is selected
   const [selectedChat, setSelectedChat] = useState(String);
  // Dummy data for chat lists
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
  const userArray = [
    "clua7m4oz0000ite2b3xy6t14",
    "clubq7ddx0000ptnk3kztny88"
  ]
const pushConvo = async () => {
  await pushConversations("test Conversation",userArray,"clua7m4oz0000ite2b3xy6t14");
}

const [convos, setConvos] = useState<Conversation[]>([]);
const pullConvos = async () => {
const conversation_test:Conversation[] =  await pullConversations('clua7m4oz0000ite2b3xy6t14');
setConvos(conversation_test);
}
const [currentConvo, setCurrentConvo] = useState(String)
const createMessage = async () => {
  if(convos[0]!==undefined ){
await pushChat(convos[0].id,'clua7m4oz0000ite2b3xy6t14', 'test chat', )
}else console.log("error creating test message")
}



  //our array of messages
  const [testMessages, setTestMessages] = useState([]);
  //variable and setter function for creating/updating a message draft  in the input field
  const [messageDraft, setMessageDraft] = useState(String);
  const messageClear = "";
  //this is just an example userID for now. It will be replaced with the actual logged in userID
  const [userTest, setUserTest] = useState("1");

  //This function updates the messageDraft variable to whatever the current value of the message input field is.
  const handleMessageDraft = (event: any) => {
    setMessageDraft(event.target.value);
  };

  //this function pushes a message in the chat into the DB
  const sendMessage = async () => {
    setUserTest("2");
    await createSample(messageDraft, userTest);

    loadMessages();
  };
  //this function  is used to get all the messages from the database
  const loadMessages = async () => {
    setTestMessages(await getSamples());
  };
  useEffect(() => {
    loadMessages(); // Load messages when the component mounts (page is loaded for the first time)
  }, []); // Empty dependency array ensures this effect runs only once on mount
  // State to keep track of the selected chat

 

//Dark Mode toggle effect
  const [darkMode, setDarkMode] = useState(true)
  useEffect(() => {
    toggleDarkMode(darkMode);
  }, [darkMode])

  //This is where we return the JSX (react HTML)  that makes up our page. the useState variables will re-render the page if they change.

  return (
    <Wrapper>
      <div className="items-top h-screen ">
        <h1>
          <div className="homepage-header">
            <button
              className="rounded-md bg-white pl-2 pr-2"
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              <text>Sign Out</text> 
            </button>
            <p className="pl-10"></p>
            
            <button
              className="rounded-md bg-white pl-2 pr-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              <text>{!darkMode ? "Dark Mode" : "Light Mode"}</text>
            </button>
            <p className="pl-10"></p>
            <button className="rounded-md bg-white pl-2 pr-2">
              <text>My Account</text>
            </button>
          </div>
        </h1>
       
        <div className="items-top flex h-5/6 pt-4   ">
         
           
          <ChatList 
            chats={chats} 
            setSelectedChat={setSelectedChat} 
            />
            
          <div className="items-top flex  w-2/3 pl-8 pt-1 ">
            <ChatWindow
              selectedChat={selectedChat}
              testMessages={testMessages}
            />
          </div>
        </div>
        <div className="items-top w-auto pb-2 pt-2">
          <input
            className="input-message"
            value={messageDraft}
            onChange={handleMessageDraft}
          ></input>

          <button
            onClick={sendMessage}
            disabled={false}
            className="w-100 ml-2 rounded-lg bg-white px-4 shadow-sm"
          >
            <text>send</text>
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
