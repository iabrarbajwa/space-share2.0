'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { clerkClient } from '@clerk/nextjs';


export default function AddUserPage() {
    const router = useRouter();

    const emailAddresses: string[] = [];

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const { firstName, lastName, emails: newEmailAddresses, password } = event.target.elements;

        // Add the new email addresses to the array
        newEmailAddresses.forEach((email: any) => {
            emailAddresses.push(email.value);
        });

        // Convert the array of emails to a string array
        const emailAddress = emailAddresses.map((email) => email);

        try {
            const createdUser = await clerkClient.users.createUser({
                firstName,
                lastName,
                emailAddress,
                password,
            });
            alert('User created successfully!');
        } catch (error) {
            alert('Error creating user:' + error);
        }
    };

    return (
        <div>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <label>First name:</label>
                <input type="text" name="firstName" required />

                <label>Last name:</label>
                <input type="text" name="lastName" required />

                <label>Email:</label>
                <ul>
                    {emailAddresses.map((email) => (
                        <li key={email}>
                            <input type="email" name="email[]" value={email} required />
                            <button type="button" onClick={() => emailAddresses.splice(emailAddresses.indexOf(email), 1)}>Remove</button>
                        </li>
                    ))}

                    <li>
                        <input type="email" name="email[]" required />
                        <button type="button" onClick={() => emailAddresses.push('')}>Add Email</button>
                    </li>
                </ul>

                <label>Password:</label>
                <input type="password" name="password" required />

                <button type="submit">Add User</button>
            </form>
        </div>
    );
}