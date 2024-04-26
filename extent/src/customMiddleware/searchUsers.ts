//Joseph Somogie 2024 -- searchUsers
//Search thru users and return array of users that contain the search string in username
export default async function searchUsers(username: string) {
    // Append the username query parameter directly in the URL
    const response = await fetch(`/api/DBInteractions/queryUsers?q=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    });
    const data = await response.json();
    return data;
}