"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen text-xl">
      Checking authentication...
    </div>
  );
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("You must be logged in to access this page");
      router.replace("/auth");
      return;
    }

    setIsVerified(true);
  }, []);

  // still checking token
  if (isVerified === null) {
    return <Loader />;
  }

  return <>{children}</>;
}
