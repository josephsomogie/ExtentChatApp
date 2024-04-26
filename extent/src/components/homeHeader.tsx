"use client";
interface homeHeaderFuncs {
  buttonOneClick: (e: any) => any;
  buttonTwoClick: (e: any) => any;
  buttonThreeClick: (e: any) => any;
  darkMode: boolean;
}
import { useSession } from "next-auth/react";
import { LogOut, Moon, Sun, SquareUserRound } from "lucide-react";
export default function HomeHeader({
  buttonOneClick,
  buttonTwoClick,
  buttonThreeClick,
  darkMode,
}: homeHeaderFuncs) {
  const { data: session, status } = useSession();
  return (
    <h1>
      <div className="homepage-header">
        <button
          className="g-transparent rounded-md pl-2 pr-2 text-white outline"
          onClick={buttonOneClick}
        >
          <LogOut />
        </button>
        <p className="pl-10"></p>

        <button
          className="g-transparent rounded-md px-2 py-1 text-white outline"
          onClick={buttonTwoClick}
        >
          {!darkMode ? <Sun /> : <Moon />}
        </button>
        <p className="pl-10"></p>
        <button
          className="g-transparent rounded-md pl-2 pr-2 text-white outline"
          onClick={buttonThreeClick}
        >
          {
            /*session?.user.image ? <img src={session?.user.image} /> :*/ <SquareUserRound />
          }
        </button>
      </div>
    </h1>
  );
}
