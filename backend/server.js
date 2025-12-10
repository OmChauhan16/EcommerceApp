import express from "express";
import cors from 'cors';
import { configDotenv, } from "dotenv";
import { connectDb } from "./config/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { checkoutRoutes } from "./routes/checkoutRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";
import { uploadRoutes } from "./routes/uploadRoutes.js";
import { subscribeRoutes } from "./routes/subscribeRoute.js";
const app = express();
app.use(express.json());
app.use(cors());

configDotenv();


const PORT = process.env.PORT || 3000;

//Connect to DB
connectDb();

app.get("/", (req, res) => {
    res.send('WELCOME TO API')
})


//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
