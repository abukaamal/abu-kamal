import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(req: any, res: any) {
  // Add CORS headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const apiKey = req.query.key || process.env.API_KEY || "AIzaSyA_4Qa0hUt1CudR7gGwJKjFZDtiKxL7cS4";
    const action = req.query.action || "all";
    const targetUrl = `https://script.google.com/macros/s/AKfycbzyZzYkTMRuvw8F6MtFHqm6dBUeFyOMO7i5GTs6jRrrynm7VszHUcAJcwTYdAV4o6DqVw/exec?action=${action}&key=${apiKey}`;

    const response = await fetch(targetUrl, {
      method: "GET",
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Gagal mengambil data dari Google Sheets. Status: ${response.status}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Internal Server Error" });
  }
}
