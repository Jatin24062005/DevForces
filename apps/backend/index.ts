import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routers/userRoutes";
import adminRoutes from "./Routers/adminRoutes";
import contestRoutes from "./Routers/contestRoutes";
dotenv.config();

const PORT = process.env.PORT || 5000;
import sgMail from '@sendgrid/mail'


sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
// Note: If you need EU data residency, configure it in your SendGrid account settings
// or use a EU-specific API key

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contest", contestRoutes);


app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
