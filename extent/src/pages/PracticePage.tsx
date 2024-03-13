import React, { useState } from "react"
import TextInput from "~/components/TextInput"
import Image from "next/image"
import { useRouter } from "next/router"
export default function Practice(){
    const  [username, setUsername] = useState("")
    const [password, setPassword] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [passVis, setPassVis] = useState(null)
  let router = useRouter()
    const handleInputChange = (event: any) => {
        setUsername(event.target.value);
      };

    return(
    
      
      <div
      className="bg-violet-950 min-h-screen"
      >
        <center className="pb-10 pt-10">
        <Image src="/images/Logo.png" alt="Extent Logo" width="200" height="200">
          
        </Image>
        </center>
        <center>
        
        </center>
        <center>
        <input
        type = "text"
        onChange ={handleInputChange}
        defaultValue={"Username"}
        className="w-100 px-4 py-2 text-lg placeholder-gray-500 bg-cyan-600   rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <p className='pt-5'></p>
        <input
        type = "password"
        className="w-100 px-4 py-2 text-lg placeholder-gray-500 bg-cyan-600   rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        </center>
      
            <center className="pt-5">
   <button 
   className= "w-100 px-4 rounded-lg shadow-sm bg-white"
   onClick={() => router.push('/SignupPage')}
   >
        Log In
   </button>
   </center>
      </div>
     
    )
}