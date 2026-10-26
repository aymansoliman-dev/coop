'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/features/auth/hooks/use-me";

export default function Home() {
  const router = useRouter();
  const { data: me, isPending } = useMe();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/dashboard");
    else router.replace("/login");
  }, [router]);

  if (isPending || me) return null; // or a spinner

  return (
      <h1>Supposed to be landing page :)</h1>
  )
}
