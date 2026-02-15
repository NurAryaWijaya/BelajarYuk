import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.replace("/login");
        }
    }, [loading, user]);

    if (loading || !user) {
        return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#5A78EF" />
        </View>
        );
    }

    return <>{children}</>;
}
