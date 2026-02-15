import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { AuthContext } from "../src/context/AuthContext";
import { useRouter } from "expo-router";

export default function Dashboard() {    
    const { user, logout, loading } = useContext(AuthContext);
    const router = useRouter();

    // Redirect ke login kalau user belum login
    useEffect(() => {
        if (!loading && !user) {
        router.replace("/login"); // replace supaya user nggak bisa back ke dashboard
        }
    }, [user, loading]);

    if (loading || !user) {
        // tampil loading sementara cek token
        return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#5A78EF" />
        </View>
        );
    }

    const mapelList = ["Matematika", "Fisika", "B. Inggris", "B. Indonesia"];
    const screenWidth = Dimensions.get("window").width;

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Wrapper responsive */}
        <View style={[styles.wrapper, { width: screenWidth - 20 }]}>
            {/* Judul Welcome */}
            <Text style={styles.welcomeTitle}>Selamat datang di BelajarYuk</Text>

            {/* Card Biru */}
            <View
            style={[
                styles.card,
                { backgroundColor: user?.role === "teacher" ? "#D15AEF" : "#5A78EF" },
            ]}
            >
            <Text style={styles.cardTitle}>
                Hai, <Text style={{ fontStyle: "italic" }}>{user?.name}</Text>
            </Text>
            <Text style={styles.cardSubtitle}>
                Setiap halaman yang kamu pelajari hari ini adalah satu langkah lebih dekat menuju masa depan yang kamu cita-citakan.
            </Text>

            {/* Logout */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={async () => {
                    await logout(); 
                    router.replace("/login");
                }}
            >
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
            </View>

            {/* Judul Mata Pelajaran */}
            <Text style={styles.mapelTitle}>Mata Pelajaran</Text>

            {/* Grid Mata Pelajaran */}
            <View style={styles.mapelGrid}>
            {mapelList.map((mapel, index) => (
                <TouchableOpacity
                key={index}
                style={styles.mapelCard}
                onPress={() => router.push(`/mata-pelajaran/${encodeURIComponent(mapel)}`)}
                >
                <Text style={styles.mapelText}>{mapel}</Text>
                </TouchableOpacity>
            ))}
</View>

        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#f5f6fa",
    },
    contentContainer: {
        paddingVertical: 50,
        alignItems: "center",
    },
    wrapper: {
        alignItems: "center",
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#5A78EF",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start"
    },
    card: {
        width: "100%",
        height: 180,
        borderRadius: 15,
        padding: 25,
        marginBottom: 20,
        position: "relative",
        justifyContent: "flex-start",
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 12,
        fontWeight: "800",
        color: "#FFFFFF",
        maxWidth: 700,
    },
    logoutButton: {
        position: "absolute",
        bottom: 15,
        right: 20,
        width: 75,
        height: 20,
        borderRadius: 5,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
    },
    logoutText: {
        color: "#FF0000",
        fontSize: 12,
        fontWeight: "600",
    },
    mapelTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#000000",
        marginTop: 10,
        marginBottom: 25,
        textAlign: "center",
    },
    mapelGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
    },
    mapelCard: {
        width: "48%", // dua kolom, responsif
        height: 200,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 15,
    },
    mapelText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#5A78EF",
        textAlign: "center",
    },
});
