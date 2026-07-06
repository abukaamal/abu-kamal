import { motion } from "motion/react";
import { Sparkles, Calendar } from "lucide-react";
import { BerandaData } from "../types";

interface BerandaProps {
  data?: BerandaData;
}

export default function Beranda({ data }: BerandaProps) {
  if (!data) return null;

  return (
    <section id="beranda" className="relative pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial from-blue-50/20 via-transparent to-transparent">
      <div className="mx-auto max-w-7xl px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Selamat Datang di Portofolio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight mb-6"
            >
              {data.title || "Imat Abu Kamal"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mb-8"
            >
              {data.subtitle || "Seorang pengembang web yang berfokus menciptakan pengalaman digital yang interaktif dan berkinerja tinggi."}
            </motion.p>

            {data.experience && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-700"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Pengalaman Industri</p>
                  <p className="font-semibold text-sm text-slate-800">{data.experience}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Portrait Container */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="relative w-full max-w-[360px] aspect-square rounded-[40px] overflow-hidden group shadow-2xl shadow-slate-200/80 border-4 border-white bg-slate-50"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-indigo-600/10 z-10 pointer-events-none" />
              {data.image_url ? (
                <img
                  src={data.image_url}
                  alt={data.title || "Avatar"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-50 text-slate-300">
                  <span className="font-bold text-lg">No Image</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
