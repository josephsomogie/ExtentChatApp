import searchUsers from "~/FrontendApiCalls/searchUsers";
import pushConversations from "~/FrontendApiCalls/pushConversation";
import { User } from "~/ClientFunctions/interfaces";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function NewList(){
  const [users, setUsers] = useState<User[] |  null>(null);
  const [query, setQuery] = useState("");
  const[newChatId, setNewChatId] = useState("")
  const loadQuery = async () =>{
    const userData = await  searchUsers(query);
    setUsers(userData)
    console.log("user data: "+userData)
    console.log("users: "+users)

    console.log('my Name:'+myName)
    console.log("my ID: "+myId)
  }
  const  {data : session} = useSession();
  const [myName, setMyName] = useState <String | null>(session?.user.name || null )
  const [myId, setMyId] = useState <String | null>(session?.user.id || null )
  
    return (
      <div>
      <center>
        <div>
          <form
          onSubmit={loadQuery}
          >
            <textarea 
            placeholder="Search by username"
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}
            
            >
            </textarea>
          </form>
          <button
        onClick={loadQuery}
        ><text>search</text></button>
        </div>
        <div>
          {users ? users.map((user:User) =>(
            <div>
            <div
              key={user.id}
              onClick={() => pushConversations(user.name, [user.id, myId], myId)}
              className=" mb-2 cursor-pointer rounded-full bg-blue-500 px-4 py-2"
            >
              {user.name}
            </div>
            
            <p className=""></p> 
          </div>

          )): <p>Make a search</p>}
        </div>
        
      </center>
      </div>
    );
}