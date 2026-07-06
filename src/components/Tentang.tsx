import { motion } from "motion/react";
import { MapPin, Award, BookOpen, Layers } from "lucide-react";
import { TentangData } from "../types";

interface TentangProps {
  data?: TentangData;
}

export default function Tentang({ data }: TentangProps) {
  if (!data) return null;

  // Split skills if provided as a comma-separated string
  const skillTags = data.skills
    ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <section id="tentang" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3"
          >
            Mengenal Lebih Dekat
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            Tentang <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Saya</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Avatar side */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[320px] aspect-square rounded-[32px] overflow-hidden shadow-xl shadow-slate-200 border border-slate-100 bg-white p-2"
            >
              {data.image_url ? (
                <img
                  src={data.image_url}
                  alt={data.name || "Tentang Saya"}
                  className="h-full w-full object-cover rounded-[24px]"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-50 text-slate-300">
                  <span className="font-bold text-lg">No Image</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Description side */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                {data.name || "Imat Abu Kamal"}
              </h3>
              {data.location && (
                <p className="flex items-center gap-1.5 text-slate-500 font-medium mb-4">
                  <MapPin className="h-4.5 w-4.5 text-blue-600" />
                  {data.location}
                </p>
              )}
              <p className="text-slate-600 leading-relaxed text-base">
                {data.description || "Halo! Saya adalah seorang pengembang berdedikasi tinggi yang berkomitmen pada standar kualitas pengembangan web, mengutamakan estetika visual yang bersih serta pengalaman interaksi yang lancar."}
              </p>
            </motion.div>

            {/* Dynamic Skill tags */}
            {skillTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-3"
              >
                <h4 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-blue-600" /> Keahlian Utama
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 text-blue-700 border border-blue-100/50 hover:bg-blue-100 hover:text-blue-800 transition duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievement banner */}
            {data.achievement && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    Pencapaian Terbaik
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{data.achievement}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
