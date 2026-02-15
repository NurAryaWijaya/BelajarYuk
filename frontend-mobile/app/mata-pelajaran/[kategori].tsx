// app/mataPelajaran/[kategori].tsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import API from "../../src/api/axios";
import { AuthContext } from "../../src/context/AuthContext";

interface Materi {
    _id: string;
    judul: string;
}

export default function MataPelajaran() {
    const { kategori } = useLocalSearchParams<{ kategori: string }>();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [materiList, setMateriList] = useState<Materi[]>([]);
    const [loading, setLoading] = useState(true);

    const screenWidth = Dimensions.get("window").width;
    const cardWidth = screenWidth > 400 ? 350 : screenWidth - 40; // grid responsive

    useEffect(() => {
        if (kategori) {
        setLoading(true);
        API.get(`/Materi/Kategori/${encodeURIComponent(kategori)}`)
            .then((res) => {
            console.log("Data materi:", res.data); // cek apakah data ada
            console.log("Res API:", res.data);  // Cek isi data       
            setMateriList(res.data);
            })
            .catch((err) => console.error("Error fetching materi:", err))
            .finally(() => setLoading(false));
        }
    }, [kategori]);

    const renderMateri = ({ item }: { item: Materi }) => (
    <TouchableOpacity
        style={[styles.materiCard, { width: cardWidth }]}
        onPress={() => router.push(`/materi/${item._id}`)} 
    >
        <Text style={styles.materiText}>{item.judul}</Text>
    </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>

        {/* Judul Kategori */}
        <Text style={styles.title}>{kategori}</Text>

        {/* Materi List */}
        {loading ? (
            <Text>Loading...</Text>
        ) : materiList.length === 0 ? (
            <Text style={{ marginVertical: 20, fontSize: 16 }}>Belum ada materi di kategori ini.</Text>
        ) : (
            <View style={styles.grid}>
            {materiList.map((materi) => (
                <TouchableOpacity
                key={materi._id}
                style={[styles.materiCard, { width: cardWidth }]}
                onPress={() => router.push(`/materi/${materi._id}`)} // <-- ini penting
                >
                <Text style={styles.materiText}>{materi.judul}</Text>
                </TouchableOpacity>
            ))}

            {/* Tombol Tambah Materi - Guru */}
            {user?.role === "teacher" && (
                <TouchableOpacity
                style={[styles.materiCard, styles.addButton, { width: cardWidth }]}
                onPress={() => router.push('/tambahMateri')}
                >
                <Text style={styles.addText}>Tambah Materi</Text>
                </TouchableOpacity>
            )}
            </View>
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
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#5A78EF",
        alignSelf: "flex-start",
        marginBottom: 20,
    },
    grid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    materiCard: {
        height: 80,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginHorizontal: 5,
        paddingHorizontal: 20,
    },
    materiText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000000",
    },
    addButton: {
        backgroundColor: "#D15AEF",
    },
    addText: {
        fontSize: 24,
        fontWeight: "800",
        color: "#FFFFFF",
    },
});
