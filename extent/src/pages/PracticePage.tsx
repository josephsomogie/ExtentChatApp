import React, { useState } from "react"
import TextInput from "~/components/TextInput"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Practice(){ 
    const  [username, setUsername] = useState("")
    const [password, setPassword] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [passVis, setPassVis] = useState(null)
    const [sampleData, setSampleData] = useState("Test")
  let router = useRouter()
    const handleInputChange = (event: any) => {
        setUsername(event.target.value);
      };

      const createSample = async (sampleData: String) => {
        const response = await fetch('/api/DBInteractions/Test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: sampleData }),
        });
        const newSample = await response.json();
        console.log("Sample: "+newSample)
        setSampleData(newSample.data);
        return newSample;
      };

      const fetchSamples = async () => {
        const response = await fetch('/api/');
        const samples = await response.json();
        return samples;
      };

      const testFunc = async () => {
        createSample('Data');
        
      }
  
      
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
   onClick={() => router.push('/HomePage')}
   >
        Log In
   </button>
      <p className="pt-2"></p>
   <button 
   className= "w-100 px-4 rounded-lg shadow-sm bg-white"
   onClick={() => router.push('/SignupPage')}
   >
        Sign Up
   </button>
   <p className="pt-2"></p>
   <button 
   className= "w-100 px-4 rounded-lg shadow-sm bg-white"
   onClick={testFunc}
   >
        Test Data
   </button>
   <p className="pt-2"></p>
   <button 
   className= "w-100 px-4 rounded-lg shadow-sm bg-white"
   onClick={testFunc}
   >
        Load Data
   </button>
   <p className="pt-2"></p>
   <text>{sampleData}</text>
   </center>
      </div>
     
    )
}