"use client";
import MainPage from "@/app/main/mainpage";
import ProtectedRoute from "@/redux/axiosAuth/RequireAuth";

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    </>
  );
}
