export async function fetchAllUsers() {
    const response = await fetch('https://api.clerk.dev/v1/users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`
        }
    });
    const data = await response.json();
    return data;
}
