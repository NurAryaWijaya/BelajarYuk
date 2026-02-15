// app/_layout.tsx
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </AuthProvider>
  );
}
