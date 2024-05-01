export default async function pullMessages(convoId: string) {
  if (typeof convoId !== "string")
    throw new Error("conversation ID must be a string");
  const response = await fetch(
    `/api/DBInteractions/fetchMessages?convoId=${encodeURIComponent(convoId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  try {
    const data = await response.json();
    console.log("data: " + data);

    return data;
  } catch (e) {
    console.log("Error with pulling messages from the server");
  }
}
