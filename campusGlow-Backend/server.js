const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { db } =require("./firebase.js")
const { google } = require("googleapis");
const admin =require("firebase-admin") 

const app = express();
app.use(cors());
app.use(express.json());
// ---firebase product route --
app.get("/api/products",async(req, res)=>{
  try{
    const {category, search } = req.query;///read query params
    let query = db.collection("products")

    //filter by category 
    if(category){
      query = query.where("category", "==", category);
    }
    const snapshot = await query.get();
    let products = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    // search by name or tags(basic filter after fetch)

    if(search){
      const searchLower = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchLower) || 
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      )
    }
    res.json({ok: true, products })
  }
  catch(err){
    console.error("Error fetching products:", err)
    res.status(500).json({ok: false, message: "failed to fetch products"})
  }
})

//

// app.post("/api/products", async(req, res)=>{
//   try{
//     const product = req.body
//     const docRef = await db.collection("products").add(product);
//     res.json({ok: true, id : docRef.id, product});
//   }
//   catch(err){
//     console.error("error adding product", err)
//     res.status(500).json({ok: false, message: "failed to add product"})
//   }
// })


//save an order ----- orders api 
app.post("/api/orders", veryfyToken, async(req, res)=>{
  try{
     console.log("Decoded user:", req.user);//check uid
     console.log("Request body:", req.body);//check payload
     const orderNumber = `CG-${Date.now()}`;
    const order ={
      orderNumber,
      userId: req.user?.uid,// attach firbase uid
      customerName: req.body.customerName,
      phone: req.body.phone,
      items: req.body.items,
      subtotal: req.body.subtotal,
      deliveryArea: req.body.deliveryArea,
      pickupPoint: req.body.pickupPoint,
      deliveryCost: req.body.deliveryCost,
      total: req.body.total,
      createdAt: new Date().toISOString()
    };
    const docRef = await db.collection("orders").add(order);
    res.json({ok: true, id: docRef.id, order })

  } catch(err){
    console.error("error saving order:", err);
    res.status(500).json({ok: false, message:"failed to save order"})
  }
});

//get all orders
app.get("/api/orders", veryfyToken, async (req, res)=>{
  try{
    const snapshot = await db.collection("orders")
    .where("userId","==", req.user.uid)
    .get();
    const orders = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    res.json({ok: true, orders})
  }catch(err){
    console.error("Error fetching orders:", err)
    res.status(500).json({ok: false, message: "failed to fetch orders"})
  }
})
// middelware to veryfy firebase id token
async function veryfyToken(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader||!authHeader.startsWith("Bearer ")){
    return res.status(401).json({ok:false, message: "no token provided"})
  }
  const idToken = authHeader.split("Bearer ")[1]
  try{
    console.log(idToken)
    const decoderToken =await admin.auth().verifyIdToken(idToken)
    req.user = decoderToken
    next()
  }catch(error){
    console.log("token veryfication failed", error)
    res.status(403).json({ok:false, message:"Unauthorized"})
  }
}
//only admin can add products

app.post("/api/products", veryfyToken, async(req, res)=>{
  try{ 
    //check if user has admin claim
    if (!req.user.admin){
    return res.status(403).json({ok: false, message: "admin only"})
  }
  const product = req.body;
  const docRef = await db.collection("products").add(product);
  res.json({ok:true, id: docRef.id, product})
  } catch(err){
    console.error("errro adding product", err)
    res.status(500).json({ok:false, message: "failed to add product"})
  }
 
  
})



app.get("/api/orders", )
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

    res.json({
      ok: true,
      message: "Order saved to file and Google Sheets",
      order: orderData,
    });
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
