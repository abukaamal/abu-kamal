import { useState, useEffect } from "react";
import { Menu, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  logoName?: string;
  imageUrl?: string;
  onOpenMessageModal: () => void;
}

export default function Navbar({ logoName, imageUrl, onOpenMessageModal }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#beranda" },
    { name: "Tentang", href: "#tentang" },
    { name: "Gallery", href: "#gallery" },
    { name: "Kontak", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg shadow-slate-100/50 py-3 border-b border-slate-100/80"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Logo"
                className="h-9 w-9 rounded-xl object-cover border border-slate-100 bg-slate-50 shadow-sm"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20">
                ⚡
              </span>
            )}
            <span className="font-display text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {logoName || "devfolio"}
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-slate-600 hover:text-blue-600 transition duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenMessageModal}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-500/10"
            >
              <Send className="h-4 w-4" />
              Pesan
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-full p-2 hover:bg-slate-50 transition text-slate-700"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm md:hidden"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-30 w-[280px] bg-white shadow-2xl border-l border-slate-100 px-6 py-24 flex flex-col md:hidden"
            >
              <div className="flex flex-col gap-5 font-semibold text-lg text-slate-700">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="py-2.5 border-b border-slate-50 hover:text-blue-600 transition"
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenMessageModal();
                  }}
                  className="flex items-center justify-center gap-2 mt-4 px-6 py-3.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-500/15"
                >
                  <Send className="h-5 w-5" />
                  Kirim Pesan
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
