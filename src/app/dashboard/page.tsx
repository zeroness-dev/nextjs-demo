'use client';

import { useContext } from 'react';
import { AuthContext } from '../auth-context';
import Link from 'next/link';

export default function Dashboard() {
    const authContext = useContext(AuthContext);

    if (!authContext?.isAuthenticated) {
        return <Link href="/login" />;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <button onClick={authContext.logout}>Logout</button>
        </div>
    );
}