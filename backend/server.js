import express from "express";
import cors from 'cors';
import { configDotenv, } from "dotenv";
import { connectDb } from "./config/db.js";
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

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);

})