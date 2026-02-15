// app/tambah-materi.tsx
import React, { useState, useContext } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, Dimensions} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useRouter, useLocalSearchParams } from "expo-router";
import API from "../src/api/axios";
import { AuthContext } from "../src/context/AuthContext";

export default function TambahMateri() {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const { kategori: initialKategori } = useLocalSearchParams<{ kategori: string }>();

    const [kategori, setKategori] = useState(initialKategori || "Matematika");
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");

    const screenWidth = Dimensions.get("window").width;

    const handleSubmit = async () => {
        if (!judul || !isi) {
        Alert.alert("Error", "Judul dan Isi materi harus diisi!");
        return;
        }
        try {
        await API.post("/materi", { kategori, judul, isi });
        Alert.alert("Sukses", "Materi berhasil ditambahkan!");
        router.push('/dashboard');
        } catch (err) {
        console.error(err);
        Alert.alert("Error", "Gagal menambahkan materi");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>

        {/* Form */}
        <View style={[styles.formContainer, { width: screenWidth - 40 }]}>
            {/* Kategori Picker */}
            <View style={styles.pickerContainer}>
                <Picker
                selectedValue={kategori}
                onValueChange={(val: string) => setKategori(val)} // <-- kasih tipe string
                style={styles.picker}
                >
                    <Picker.Item label="Matematika" value="Matematika" />
                    <Picker.Item label="Fisika" value="Fisika" />
                    <Picker.Item label="B. Inggris" value="B. Inggris" />
                    <Picker.Item label="B. Indonesia" value="B. Indonesia" />
                </Picker>
            </View>


            {/* Judul Materi */}
            <TextInput
            placeholder="Judul Materi"
            value={judul}
            onChangeText={setJudul}
            style={styles.judulInput}
            />

            {/* Isi Materi */}
            <TextInput
            placeholder="Isi Materi"
            value={isi}
            onChangeText={setIsi}
            style={styles.isiInput}
            multiline
            />

            {/* Tombol Tambah Materi */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Tambah Materi</Text>
            </TouchableOpacity>
        </View>
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
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
    },
    pickerContainer: {
        width: "100%",
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: "100%",
        color: "#000",
    },
    judulInput: {
        width: "100%",
        minHeight: 50,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        marginBottom: 15,
    },
    isiInput: {
        width: "100%",
        minHeight: 200,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        fontWeight: "400",
        color: "#000",
        textAlignVertical: "top",
        marginBottom: 20,
    },
    submitButton: {
        width: "100%",
        height: 60,
        backgroundColor: "#D15AEF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    submitText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#FFFFFF",
    },
});
