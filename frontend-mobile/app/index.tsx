// app/index.tsx
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const redirect = async () => {
        router.replace("/login"); // safe navigation
        };

        // Jalankan di next tick supaya RootLayout sudah mount
        const timeout = setTimeout(redirect, 0);

        return () => clearTimeout(timeout);
    }, []);

  return null; // halaman kosong
}
