import React, { useState, useEffect } from "react";
import TextInput from "~/components/TextInput";
import Image from "next/image";
import { useRouter } from "next/router";
import Wrapper from "~/components/PurpleWrapper";
import {
  Logo,
  LightLogo,
  DarkLogo,
  AutoLogo,
} from "~/components/LogoComponent";
import { getServerAuthSession } from "~/server/auth";
import toggleDarkMode from "~/ClientFunctions/DarkmodeToggle";
import { signIn } from "next-auth/react";
export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [passVis, setPassVis] = useState(null);
  const [sampleData, setSampleData] = useState("Test");
  let router = useRouter();
  const handleInputChange = (event: any) => {
    setUsername(event.target.value);
  };
  useEffect(() => {
    toggleDarkMode(true);
  }, []);

  return (
    <div className="animated-background h-screen w-screen flex-col">
      <div className="content-wrapper">
        <center className="pb-10 pt-10">
          <AutoLogo />
        </center>

        <center className="pt-5">
          <button
            className="w-100 rounded-lg bg-white px-4 font-ubuntu font-bold shadow-sm"
            onClick={() => {
              signIn("google", { callbackUrl: "http://localhost:3000" });
            }}
          >
            Log In With Google
          </button>
          <p className="pb-2 pt-2"></p>
          <button
            className="w-100 rounded-lg bg-white px-4 font-ubuntu font-bold shadow-sm"
            onClick={() => {
              signIn("discord", { callbackUrl: "http://localhost:3000" });
            }}
          >
            Log In With Discord
          </button>
          <p className="pb-2 pt-2"></p>
          <button
            className="w-100 rounded-lg bg-white px-4 font-ubuntu font-bold shadow-sm"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
          <p className="pt-2"></p>
        </center>
      </div>
    </div>
  );
}
