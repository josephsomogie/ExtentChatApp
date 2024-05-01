export default async function pushFriendship(
  senderId: string,
  friendId: string,
) {
  if (typeof senderId !== "string" || typeof friendId !== "string") {
    console.error("Wrong type of input! @pushFriendship");
    return;
  }
  try {
    const response = await fetch("api/DBInteractions/newFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: senderId,
        friendId: friendId,
      }),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create friendship: ${errorMessage}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
