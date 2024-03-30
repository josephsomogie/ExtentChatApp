import Head from "next/head";
import Link from "next/link";
import Practice from "./login/login";
import HomeP from "./home/HomePage";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <HomeP />;
  }

  return <Practice />;
}
