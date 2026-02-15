import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import API from "../src/api/axios";
import { AuthContext } from "../src/context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
    if (!email || !password) {
        Alert.alert("Error", "Email dan password harus diisi!");
        return;
    }

    try {
        const res = await API.post("/auth/login", { email, password });
        await login(res.data);
        router.replace("/dashboard");
    } catch (err) {
        Alert.alert("Login gagal");
    }
    };


    return (
        <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            />

            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
            Belum punya akun?{" "}
            <Text
                style={styles.registerLink}
                onPress={() => router.push("/register")}
            >
                Daftar
            </Text>
            </Text>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6fa",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        alignItems: "center",
        gap: 15,
    },
    title: {
        marginBottom: 10,
        color: "#5A78EF",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
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
    },
    button: {
        width: 300,
        height: 50,
        borderRadius: 15,
        backgroundColor: "#5A78EF",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    registerText: {
        marginTop: 10,
        color: "black",
        fontSize: 14,
    },
    registerLink: {
        color: "#5A78EF",
        fontWeight: "bold",
    },
});
