'use client'
interface homeHeaderFuncs{
    buttonOneClick: (e: any) => any,
    buttonTwoClick: (e: any) => any,
    buttonThreeClick: (e: any) => any,
    darkMode: boolean
}
import { useSession } from 'next-auth/react';
import { LogOut, Moon, Sun, SquareUserRound } from 'lucide-react';
export default function HomeHeader({buttonOneClick,buttonTwoClick,buttonThreeClick, darkMode}:homeHeaderFuncs){
  const {data: session, status} = useSession();
    return (
        <h1>
          <div className="homepage-header">
            <button
              className="rounded-md bg-gray-300 dark:bg-slate-500 dark:text-white pl-2 pr-2"
              onClick={buttonOneClick}
            >
              <LogOut/>
            </button>
            <p className="pl-10"></p>
            
            <button
              className="rounded-md bg-gray-300 dark:bg-slate-500 dark:text-white py-1 px-2"
              onClick={buttonTwoClick}
            >
              {!darkMode ? <Sun/> : <Moon/>}
            </button>
            <p className="pl-10"></p>
            <button className="rounded-md bg-gray-300 dark:bg-slate-500 dark:text-white pl-2 pr-2"
            onClick={buttonThreeClick}>
              {/*session?.user.image ? <img src={session?.user.image} /> :*/ <SquareUserRound/>}
            </button>
          </div>
        </h1>
    )
}