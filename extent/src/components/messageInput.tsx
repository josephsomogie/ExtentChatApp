import { useState } from "react";
import React from "react";

import { SendHorizontal } from 'lucide-react';
interface messageInputFuncs {
  handleSubmit: (e: any) => any;
  handleSend: (e: any) => any;
  setContent: (e: any) => any;
}
//might run into issues with getting value, if so redesign this component
export default function MessageInput({ handleSend, handleSubmit, setContent }: messageInputFuncs) {
  const [val, setVal] = useState('');

  const onChange = (e: any) => {
    const newValue = e.target.value;
    setContent(newValue); // Update external state 
    setVal(newValue); // Update internal state to control input
  };

  const onSend = (e: any) => {
    e.preventDefault(); // Prevent form submission
    handleSend(val); // Ensure handleSend uses the current message
    setVal(''); // Clear textarea after sending
  };

  return (
    <div className="flex justify-center w-screen">
      <form onSubmit={onSend} className="flex w-1/2 max-h-fit ">
        <textarea 
          className="input-message w-full text-wrap break-all max-h-fit resize-none dark:text-white text-black"
          placeholder="Type a message..." 
          onChange={onChange}
          value={val}
        />          
        <button
          type="submit" //button triggers form submission
          className="ml-2 rounded-lg bg-cyan-600 px-4 shadow-sm"
        >
          <SendHorizontal style={{color:'white'}}/>
        </button>
      </form>
    </div>
  );
}
