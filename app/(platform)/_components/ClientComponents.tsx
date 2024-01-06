'use client';

import React, { useState, useEffect } from 'react';

interface ClientComponentsProps {
    children: React.ReactNode;
}

const ClientComponents: React.FC<ClientComponentsProps> = ({
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) return null;

    return (
        <>
            {children}
        </>
    );
};

export default ClientComponents;