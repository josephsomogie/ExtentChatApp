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
    if(query.length ===0) return;
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
    return (
      <div>
      <center>
        <div className='flex flex-row justify-center'>
          <form
          onSubmit={loadQuery}
          >
            <textarea 
            className='rounded-sm'
            placeholder="Search by username"
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}
            />
            
          </form>
          <button
        onClick={loadQuery}
        className=' m-2 p-1 rounded-md text-white bg-blue-500'
        >search</button>
        </div>
        <div className=''>
          {users ? users.map((user:User) =>(
            <div>
            <div
              key={user.id}
              onClick={toggleModal/*() => pushConversations(user.name, [user.id, myId], myId)*/}
              className=" mb-2 cursor-pointer rounded-full bg-blue-500 px-4 py-2"
            >
              {user.name}
            </div>
            
            <p className=""></p> 
            <Modal isOpen={isModalOpen} toggle={toggleModal} user={user} id={myId}/>
          </div>
          
          )): <p>Make a search...</p>}
        </div>
        
      </center>
      </div>
    );
}


interface modalFuncs {
  isOpen: boolean,
  toggle: ()=>void
  user: User
  id: string
}

function Modal({isOpen, toggle, user, id}:modalFuncs) {
 

  const handleBackgroundClick = (event: any) => {
    if (event.target === event.currentTarget) {
      toggle();
    }
  };

  const handleSubmit = () => {
    pushConversations(convoName, [user.id, id], id)
    toggle();
  }
const [convoName, setConvoName] = useState<string | null>(null)
  return (
    <div>
      
      {isOpen && (
        <dialog onClick={(e)=>{handleBackgroundClick(e)}}className="fixed left-0 top-0 w-full h-full rounded-md bg-black bg-opacity-50 z-50 overflow-auto  flex justify-center items-center">
          <div className="bg-gray-200 m-auto p-8">
            <div className="flex flex-col items-center">
              <h3>New Conversation with  {user.name}</h3>
              <br/>
              <input placeholder="conversation name"
              onChange={(e)=>{setConvoName(e.target.value)}}
              ></input>
              <div>
              <button onClick={handleSubmit} className=" bg-blue-500 m-2 rounded-md text-white p-2">create</button>
              <button onClick={toggle} className=" bg-red-700 m-2 rounded-md text-white p-2">Cancel</button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}