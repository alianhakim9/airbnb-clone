import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/NavbarComponent";
import ClientWrapperComponent from "@/app/components/ClientWrapperComponent";
import RegisterModalComponent from "@/app/components/modals/RegisterModalComponent";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone app build by next app",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapperComponent>
          <Toaster />
          <RegisterModalComponent />
          <Navbar />
        </ClientWrapperComponent>
        {children}
      </body>
    </html>
  );
}
