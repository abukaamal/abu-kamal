import { motion } from "motion/react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { ContactData } from "../types";

interface ContactProps {
  data?: ContactData;
}

export default function Contact({ data }: ContactProps) {
  if (!data) return null;

  return (
    <section id="contact" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3"
          >
            Hubungi Kami
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            Mari Mulai <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Kolaborasi</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Info cards side */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {data.email && (
                <motion.a
                  href={`mailto:${data.email}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Kirim Email</p>
                    <p className="font-semibold text-slate-800 break-all">{data.email}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition" />
                </motion.a>
              )}

              {data.phone && (
                <motion.a
                  href={`tel:${data.phone}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Telepon / WhatsApp</p>
                    <p className="font-semibold text-slate-800">{data.phone}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition" />
                </motion.a>
              )}

              {data.address && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Alamat Kantor</p>
                    <p className="font-semibold text-slate-800">{data.address}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Map Side */}
          {data.map_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 rounded-[32px] overflow-hidden border border-slate-150 shadow-lg bg-slate-100 min-h-[300px] flex items-stretch map-container"
            >
              <iframe
                src={data.map_url}
                title="Google Map Location"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px] rounded-[32px]"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
