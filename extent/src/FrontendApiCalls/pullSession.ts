export default async function getSession() {
    const response = await fetch('/api/auth/GetSession');
        const data = await response.json();
        return data;
}