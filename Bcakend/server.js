import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import path from "path"
import authroutes from "./routes/authroutes.js";
import incomeroutes from "./routes/incomeroute.js";
import expenseroute from "./routes/expenssroutes.js";
import dashboardroute from "./routes/dashboardroute.js";
import { fileURLToPath } from "url";
import { connectdb } from "./config/conectdb.js";
dotenv.config();
const app=express()

app.use(
    cors({
        origin:[process.env.CLIENT_URL] ||"http://localhost:5173",
        methods:["GET","PUT","POST","DELETE"],
        allowedHeaders:["content-Type","Authorization"],
    })
)

app.use(express.json())

const PORT=process.env.PORT ||5000
connectdb()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/v1/auth",authroutes)
app.use("/api/v1/income",incomeroutes)
app.use("/api/v1/expense",expenseroute)
app.use("/api/v1/dashboard",dashboardroute)

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.listen(PORT,()=>{
    console.log("server running at port http://localhost:5000");
    
})