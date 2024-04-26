import React, { useEffect, useRef, useState } from "react";
import type { Chat } from "@prisma/client";
import { useSession } from "next-auth/react";

interface ChatWindowProps {
  selectedChat: string;
  typing: boolean;
  Messages: Chat[];
}

const ChatWindow = ({ selectedChat, Messages, typing }: ChatWindowProps) => {
  const { data: session, status } = useSession();
  // Reference to the last message
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // Effect to scroll to the last message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);
  useEffect(() => { }, [typing]);

  return (
    <div className="chatwindow font-ubuntu">
      <center>
        <h2>{selectedChat}</h2>
      </center>
      {Messages === undefined ? (
        <p className=" dark:text-white ">Loading...</p>
      ) : (
        Messages.map((message, index) => (
          <div
            className={
              message.userId === session?.user.id
                ? "flex justify-end"
                : "flex justify-start"
            }
            key={index}
          >
            <div>
              <text
                className={
                  message.userId !== session?.user.id
                    ? "text-left text-sm dark:text-white"
                    : "text-left text-sm "
                }
              >
                {message.username} at{" "}
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                :
              </text>
              <div
                className={
                  message.userId !== session?.user.id
                    ? " w-auto rounded-lg bg-teal-500 text-left"
                    : " w-auto rounded-lg bg-blue-900 text-left"
                }
              >
                {message.userId !== session?.user.id ? (
                  <div className="flex   items-center text-wrap">
                    {/*<Pfp />*/}

                    <text className="w-fit max-w-xl break-words  p-2 text-2xl text-white">
                      {message.content}
                    </text>
                  </div>
                ) : (
                  <div className="flex items-center  text-wrap">
                    <text className="w-fit max-w-xl break-words p-2 text-2xl text-white">
                      {message.content}
                    </text>
                    {/*<Pfp />*/}
                    {/*session.user.image !== null ? <img src={session.user.image} width='50' className='rounded-lg justify-self-end' ></img> : <img src='/images/blank_pfp.png' > </img>*/}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      {typing ? <div className="pt-4 text-white">typing...</div> : null}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;

/****Description***********
 * The ChatWindow component is a React functional component designed to manage and display chat messages within a web application, 
 * specifically tailored for a chat interface that utilizes Next.js and Prisma ORM for data handling. Here’s a breakdown of its structure and functionality:

Imports and Dependencies: The component imports essential hooks from React (useEffect, useRef, useState) and type definitions. 
It also imports useSession from next-auth/react for session management, ensuring that user authentication states are properly handled.
Component Props: ChatWindow accepts three props:
selectedChat: A string indicating the current chat or chat room's name.
typing: A boolean indicating whether the other user is currently typing a message.
Messages: An array of chat messages of type Chat, which includes message details like sender, timestamp, and content.
Session Handling: It uses the useSession hook to fetch and monitor the current user session, helping to determine 
if a message was sent by the logged-in user or another user.
Message Display Logic: Messages are displayed in a flex container that adjusts dynamically:
Messages sent by the current user are aligned to the right (flex justify-end).
Messages from other users are aligned to the left (flex justify-start).
Styling and User Feedback:
Each message shows the sender's username, the time sent, and the message content.
The component styles differ based on whether the message is from the current user or another, 
using different background colors for visual distinction.
A real-time typing indicator displays when the typing prop is true.
Scrolling Behavior: A useEffect hook ensures that the view scrolls to the last message automatically 
whenever the Messages array updates, enhancing user experience by keeping recent messages in view.
Conditional Rendering: It handles scenarios where messages are not immediately available (e.g., while loading) by displaying a "Loading..." message.
This component is structured to be responsive and visually intuitive, making it suitable for real-time chat applications where user interaction and real-time updates are crucial.
*/ 