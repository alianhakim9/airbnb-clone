import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/NavbarComponent";
// import ClientWrapperComponent from "@/app/components/ClientWrapperComponent";
import RegisterModalComponent from "@/app/components/modals/RegisterModalComponent";
import { Toaster } from "react-hot-toast";
import LoginModalComponent from "./components/modals/LoginModalComponent";
import getCurrentUser from "./actions/getCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone app build by next app",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <RegisterModalComponent />
        <LoginModalComponent />
        <Navbar currentUser={currentUser} />
        {/* <ClientWrapperComponent></ClientWrapperComponent> */}
        {children}
      </body>
    </html>
  );
}
