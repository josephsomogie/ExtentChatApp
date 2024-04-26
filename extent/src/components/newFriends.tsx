'use client';
import { User } from "~/ClientFunctions/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import searchUsers from "~/customMiddleware/searchUsers";
interface friendsProps{

}
export default function FriendsTab(){
    const { data: session, status} = useSession();
    const [myName, setMyName] = useState <String | null>(session?.user.name || null )
  const [myId, setMyId] = useState <String | null>(session?.user.id || null )
    const [query, setQuery] = useState("")
    const [users, setUsers] = useState<User[] |  null>(null);
    const loadQuery = async () =>{
        if(query.length ===0) return;
        const userData = await  searchUsers(query);
        setUsers(userData)
        console.log("user data: "+userData)
        console.log("users: "+users)
    
        console.log('my Name:'+myName)
        console.log("my ID: "+myId)
      }
      const onEnter = (e: any) => {
    
        if(e.key === 'Enter'){
          e.preventDefault();
          loadQuery();
        }
      }

    const [fr, setFr] = useState(false);
    return(
        <>
            <div>
                <center className=''>
                    <button 
                    className="w-100 rounded-lg bg-transparent outline text-white px-4 mb-2 font-ubuntu font-bold shadow-sm"
                    onClick={()=>setFr(!fr)} 
                    > {fr ? 'Friends' : 'Friend Requests'}
                    </button>
                    <div className='flex flex-row border-b w-5/6'>
                        <textarea
                         className='rounded-sm resize-none w-full px-2 dark:placeholder-white placeholder-black dark:bg-transparent place-content-center h-1/3 dark:text-white outline-none  '
                         placeholder="Search by username"
                         onChange={(e)=>{setQuery(e.target.value)}}
                        onKeyDown={(e)=>onEnter(e)}
                        >

                        </textarea>
                    </div>
                {fr ? <FriendReqList userId={session?.user.id}/> : <FriendsList userId={session?.user.id} />}   
                </center>
            </div>
        </>
    )
}
import pullRequests from "~/customMiddleware/pullFriendRequests";
import type { Friendship } from "@prisma/client";
function FriendsList(userId: string ) {

    return(
        <>
        </>
    );
}

export function FriendReqList(userId:string){
    const [requests, setRequests] = useState<Friendship[] | null>([])
    async function  getRequests(){
    const reqs =  await pullRequests(userId);
    setRequests(reqs)
    }
    useEffect(() =>{getRequests();},[]);
    
    return(
        <>
        {requests === undefined? <center className='text-white'>No Friend Requests! :C </center> : requests.map((request:Friendship) =>(
            <div>
            <div
              key={request.id}
              onClick={()=>{}}
              className=" mx-2 mb-2 cursor-pointer rounded-sm bg-gray-600 hover:bg-gray-400 px-4 py-2 text-white"
            >
              {request.senderId}
            </div>
            
            <p className=""></p> 
          </div>
          
          ) )}
        </>

    );
}