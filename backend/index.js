import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const port = process.env.port || 5000;
connectDB();
const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("API is running...");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes)

app.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}))

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
