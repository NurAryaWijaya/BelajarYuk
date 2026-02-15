// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    name: string;
    role: string;
    }

interface AuthContextProps {
    user: User | null;
    login: (data: { token: string; user: User }) => void;
    logout: () => void;
    loading: boolean;
    }

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    logout: () => {},
    loading: true,
    });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // baru

    useEffect(() => {
        const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
            setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.log("Error loading user:", error);
        } finally {
            setLoading(false); 
        }
        };
        loadUser();
    }, []);

    // login & logout sama seperti sebelumnya
    const login = async (data: { token: string; user: User }) => {
        try {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        } catch (error) {
        console.log("Error storing user:", error);
        }
    };

    const logout = async () => {
        try {
        await AsyncStorage.clear();
        setUser(null);
        } catch (error) {
        console.log("Error clearing storage:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
        </AuthContext.Provider>
    );
};
