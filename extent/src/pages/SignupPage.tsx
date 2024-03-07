import React, { useState } from "react"
import { useRouter } from "next/router"
import Wrapper from "~/components/PurpleWrapper"
import Button from "~/components/SubmitButton"
export default function Signup() {
//useState for signup variables
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [password2, setPassword2] = useState('')
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

    return(
<Wrapper>
    <p>Test!</p>
    <p
    className="pb-5"
    >
    <input
    onChange={(event) => handleInputChange(event, setPassword)}
    ></input>
    </p>
    <p
    className="pb-5"
    >
    <input
    onChange={(event) => handleInputChange(event, setEmail)}
    ></input>
    </p>
    <p>{errVis? errMsg: null}</p>
    <p>{username}</p>
    <p>{email}</p>
    <button
        className="w-100 px-4 rounded-lg shadow-sm bg-white"
        onClick={onSignupClick}
        
        >
          <text>Sign Up</text>
        </button>
</Wrapper>
    );
}