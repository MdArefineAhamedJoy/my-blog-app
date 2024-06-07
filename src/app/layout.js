
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from '../ReactQueryProvider';
import { AuthProvider } from "@/hooks/AuthContext";
import HomePage from "./client/pages";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomePage></HomePage>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>

      </body>
    </html>
  );
}
