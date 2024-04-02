interface messageInputFuncs {
  handleSubmit: (e: any) => any;
  handleSend: (e: any) => any;
}
//might run into issues with getting value, if so redesign this component
export default function MessageInput({
  handleSend,
  handleSubmit,
}: messageInputFuncs) {
  return (
    <div className="flex justify-center ">
      <form onSubmit={handleSubmit}>
        <textarea 
        className="input-message w-full text-wrap break-all"
        placeholder="Type a message..." 
        >          
        </textarea>
      </form>
      <button
        className=" ml-2  rounded-lg bg-cyan-600 px-4 shadow-sm"
        onClick={handleSend}
      >
        <text>{"send"}</text>
      </button>
    </div>
  );
}
