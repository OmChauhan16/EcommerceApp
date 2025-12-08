import express from "express";
import cors from 'cors';
import { configDotenv, } from "dotenv";
import { connectDb } from "./config/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { checkoutRoutes } from "./routes/checkoutRoutes.js";

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

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})