'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) router.push("/dashboard");
    else router.push("/login");
  }, [router]);

  return (
      <h1>Supposed to be landing page :)</h1>
  )
}
