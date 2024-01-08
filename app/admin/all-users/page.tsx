'use client'

import { clerkClient } from '@clerk/nextjs';

async function AllUsers() {

    let users = await clerkClient.users.getUserList();

    const handleEdit = async (userId: any) => {
        window.location.href = `/admin/all-users/${userId}/edit-user`;
    };

    const handleDelete = async (userId: string) => {
        await clerkClient.users.deleteUser(userId);
        users = await clerkClient.users.getUserList();
    };


    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.emailAddresses[0].emailAddress}</td>
                        <td><button onClick={() => handleEdit(user.id)}>Edit</button></td>
                        <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AllUsers;




