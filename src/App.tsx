import { useState, useEffect } from "react";
import { ArrowUp, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Beranda from "./components/Beranda";
import Tentang from "./components/Tentang";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MessageModal from "./components/MessageModal";
import { PortfolioData } from "./types";

const API_URL = "https://script.google.com/macros/s/AKfycbzyZzYkTMRuvw8F6MtFHqm6dBUeFyOMO7i5GTs6jRrrynm7VszHUcAJcwTYdAV4o6DqVw/exec";
const API_KEY = "AIzaSyA_4Qa0hUt1CudR7gGwJKjFZDtiKxL7cS4";

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let response: Response | null = null;
      let isFallback = false;

      try {
        response = await fetch(`/api/portfolio?action=all&key=${API_KEY}`);
        if (!response.ok) {
          if (response.status === 404) {
            isFallback = true;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
      } catch (proxyErr) {
        isFallback = true;
      }

      let result: any;
      if (isFallback) {
        // Fallback: Fetch directly from Google Apps Script URL (client-side)
        const directResponse = await fetch(`${API_URL}?action=all&key=${API_KEY}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          }
        });
        if (!directResponse.ok) {
          throw new Error(`Direct connection error! status: ${directResponse.status}`);
        }
        result = await directResponse.json();
      } else {
        result = await response!.json();
      }

      if (result && !result.error) {
        setData(result);
      } else {
        throw new Error(result?.error || "Gagal memuat data portofolio.");
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center max-w-sm text-center"
        >
          <div className="relative mb-6">
            <div className="h-16 w-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-md shadow-blue-500/10">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
            <div className="absolute -top-1 -right-1 h-4.5 w-4.5 rounded-full bg-blue-600 animate-ping opacity-75" />
          </div>
          <h3 className="font-display text-xl font-bold text-slate-800 mb-1">Memuat Portofolio</h3>
          <p className="text-slate-500 text-sm">Menghubungkan ke database Google Sheets Anda...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-[32px] p-8 max-w-md w-full shadow-xl shadow-slate-200/50 flex flex-col items-center text-center"
        >
          <div className="h-14 w-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-5 border border-red-100/50">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-800 mb-2">Koneksi Gagal</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            {error}. Mohon pastikan deployment Google Apps Script Anda aktif dan API Key sudah benar.
          </p>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-500/10"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <Navbar
        logoName={data?.beranda?.logo_name}
        imageUrl={data?.beranda?.image_url}
        onOpenMessageModal={() => setIsModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Beranda data={data?.beranda} />
        <Tentang data={data?.tentang} />
        <Gallery data={data?.gallery} />
        <Contact data={data?.contact} />
      </main>

      {/* Footer */}
      <Footer data={data?.footer} />

      {/* Messaging modal overlay */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apiUrl={API_URL}
        apiKey={API_KEY}
      />

      {/* Floating Back-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition duration-300"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
