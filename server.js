import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';

dotenv.config(); // ✅ Load env variables first

const app = express(); // ✅ Declare app before using it

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
