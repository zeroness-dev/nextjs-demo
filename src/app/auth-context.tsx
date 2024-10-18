import React, { createContext, useState, useCallback } from 'react';
import { createChallenge, trustBrowser, logout as zLogout } from "@zeroness/web";

// Define the shape of your authentication context
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => void;
    registerDevice: () => Promise<void>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// Create the provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback(async () => {
        try {
            const { challenge, signature, guid } = await createChallenge();
            const response = await fetch("/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    challenge,
                    signature,
                    guid,
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Verification successful:", data);
                setIsAuthenticated(true);
            } else {
                console.log("Verification failed");
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            setIsAuthenticated(false);
        }
    }, []);

    const logout = useCallback(async () => {
        await zLogout();
        setIsAuthenticated(false);
    }, []);

    const registerDevice = useCallback(async () => {
        try {
            const { publicKey, guid } = await trustBrowser();
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    publicKey,
                    guid,
                })
            });
            const data = await response.json();
            console.log("Device registered:", data);
            // After registration, attempt to login
            await login();
        } catch (error) {
            console.error("Error during device registration:", error);
        }
    }, [login]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, registerDevice }}>
            {children}
        </AuthContext.Provider>
    );
};
