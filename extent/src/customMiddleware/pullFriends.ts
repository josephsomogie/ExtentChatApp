export default async function pullFriends(userId: string) {
  if (typeof userId !== "string") {throw new Error("User ID must be a string");}
  const response = await fetch(
    `/api/DBInteractions/fetchFriends?userId=${encodeURIComponent(userId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (response.ok) {
    const data = await response.json();
    console.log("data: " + data);

    return data;
  } else {
    console.log("error pulling friends");
  }
}
