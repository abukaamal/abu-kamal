import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiUrl: string;
  apiKey: string;
}

interface FormState {
  nama: string;
  email: string;
  telpon: string;
  alamat: string;
  pesan: string;
}

interface FormErrors {
  nama?: string;
  email?: string;
  telpon?: string;
  alamat?: string;
  pesan?: string;
}

export default function MessageModal({ isOpen, onClose, apiUrl, apiKey }: MessageModalProps) {
  const [form, setForm] = useState<FormState>({
    nama: "",
    email: "",
    telpon: "",
    alamat: "",
    pesan: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset states on close/open
  useEffect(() => {
    if (isOpen) {
      setForm({ nama: "", email: "", telpon: "", alamat: "", pesan: "" });
      setErrors({});
      setIsSubmitting(false);
      setProgress(0);
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  const validateField = (key: keyof FormState, val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Kolom ini wajib diisi.";
    }

    switch (key) {
      case "nama":
        if (!/^[a-zA-Z\s]{2,50}$/.test(trimmed)) {
          return "Nama hanya boleh berisi huruf dan minimal 2 karakter.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return "Format email tidak valid.";
        }
        break;
      case "telpon": {
        const cleanPhone = trimmed.replace(/[\s\-+]/g, "");
        if (!/^\d+$/.test(cleanPhone)) {
          return "Nomor telepon hanya boleh berisi angka.";
        }
        if (cleanPhone.length < 8) {
          return "Nomor telepon minimal 8 digit.";
        }
        if (!cleanPhone.startsWith("0")) {
          return "Nomor telepon harus diawali dengan angka 0.";
        }
        break;
      }
      case "alamat":
        if (trimmed.length < 3) {
          return "Alamat minimal 3 karakter.";
        }
        break;
      case "pesan":
        if (trimmed.length < 5) {
          return "Pesan minimal 5 karakter.";
        }
        break;
    }
    return "";
  };

  const handleInputChange = (key: keyof FormState, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    const errorMsg = validateField(key, val);
    setErrors((prev) => ({ ...prev, [key]: errorMsg }));
  };

  const handleBlur = (key: keyof FormState) => {
    const errorMsg = validateField(key, form[key]);
    setErrors((prev) => ({ ...prev, [key]: errorMsg }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasError = false;
    (Object.keys(form) as Array<keyof FormState>).forEach((key) => {
      const errMsg = validateField(key, form[key]);
      if (errMsg) {
        newErrors[key] = errMsg;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setProgress(15);
    setSubmitStatus("idle");

    // Progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    try {
      const cleanPhone = form.telpon.replace(/[\s\-+]/g, "");
      const payload = {
        key: apiKey,
        nama: form.nama.trim(),
        email: form.email.trim(),
        telpon: cleanPhone,
        alamat: form.alamat.trim(),
        pesan: form.pesan.trim()
      };

      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      clearInterval(interval);

      if (result && result.success === true) {
        setProgress(100);
        setTimeout(() => {
          setSubmitStatus("success");
          setIsSubmitting(false);
        }, 300);
      } else {
        throw new Error(result?.error || "Gagal menyimpan data ke Google Sheets.");
      }
    } catch (err: any) {
      clearInterval(interval);
      setIsSubmitting(false);
      setProgress(0);
      setSubmitStatus("error");
      setErrorMessage(err?.message || "Koneksi bermasalah. Silakan periksa jaringan Anda.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
          >
            {/* Progress line */}
            {isSubmitting && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <h2 className="font-display text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  ⚡
                </span>
                Kirim Pesan
              </h2>
              {!isSubmitting && (
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-4 flex-1">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Pesan Terkirim!</h3>
                  <p className="text-slate-600 mb-6 max-w-sm">
                    Terima kasih telah menghubungi kami. Pesan Anda telah berhasil disimpan ke database Google Sheets kami.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition shadow-sm"
                  >
                    Tutup
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 text-red-700 rounded-2xl flex items-start gap-3 border border-red-100"
                    >
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Gagal Mengirim</h4>
                        <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Nama */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nama}
                      onChange={(e) => handleInputChange("nama", e.target.value)}
                      onBlur={() => handleBlur("nama")}
                      disabled={isSubmitting}
                      placeholder="Masukkan nama lengkap"
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 transition outline-none ${
                        errors.nama ? "border-red-300 focus:border-red-500 bg-red-50/10" : "border-slate-200 focus:border-blue-500 bg-slate-50/50"
                      }`}
                    />
                    {errors.nama && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.nama}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      disabled={isSubmitting}
                      placeholder="email@contoh.com"
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 transition outline-none ${
                        errors.email ? "border-red-300 focus:border-red-500 bg-red-50/10" : "border-slate-200 focus:border-blue-500 bg-slate-50/50"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Telepon */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      No. Telepon / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.telpon}
                      onChange={(e) => handleInputChange("telpon", e.target.value)}
                      onBlur={() => handleBlur("telpon")}
                      disabled={isSubmitting}
                      placeholder="0821xxxxxxxx"
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 transition outline-none ${
                        errors.telpon ? "border-red-300 focus:border-red-500 bg-red-50/10" : "border-slate-200 focus:border-blue-500 bg-slate-50/50"
                      }`}
                    />
                    {errors.telpon && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.telpon}
                      </p>
                    )}
                  </div>

                  {/* Alamat */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.alamat}
                      onChange={(e) => handleInputChange("alamat", e.target.value)}
                      onBlur={() => handleBlur("alamat")}
                      disabled={isSubmitting}
                      placeholder="Masukkan alamat tempat tinggal"
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 transition outline-none ${
                        errors.alamat ? "border-red-300 focus:border-red-500 bg-red-50/10" : "border-slate-200 focus:border-blue-500 bg-slate-50/50"
                      }`}
                    />
                    {errors.alamat && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.alamat}
                      </p>
                    )}
                  </div>

                  {/* Pesan */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.pesan}
                      onChange={(e) => handleInputChange("pesan", e.target.value)}
                      onBlur={() => handleBlur("pesan")}
                      disabled={isSubmitting}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={3}
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 transition outline-none resize-none ${
                        errors.pesan ? "border-red-300 focus:border-red-500 bg-red-50/10" : "border-slate-200 focus:border-blue-500 bg-slate-50/50"
                      }`}
                    />
                    {errors.pesan && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.pesan}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            {submitStatus !== "success" && (
              <div className="border-t border-slate-100 px-6 py-4 flex-shrink-0 bg-slate-50/50">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-blue-500/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sedang Mengirim...
                    </>
                  ) : (
                    <>Kirim Pesan</>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
