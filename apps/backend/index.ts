import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routers/userRoutes";
import adminRoutes from "./Routers/adminRoutes";
import contestRoutes from "./Routers/contestRoutes";
import authRoutes from "./Routers/authRoutes"
dotenv.config();

const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/auth",authRoutes)


app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
