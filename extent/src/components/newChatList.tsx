import searchUsers from "~/customMiddleware/searchUsers";
import pushConversations from "~/customMiddleware/pushConversation";
import { User } from "~/ClientFunctions/interfaces";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Check, Search, X } from "lucide-react";
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
  const onEnter = (e: any) => {
    
    if(e.key === 'Enter'){
      e.preventDefault();
      loadQuery();
    }
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
           <div className='flex flex-row border-b'>
            <textarea 
            className='rounded-sm resize-none w-full px-2 dark:placeholder-white placeholder-black dark:bg-transparent place-content-center h-1/3 dark:text-white outline-none  '
            placeholder="Search by username"
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}
            onKeyDown={(e)=>onEnter(e)}
            >
              
            </textarea>
            <Search 
              style={{color:'white', marginTop:12, marginLeft:6, backgroundColor:'transparent ', }}
              onClick={loadQuery}
              
              />
            </div>
            
          </form>
         
        </div>
        <div className='py-2'>
          {users ? users.map((user:User) =>(
            <div>
            <div
              key={user.id}
              onClick={toggleModal}
              className=" mx-2 mb-2 cursor-pointer rounded-sm bg-gray-600 hover:bg-gray-400 px-4 py-2 text-white"
            >
              {user.name}
            </div>
            
            <p className=""></p> 
            <Modal isOpen={isModalOpen} toggle={toggleModal} user={user} id={myId}/>
          </div>
          
          )): <p className='dark:text-white pt-4'>0 Results...</p>}
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
          <div className="bg-slate-500 m-auto p-8">
            <div className="flex flex-col items-center">
              <h3>New Conversation with  {user.name}</h3>
              <br/>
              <input placeholder="conversation name"
              onChange={(e)=>{setConvoName(e.target.value)}}
              ></input>
              <div className='flex flex-row py-2'>
              <Check onClick= {handleSubmit} style={{ color:'green', marginRight:25}}/>
              <X onClick={toggle} style={{color:'red'}}/>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}