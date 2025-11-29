import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "public")))
console.log(path.join(__dirname, "public"));

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
    console.log(`Frontend running on ${PORT}`);
})