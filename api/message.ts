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
    const { key, nama, email, telpon, alamat, pesan } = req.body || req.query || {};

    const apiKey = key || process.env.API_KEY || "AIzaSyA_4Qa0hUt1CudR7gGwJKjFZDtiKxL7cS4";
    const targetUrl = `https://script.google.com/macros/s/AKfycbzyZzYkTMRuvw8F6MtFHqm6dBUeFyOMO7i5GTs6jRrrynm7VszHUcAJcwTYdAV4o6DqVw/exec`;

    const params = new URLSearchParams();
    params.append("key", apiKey);
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
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Internal Server Error" });
  }
}
