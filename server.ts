import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API proxy route for portfolio data
  app.get("/api/portfolio", async (req, res) => {
    try {
      const apiKey = req.query.key || process.env.API_KEY || "AIzaSyA_4Qa0hUt1CudR7gGwJKjFZDtiKxL7cS4";
      const action = req.query.action || "all";
      const targetUrl = `https://script.google.com/macros/s/AKfycbzyZzYkTMRuvw8F6MtFHqm6dBUeFyOMO7i5GTs6jRrrynm7VszHUcAJcwTYdAV4o6DqVw/exec?action=${action}&key=${apiKey}`;

      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `Gagal mengambil data dari Google Sheets. Status: ${response.status}` });
      }

      const data = await response.json();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || "Internal Server Error" });
    }
  });

  // API proxy route for sending message
  app.post("/api/message", async (req, res) => {
    try {
      const { key, nama, email, telpon, alamat, pesan } = req.body;

      const targetUrl = `https://script.google.com/macros/s/AKfycbzyZzYkTMRuvw8F6MtFHqm6dBUeFyOMO7i5GTs6jRrrynm7VszHUcAJcwTYdAV4o6DqVw/exec`;

      const params = new URLSearchParams();
      params.append("key", key || process.env.API_KEY || "AIzaSyA_4Qa0hUt1CudR7gGwJKjFZDtiKxL7cS4");
      params.append("nama", nama || "");
      params.append("email", email || "");
      params.append("telpon", telpon || "");
      params.append("alamat", alamat || "");
      params.append("pesan", pesan || "");

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `Gagal mengirim data. Status: ${response.status}` });
      }

      const data = await response.json();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || "Internal Server Error" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
