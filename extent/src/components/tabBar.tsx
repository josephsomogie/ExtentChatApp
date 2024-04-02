interface TabBarFuncs{
    buttonOneClick: () => void;
    buttonTwoClick: () => void;
    buttonThreeClick: () => void;
}

export default function TabBar({buttonOneClick, buttonTwoClick, buttonThreeClick}:TabBarFuncs) {
  return (
    <div className=''>
      <button className=" w-1/3 rounded-sm bg-cyan-600 px-4 shadow-sm"
      onClick={buttonOneClick}
      >
        <text>new chat</text>
      </button>
      <button className=" w-1/3 rounded-sm bg-cyan-600 px-4 shadow-sm"
      onClick={buttonTwoClick}
      >
        <text>Chats</text>
      </button>
      <button className=" w-1/3 rounded-sm bg-cyan-600 px-4 shadow-sm"
      onClick={buttonThreeClick}
      >
        <text>Friends</text>
      </button>
    </div>
  );
}