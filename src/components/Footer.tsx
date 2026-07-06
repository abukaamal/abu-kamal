import { Github, Linkedin, Instagram, Facebook, Youtube, Twitter, Globe } from "lucide-react";
import { FooterData } from "../types";

interface FooterProps {
  data?: FooterData;
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  const socialLinks = [];

  if (data.github && data.github.trim()) {
    socialLinks.push({ icon: Github, url: data.github, label: "GitHub" });
  }
  if (data.linkedin && data.linkedin.trim()) {
    socialLinks.push({ icon: Linkedin, url: data.linkedin, label: "LinkedIn" });
  }
  if (data.instagram && data.instagram.trim()) {
    socialLinks.push({ icon: Instagram, url: data.instagram, label: "Instagram" });
  }
  if (data.facebook && data.facebook.trim()) {
    socialLinks.push({ icon: Facebook, url: data.facebook, label: "Facebook" });
  }
  if (data.youtube && data.youtube.trim()) {
    socialLinks.push({ icon: Youtube, url: data.youtube, label: "YouTube" });
  }
  if (data.twitter && data.twitter.trim()) {
    socialLinks.push({ icon: Twitter, url: data.twitter, label: "Twitter" });
  }

  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
        <div>
          &copy; {data.copyright || `${new Date().getFullYear()} devfolio. Semua Hak Cipta Dilindungi.`}
        </div>

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/15 transition-all duration-300"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </footer>
  );
}
