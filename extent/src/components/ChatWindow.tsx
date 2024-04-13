import React, { useEffect, useRef, useState } from 'react';
import type { Chat } from '@prisma/client';
import { useSession } from 'next-auth/react';


interface ChatWindowProps {
  selectedChat: string;
  typing: boolean;
  Messages: Chat[];

}

const ChatWindow = ( {selectedChat, Messages, typing}:ChatWindowProps ) => {

  const {data: session, status} = useSession();
  // Reference to the last message
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

 

  // Effect to scroll to the last message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Messages]);
  useEffect(()=>{},[typing])

  return (
    <div className="chatwindow">
      <center>
      <h2>{selectedChat}</h2>
      </center>
              {Messages === undefined ? (<p className =" dark:text-white ">Loading...</p>) : Messages.map((message, index) => (
                <div
                  className={
                    
                    message.userId === session?.user.id
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                  key={index}
                >
                  <div>
                    
                    <text className={ message.userId !== session?.user.id ? "text-left text-sm dark:text-white" : "text-left text-sm "}>
                      {message.username} at  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:
                    </text>
                    <div
                      className={
                        message.userId !== session?.user.id
                          ? " w-auto rounded-lg bg-white text-left"
                          : " w-auto rounded-lg bg-blue-900 text-left"
                      }
                    >
                      {message.userId !== session?.user.id ? (
                        <div className="flex   items-center text-wrap">
                          {/*<Pfp />*/}
                         
                          <text className="text-2xl p-2 break-words  w-fit max-w-xl">{message.content}</text>
                        </div>
                      ) : (
                        <div className="flex items-center  text-wrap">
                          <text className="text-2xl p-2 break-words w-fit max-w-xl text-white">{message.content}</text>
                          {/*<Pfp />*/}
                          {/*session.user.image !== null ? <img src={session.user.image} width='50' className='rounded-lg justify-self-end' ></img> : <img src='/images/blank_pfp.png' > </img>*/}
                        </div>
                        
                      )}
                      
                        
                    </div>
                  </div>
                  
                </div>
                
              ))}
      {typing ? <div className='text-white pt-4'>typing...</div> : null}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
