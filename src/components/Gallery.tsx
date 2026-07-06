import { ComponentType } from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { GalleryItem } from "../types";

interface GalleryProps {
  data?: GalleryItem[];
}

// Map FontAwesome classes or icon keywords to crisp Lucide React components
const getLucideIcon = (iconName?: string): ComponentType<any> => {
  if (!iconName) return Icons.Sparkles;

  const lowerName = iconName.toLowerCase();

  if (lowerName.includes("code") || lowerName.includes("terminal")) {
    return Icons.Code2;
  }
  if (lowerName.includes("laptop") || lowerName.includes("desktop") || lowerName.includes("monitor")) {
    return Icons.Monitor;
  }
  if (lowerName.includes("mobile") || lowerName.includes("phone") || lowerName.includes("smartphone")) {
    return Icons.Smartphone;
  }
  if (lowerName.includes("paint") || lowerName.includes("brush") || lowerName.includes("palette") || lowerName.includes("design")) {
    return Icons.Palette;
  }
  if (lowerName.includes("database") || lowerName.includes("server") || lowerName.includes("cloud")) {
    return Icons.Database;
  }
  if (lowerName.includes("search") || lowerName.includes("seo") || lowerName.includes("analytics")) {
    return Icons.Search;
  }
  if (lowerName.includes("globe") || lowerName.includes("web") || lowerName.includes("internet")) {
    return Icons.Globe;
  }
  if (lowerName.includes("shield") || lowerName.includes("secure") || lowerName.includes("lock")) {
    return Icons.ShieldCheck;
  }
  if (lowerName.includes("award") || lowerName.includes("trophy") || lowerName.includes("star")) {
    return Icons.Award;
  }
  if (lowerName.includes("share") || lowerName.includes("network") || lowerName.includes("social")) {
    return Icons.Share2;
  }
  if (lowerName.includes("clock") || lowerName.includes("time")) {
    return Icons.Clock;
  }
  if (lowerName.includes("cog") || lowerName.includes("gear") || lowerName.includes("setting")) {
    return Icons.Settings;
  }
  if (lowerName.includes("envelope") || lowerName.includes("mail")) {
    return Icons.Mail;
  }

  // Fallback: If it starts with 'fa-', look for any matching keywords, otherwise generic Sparkles
  return Icons.Sparkles;
};

export default function Gallery({ data }: GalleryProps) {
  if (!data || data.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3"
          >
            Layanan & Keahlian
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            Gallery <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Karya & Skill</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((item, index) => {
            const IconComponent = getLucideIcon(item.icon);
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-3xl border border-slate-100 bg-white p-8 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                {/* Background ambient light */}
                <div className="absolute inset-0 rounded-3xl bg-radial from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon frame */}
                <div className="relative z-10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-display text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
