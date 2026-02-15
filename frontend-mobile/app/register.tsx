// app/register.tsx
import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import API from "../src/api/axios";
import { AuthContext } from "../src/context/AuthContext";

export default function Register() {
    const router = useRouter();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async (roleType: string) => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
        Alert.alert("Error", "Semua field harus diisi!");
        return;
    }

    try {
        const res = await API.post("/auth/register", { ...formData, role: roleType });
        login(res.data);
        router.replace("/login");
    } catch (err) {
        Alert.alert("Register gagal");
        console.log(err);
    }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
            placeholder="Nama"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            style={styles.input}
            />

            <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            style={styles.input}
            keyboardType="email-address"
            />

            <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            style={styles.input}
            secureTextEntry
            />

            <TouchableOpacity
            style={[styles.button, { backgroundColor: "#D15AEF" }]}
            onPress={() => handleSubmit("teacher")}
            >
            <Text style={styles.buttonText}>Daftar sebagai Guru</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5A78EF" }]}
            onPress={() => handleSubmit("student")}
            >
            <Text style={styles.buttonText}>Daftar sebagai Murid</Text>
            </TouchableOpacity>

            <Text style={styles.loginText}>
            Sudah punya akun?{" "}
            <Text style={styles.loginLink} onPress={() => router.push("/login")}>
                Login
            </Text>
            </Text>
        </View>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa",
        paddingVertical: 50,
    },
    wrapper: {
        alignItems: "center",
        gap: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#5A78EF",
        marginBottom: 10,
    },
    input: {
        width: 300,
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "white",
        color: "#7A7A7A",
        marginBottom: 10,
    },
    button: {
        width: 300,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginText: {
        marginTop: 10,
        color: "black",
        fontSize: 14,
    },
    loginLink: {
        color: "#5A78EF",
        fontWeight: "bold",
    },
});
