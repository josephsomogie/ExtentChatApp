export default async function pushConversations(conversationName: string, userID: string[], creator: string) {
   
    if (typeof conversationName !== 'string' /*|| !Array.isArray(userID)*/) {
        console.error('Invalid input for conversationName or userID');
        return; 
    }
try{
    const response = await fetch('/api/DBInteractions/newConversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: conversationName,
            users: userID,
            creator: creator
        })
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create conversation: ${errorMessage}`);
      }

    const data = await response.json();
    return data;
}catch(error){
    console.error('Error creating conversation:', error);
}
}