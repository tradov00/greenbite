"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    
    login(name);
    router.push("/"); // redirect to home page
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 font-roboto">
      <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          Join our community!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-brand-orange text-white font-semibold py-3 rounded-md bg-orange-700 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
