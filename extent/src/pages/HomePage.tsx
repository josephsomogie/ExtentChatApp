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



export default function Home() {
  //this is our pages router, it allows us to navigate the application via file names.
  const router = useRouter();

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

  //Deprecated dummy data
  /*
  const messages = [
    {
      messageID: 1,
      userId: 1,
      username: "testUser",
      date: "5:30",
      content: "You SMELL!",
    },
    {
      messageID: 2,
      userId: 2,
      username: "testUser",
      date: "5:31",
      content: "Hello world!",
    },
    {
      messageID: 3,
      userId: 1,
      username: "testUser",
      date: "5:31",
      content: "You !",
    },
  ];*/

  //our array of messages
  const [testMessages, setTestMessages] = useState([])
//variable and setter function for creating/updating a message draft  in the input field
  const [messageDraft, setMessageDraft] = useState(String)
  //this is just an example userID for now. It will be replaced with the actual logged in userID 
  const [userTest, setUserTest] = useState('1')

  //This function updates the messageDraft variable to whatever the current value of the message input field is.
  const handleMessageDraft = (event: any) => {
    setMessageDraft(event.target.value)
  }


//this function pushes a message in the chat into the DB
const sendMessage = async () => {
  setUserTest("2");
  await createSample(messageDraft,userTest);
  loadMessages();
  
}
//this function  is used to get all the messages from the database
const loadMessages = async () => {
  setTestMessages(await getSamples())

}
useEffect(() => {
  loadMessages(); // Load messages when the component mounts (page is loaded for the first time)
}, []); // Empty dependency array ensures this effect runs only once on mount
  // State to keep track of the selected chat

  //This is a variable and its setter function to to set which conversation is selected 
  const [selectedChat, setSelectedChat] = useState(String);

  //This is where we return the JSX (react HTML)  that makes up our page. the useState variables will re-render the page if they change.
  return (
    <Wrapper>
      <div className="items-top ">
        <h1>
          <div className="flex justify-center rounded-md bg-gray-500 pb-4 pt-4">
            <button
              className="rounded-md bg-white pl-2 pr-2"
              onClick={() => router.replace("/PracticePage")}
            >
              <text>Sign Out</text>
            </button>
            <p className="pl-10"></p>
            <button
              className="rounded-md bg-white pl-2 pr-2"
              onClick={() => router.replace("/PracticePage")}
            >
              <text>Settings</text>
            </button>
            <p className="pl-10"></p>
            <button
              className="rounded-md bg-white pl-2 pr-2"
              onClick={loadMessages}
            >
              <text>My Account</text>
            </button>
          </div>
        </h1>
        <div className="items-top flex h-full pt-4   ">
          {/* Chat list column */}
          <div className=" ml-4 h-screen w-1/5 items-center overflow-y-auto rounded-lg bg-gray-500 p-2 ">
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

          {/* Chat display section */}

          <div className="items-top flex  w-2/3 pl-8 pt-1 ">
            <div className=" parent-div  h-screen w-full items-center overflow-y-auto rounded-lg bg-gray-500 p-2 ">
              <h2>{selectedChat}</h2>
              {testMessages.length === 0 ? (<p>Loading...</p>) : testMessages.map((message, index) => (
                <div
                  className={
                    message.userID === '1'
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                  key={index}
                >
                  <div>
                    <text className="text-left text-sm">
                      {message.userID} said:
                    </text>
                    <div
                      className={
                        message.userID !== '1'
                          ? " w-auto rounded-lg bg-white text-center"
                          : " w-auto rounded-lg bg-blue-500 text-center"
                      }
                    >
                      {message.userID !== '1' ? (
                        <div className="flex items-center">
                          <Pfp />
                          <text className="text-2xl pl-1 pr-1">{message.data}</text>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <text className="text-2xl pl-1 pr-1">{message.data}</text>
                          <Pfp />
                        </div>
                      )}
                    </div>
                    {/*<text className="text-left text-sm">at {message.date}</text>*/}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="items-top pb-2 pt-2 w-auto">
          <input className="min-w-20 w-auto bg-white"
          value={messageDraft}
          onChange={handleMessageDraft} 
          >

          </input>
         
          <button onClick={sendMessage}
          disabled={false}
          className="w-100 px-4 rounded-lg shadow-sm bg-white ml-2">
            <text>send</text>
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
