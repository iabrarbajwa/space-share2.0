import { clerkClient } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

async function AllUsers() {

    const users = await clerkClient.users.getUserList();


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
                        <td><button>Edit</button></td>
                        <td><button>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AllUsers;