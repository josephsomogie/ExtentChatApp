import React, { useState } from "react"
import TextInput from "~/components/TextInput"
import Image from "next/image"
import { useRouter } from "next/router"
import Wrapper from "~/components/PurpleWrapper"
import {Logo, LightLogo, DarkLogo, AutoLogo} from "~/components/LogoComponent"
import { getServerAuthSession } from "~/server/auth"

export default  function Practice(){ 
  
    const  [username, setUsername] = useState("")
    const [password, setPassword] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [passVis, setPassVis] = useState(null)
    const [sampleData, setSampleData] = useState("Test")
  let router = useRouter()
    const handleInputChange = (event: any) => {
        setUsername(event.target.value);
      };

      
  
      
    return(
    
  <Wrapper>
      
        <center className="pb-10 pt-10">
        <AutoLogo/>
        </center>
        <center>
        
        </center>
        <center>
        <input
        type = "text"
        onChange ={handleInputChange}
        className="input-1"
        placeholder='Username'
        />
        <p className='pt-5'></p>
        <input
        type = "password"
        className="input-1"
        placeholder="Password"
        />
        </center>

            <center className="pt-5">
   <button 
   className= "w-100 px-4 rounded-lg shadow-sm bg-white"
   onClick={() => router.push('/HomePage')}
   >
        Log In
   </button>
      <p className="pt-2 pb-2"></p>
   <button 
   className= "w-100 px-4 rounded-lg shadow-sm bg-white"
   onClick={() => router.push('/SignupPage')}
   >
        Sign Up
   </button>
   <p className="pt-2"></p>
   
   </center>
      
      </Wrapper>
    )
}