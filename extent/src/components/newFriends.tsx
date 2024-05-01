"use client";
import { User } from "~/ClientFunctions/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import searchUsers from "~/customMiddleware/searchUsers";
interface friendsProps {}
export default function FriendsTab() {
  const { data: session, status } = useSession();
  const [myName, setMyName] = useState<string>(session?.user?.name || "noSession");
  const [myId, setMyId] = useState<String | null>(session?.user.id || null);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[] | null>(null);
  const loadQuery = async () => {
    if (query.length === 0) return;
    const userData = await searchUsers(query);
    setUsers(userData);
    console.log("user data: " + userData);
    console.log("users: " + users);

    console.log("my Name:" + myName);
    console.log("my ID: " + myId);
  };
  const onEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loadQuery();
    }
  };

  const [fr, setFr] = useState(false);
  return (
    <>
      <div>
        <center className="">
          <button
            className="w-100 mb-2 rounded-lg bg-transparent px-4 font-ubuntu font-bold text-white shadow-sm outline"
            onClick={() => setFr(!fr)}
          >
            {" "}
            {fr ? "Friends" : "Friend Requests"}
          </button>
          <div className="flex w-5/6 flex-row border-b">
            <textarea
              className="h-1/3 w-full resize-none place-content-center rounded-sm px-2 placeholder-black outline-none dark:bg-transparent dark:text-white dark:placeholder-white  "
              placeholder="Search by username"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={(e) => onEnter(e)}
            ></textarea>
          </div>
          {fr ? (
            <FriendReqList userId={myName} />
          ) : (
            <FriendsList userId={myName} />
          )}
        </center>
      </div>
    </>
  );
}
import pullRequests from "~/customMiddleware/pullFriendRequests";
import pullFriends from "~/customMiddleware/pullFriends";
import type { Friendship } from "@prisma/client";
interface  Props{
  userId: string
}
function FriendsList({userId}:Props) {
  const [friends, setFriends] = useState<Friendship[] | null>([]);
  async function getFriends(){
    const data = await pullFriends(userId);
    setFriends(data);
  }
  useEffect(() => {
    getFriends();
  }, []);
  return(<>
  {friends === undefined || friends === null ? (
        <center className="text-white">No Friends! :C </center>
      ) : (
        friends.map((friend: Friendship) => (
          <div>
            <div
              key={friend.id}
              onClick={() => {}}
              className=" mx-2 mb-2 cursor-pointer rounded-sm bg-gray-600 px-4 py-2 text-white hover:bg-gray-400"
            >
              {friend.senderId}
            </div>

            <p className=""></p>
          </div>
        ))
      )}
  
  </>);
}

export function FriendReqList({userId}:Props) {
  const [requests, setRequests] = useState<Friendship[] | null>([]);
  async function getRequests() {
    const reqs = await pullRequests(userId);
    setRequests(reqs);
  }
  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      {requests === undefined  || requests === null? (
        <center className="text-white">No Friend Requests! :C </center>
      ) : (
        requests.map((request: Friendship) => (
          <div>
            <div
              key={request.id}
              onClick={() => {}}
              className=" mx-2 mb-2 cursor-pointer rounded-sm bg-gray-600 px-4 py-2 text-white hover:bg-gray-400"
            >
              {request.senderId}
            </div>

            <p className=""></p>
          </div>
        ))
      )}
    </>
  );
}
