import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/contexts/UserContext";
import type { ReactNode } from "react";

export const metadata = {
  title: "GreenBite",
  description: "Eco-friendly recipes for a better world",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <UserProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
