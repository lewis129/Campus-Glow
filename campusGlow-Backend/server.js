const express = require ("express");
const cors  = require("cors");

const fs = require("fs")
const path = require("path");
const { timeStamp } = require("console");


const app = express();
app.use(cors()); // allow rquest from your react app
app.use(express.json()); //parse JSON body

// health check route(get)
app.get("/", (req, res)=>{
    res.json({ok :true, message: "backend is running"})
})
//example route
app.post("/order", (req, res)=>{
    const orderData = req.body;
    console.log("Recived order:", orderData)
    
    //path to orders.json file
    const filePath = path.join(__dirname, "order.json")
    //read existing orders(if file exist)
    let orders = [];
    if (fs.existsSync(filePath)){
        const fileData = fs.readFileSync(filePath);
        orders = JSON.parse(fileData);
    }
    //add new order
    orders.push({
        ...orderData,
        timeStamp: new Date().toISOString
    })
    //save back to file
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2))

    res.json({ ok:true, message: "Order recieved", echo:orderData })
});
const PORT = 5000
app.listen(PORT, ()=> console.log(`backend running on http://localhost:${PORT}`));