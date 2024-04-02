import React, { useEffect, useRef } from 'react';

interface Message {
  userID: string;
  data: string;
  id: string;
}

interface ChatWindowProps {
  selectedChat: string;
  testMessages: Message[];
}

const ChatWindow = ( {selectedChat, testMessages}:ChatWindowProps ) => {
  // Reference to the last message
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // Effect to scroll to the last message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [testMessages]);

  return (
    <div className="chatwindow">
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
                    <text className="text-left text-sm ">
                      {message.userID} said:
                    </text>
                    <div
                      className={
                        message.userID !== '1'
                          ? " w-auto rounded-lg bg-white text-center"
                          : " w-auto rounded-lg bg-blue-900 text-center"
                      }
                    >
                      {message.userID !== '1' ? (
                        <div className="flex items-center text-wrap">
                          {/*<Pfp />*/}
                          <text className="text-2xl p-2 break-words max-w-xl">{message.data}</text>
                        </div>
                      ) : (
                        <div className="flex items-center text-wrap">
                          <text className="text-2xl p-2 break-words max-w-xl">{message.data}</text>
                          {/*<Pfp />*/}
                        </div>
                      )}
                    </div>
                    {/*<text className="text-left text-sm">at {message.date}</text>*/}
                  </div>
                </div>
              ))}
      
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
