
export default async function pullConversations(userId: string){
    const response = await fetch(`/api/DBInteractions/fetchConversations?userId=${encodeURIComponent(userId)}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },

})
if(response.ok){
    const data = await response.json();
    console.log("data: "+data);
    
    return data;
}else{console.log("error pulling conversations")}
}