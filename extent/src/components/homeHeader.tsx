'use client'
interface homeHeaderFuncs{
    buttonOneClick: (e: any) => any,
    buttonTwoClick: (e: any) => any,
    buttonThreeClick: (e: any) => any,
    darkMode: boolean
}
export default function HomeHeader({buttonOneClick,buttonTwoClick,buttonThreeClick, darkMode}:homeHeaderFuncs){
    return (
        <h1>
          <div className="homepage-header">
            <button
              className="rounded-md bg-white pl-2 pr-2"
              onClick={buttonOneClick}
            >
              <text>Sign Out</text>
            </button>
            <p className="pl-10"></p>
            
            <button
              className="rounded-md bg-white pl-2 pr-2"
              onClick={buttonTwoClick}
            >
              <text>{!darkMode ? "Dark Mode" : "Light Mode"}</text>
            </button>
            <p className="pl-10"></p>
            <button className="rounded-md bg-white pl-2 pr-2">
              <text>My Account</text>
            </button>
          </div>
        </h1>
    )
}