"use client"

import { AuthProvider } from "./auth-context";
import Login from "./login/page";

export default function Home() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
