export default async function pushChat(
  convoId: string,
  userId: string,
  content: string,
  username: string,
): Promise<void> {
  if (
    typeof convoId !== "string" ||
    typeof userId !== "string" ||
    typeof content !== "string" ||
    typeof username !== "string"
  ) {
    throw new Error("Invalid arguments provided to push chat method");
  }

  try {
    const response = await fetch("/api/DBInteractions/newChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        convoId: convoId,
        userId: userId,
        content: content,
        username: username,
      }),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create chat: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating chat:", error);
  }
}
