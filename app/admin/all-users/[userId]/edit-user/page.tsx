'use client'
import { clerkClient } from '@clerk/nextjs';
import { useState } from 'react';

interface EditUserHelperProps {
    userId: string;
    params: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
}

export default function EditUserPage({ userId, params }: EditUserHelperProps) {
    const [firstName, setFirstName] = useState(params.firstName);
    const [lastName, setLastName] = useState(params.lastName);
    const [email, setEmail] = useState(params.email);
    const [password, setPassword] = useState('');

    async function handleSubmit(event: any) {
        event.preventDefault();
        const params = { firstName, lastName, email, password };
        await clerkClient.users.updateUser(userId, params);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Update User</button>
        </form>
    );
}
