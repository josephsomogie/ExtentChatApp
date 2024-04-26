import { useState, useEffect } from "react";
import React from "react";
import { SendHorizontal } from 'lucide-react';
interface messageInputFuncs {
  handleSubmit: (e: any) => any;
  handleSend: (e: any) => any;
  setContent: (e: any) => any;
  setTyping: (t:boolean) => void;
}
//might run into issues with getting value, if so redesign this component
export default function MessageInput({ handleSend, handleSubmit, setContent }: messageInputFuncs) {
  const [val, setVal] = useState('');

  const onChange = (e: any) => {
    const newValue = e.target.value;
    setContent(newValue); // Update external state 
    setVal(newValue); // Update internal state to control input
  };

  const onEnter = (e: any) => {
    
    if(e.key === 'Enter'){
      e.preventDefault();
      handleSend(val)
      setVal('');
    }
  }
 

  
  


  return (
    <div className="flex justify-center w-screen font-ubuntu">
      <form onSubmit={(e:any) => {e.preventDefault()}} className="flex w-1/2 max-h-fit ">
        <textarea 
          className="input-message w-full text-wrap break-all max-h-fit resize-none dark:text-white text-black"
          placeholder="Type a message..."     
          onChange={onChange}
          value={val}
          onKeyDown={onEnter}
        />          
        <button
          //type="submit" //button triggers form submission
          className="ml-2 rounded-lg bg-cyan-600 px-4 shadow-sm"
          onClick={()=> {handleSend(val); setVal('');}} 
        >
          <SendHorizontal style={{color:'white'}}/>
        </button>
      </form>
    </div>
  );
}
