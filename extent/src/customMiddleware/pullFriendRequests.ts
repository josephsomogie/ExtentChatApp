export default async function pullRequests(userId:string){
    const response = await fetch(`/api/DBInteractions/pendingFriends?userId=${encodeURIComponent(userId)}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    
    })
    if(response.ok){
        const data = await response.json();
        console.log("data: "+data);
        
        return data;
    }else{console.log("error pulling friend requests")}
}