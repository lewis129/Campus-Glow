const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const app = express();
app.use(cors());
app.use(express.json());

// --- Google Sheets Setup ---
const credentials = require("./campusglow-backend-a3616ffd5b46.json"); // your downloaded service account key
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

// Replace with your Google Sheet ID (from the sheet URL)
const SPREADSHEET_ID = "1fdci0ssmINdUuTHHn12g_oHeCAYFzow8zW18bu9YwUc";

// --- Health Check Route ---
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

// --- Save Order Route ---
app.post("/order", async (req, res) => {
  const orderData = req.body;
  console.log("Received order:", orderData);

  // Save to orders.json
  const filePath = path.join(__dirname, "orders.json");
  let orders = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    orders = JSON.parse(fileData);
  }
  orders.push({ ...orderData, timestamp: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

  // Save to Google Sheets
  try {
    const values = [
      [
        new Date().toISOString(),
        orderData.customerName,
        orderData.phone,
        JSON.stringify(orderData.items),
        orderData.subtotal,
        orderData.deliveryArea,
        orderData.pickupPoint,
        orderData.deliveryCost,
        orderData.total,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:I",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    res.json({ ok: true, message: "Order saved to file and Google Sheets", order: orderData });
  } catch (err) {
    console.error("Error saving to Google Sheets:", err);
    res.status(500).json({ ok: false, message: "Failed to save order" });
  }
});

// --- Get All Orders Route ---
app.get("/orders", (req, res) => {
  const filePath = path.join(__dirname, "orders.json");

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    const orders = JSON.parse(fileData);
    res.json({ ok: true, orders });
  } else {
    res.json({ ok: true, orders: [] });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});