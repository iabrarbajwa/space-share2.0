'use client'

import React, { useEffect } from "react"
import EmptyState from "./(platform)/_components/EmptyState"

interface ErrorProps {
    error: Error
}

const ErrorState: React.FC<ErrorProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState
            title="An unexpected error occurred."
            subtitle="Something went wrong!"
        />
    )
}

export default ErrorState;