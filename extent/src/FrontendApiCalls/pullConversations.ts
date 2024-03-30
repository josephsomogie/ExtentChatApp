
export default async function pullConversations(userID: string){
    const response = await fetch('/api/DBInteractions/fetchConversations')
    const data = await response.json();
    return data;
}