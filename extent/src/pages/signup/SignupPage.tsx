import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Wrapper from "~/components/PurpleWrapper"
import Button from "~/components/SubmitButton"
import { Logo, LightLogo, DarkLogo, AutoLogo } from "~/components/LogoComponent"
import { Session } from "next-auth";
import { useSession, signIn } from "next-auth/react";
export default function Signup() {
//useState for signup variables
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [password2, setPassword2] = useState('')

const[passVis, setPassVis] = useState(false) //Visibility of password

//Function handles changes to input fields, and updates corresponding values.
const handleInputChange = (event: any, setter: Function) => {
    setter(event.target.value);
}
//initialize  router object
const router = useRouter();

//Error Message Displayer
const [errMsg, setErrMsg] = useState('')
const [errVis, setErrVis] = useState(false)

const onSignupClick = () => {
    if(password !== password2 && password !== ''){
        //set error message
        setErrMsg("Passwords do not match.")
        setErrVis(true)
    }
}


const [session, setSession] = useState<string | undefined>(undefined);
const findSession = async () =>{

  setSession(session_test?.user.id)
}
useEffect(() =>{
 findSession(),
  []
})
//THIS IS ALL WE NEEDED THIS WHOLE TIME SHOOT ME
const { data: session_test } = useSession();
//http://localhost:3000/api/auth/signin
    return(
<Wrapper>
    <p className ="pt-5"></p>
    <AutoLogo/>
   
    <p
    className="pb-5 pt-5"
    >
    <input
    onChange={(event) => handleInputChange(event, setUsername)}
    className="w-100 px-4 py-2 text-lg placeholder-white bg-cyan-600   rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    placeholder="Username"
    ></input>
    </p>
    <p
    className="pb-5"
    >
    <input
    onChange={(event) => handleInputChange(event, setEmail)}
    className="w-100 px-4 py-2 text-lg placeholder-white bg-cyan-600   rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    placeholder="Email"
    ></input>
    </p>

    <div>
    <p
    className="pb-5"
    >
    <input
    onChange={(event) => handleInputChange(event, setPassword)}
    className="w-100 px-4 py-2 text-lg placeholder-white bg-cyan-600   rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    placeholder='Password'
    type= {passVis ? 'text' : 'password'}
    ></input>
    </p>
    <p
    className="pb-5"
    >
    <input
    onChange={(event) => handleInputChange(event, setPassword2)}
    className="w-100 px-4 py-2 text-lg placeholder-white bg-cyan-600   rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    placeholder='Retype Password'
    type= {passVis ? 'text' : 'password'}
    ></input>
    </p>
    </div>
    <p>{errVis? errMsg: null}</p>
    <p>{username}</p>
    <p>{email}</p>
    <button
        className="w-100 px-4 rounded-lg shadow-sm bg-white"
        
        
        >
          <text>Create Account</text>
        </button>
        <p className = 'pt-2 pb-2 '></p>
      
      <p className = 'pt-2 pb-2 '></p>
        <button
        className="w-100 px-4 rounded-lg shadow-sm bg-white"
        onClick={ () =>router.replace('/login')}
        
        >
          <text> Log In </text>
        </button>
</Wrapper>
    );
}

