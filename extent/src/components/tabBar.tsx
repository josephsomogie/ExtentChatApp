interface TabBarFuncs{
    buttonOneClick: () => void;
    buttonTwoClick: () => void;
    buttonThreeClick: () => void;
    selected: string;
}

export default function TabBar({buttonOneClick, buttonTwoClick, buttonThreeClick, selected}:TabBarFuncs) {
  const selectedClass:string = "w-1/3  bg-blue-500 text-white px-4 shadow-sm p-1"
  const unselectedClass:string = "w-1/3 rounded-sm bg-gray-700 text-white px-4 shadow-sm p-1"
  return (
    <div className='pb-2 flex flex-row'>
      <button className={selected==="New" ?  selectedClass : unselectedClass } 
      onClick={buttonOneClick}
      >
        new chat
      </button>
      <button className={selected==="Chats" ?  selectedClass : unselectedClass }
      onClick={buttonTwoClick}
      >
       Chats
      </button>
      <button className={selected==="Friends" ?  selectedClass : unselectedClass }
      onClick={buttonThreeClick}
      >
       Friends
      </button>
    </div>
  );
}