

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