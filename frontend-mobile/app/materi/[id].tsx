// app/materi/[id].tsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import API from "../../src/api/axios";
import { AuthContext } from "../../src/context/AuthContext";

interface Materi {
    _id: string;
    judul: string;
    isi: string;
}

export default function MateriDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [materi, setMateri] = useState<Materi | null>(null);
    const [loading, setLoading] = useState(true);

    const screenWidth = Dimensions.get("window").width;

    useEffect(() => {
        if (id) {
        setLoading(true);
        API.get(`/materi/${id}`)
            .then((res) => setMateri(res.data))
            .catch((err) => console.error("Error fetching materi:", err))
            .finally(() => setLoading(false));
        }
    }, [id]);

    const handleDelete = async () => {
        Alert.alert(
        "Konfirmasi",
        "Yakin ingin menghapus materi ini?",
        [
            { text: "Batal", style: "cancel" },
            {
            text: "Hapus",
            style: "destructive",
            onPress: async () => {
                try {
                await API.delete(`/materi/${id}`);
                Alert.alert("Berhasil", "Materi berhasil dihapus");
                router.push('/dashboard');
                } catch (err) {
                console.error(err);
                Alert.alert("Error", "Gagal menghapus materi");
                }
            },
            },
        ]
        );
    };

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (!materi) return <Text style={styles.loadingText}>Materi tidak ditemukan</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>

        {/* Kontainer Materi */}
        <View style={[styles.materiContainer, { width: screenWidth - 40 }]}>
            <Text style={styles.judul}>{materi.judul}</Text>
            <Text style={styles.isi}>{materi.isi}</Text>
        </View>

        {/* Tombol Hapus Materi (Guru) */}
        {user?.role === "teacher" && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteText}>Hapus Materi</Text>
            </TouchableOpacity>
        )}
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: "#f5f6fa",
        alignItems: "center",
        flexGrow: 1,
    },
    loadingText: {
        fontSize: 16,
        marginTop: 20,
        color: "#000",
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
    },
    backText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000000",
    },
    materiContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    judul: {
        fontSize: 32,
        fontWeight: "800",
        color: "#5A78EF",
        marginBottom: 20,
    },
    isi: {
        fontSize: 20,
        fontWeight: "400",
        color: "#000000",
        lineHeight: 28,
    },
    deleteButton: {
        marginTop: 40,
        width: "100%",
        height: 60,
        backgroundColor: "#D15AEF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteText: {
        fontSize: 24,
        fontWeight: "800",
        color: "#FFFFFF",
    },
});
