'use client';

import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../auth-context';
import './Login.css'; // We'll create this file for the spinner styles
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (authContext) {
                await authContext.login();
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [authContext]);

    useEffect(() => {
        if (authContext?.isAuthenticated) {
            router.push('/dashboard');
        }
    }, [authContext?.isAuthenticated, router]);

    const handleRegisterDevice = async () => {
        if (authContext) {
            await authContext.registerDevice();
        }
    };

    if (isLoading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
                <p>Verifying authentication...</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleRegisterDevice}>Register Device</button>
        </div>
    );
}