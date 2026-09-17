import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { GlobalProvider } from "@/context/GlobalContext"
import "photoswipe/dist/photoswipe.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GatherGrid",
  description: "A community directory for discovering local workshops and hobby activities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
              {children}
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
