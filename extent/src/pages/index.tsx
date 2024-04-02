import Head from "next/head";
import Link from "next/link";
import LogIn from "./login/login";
import HomePage from "../components/HomeComponent";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <HomePage />;
  }

  return <LogIn/>;
}
