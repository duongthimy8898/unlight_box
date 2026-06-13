import express from "express";
import uploadRoute from "./routes/upload.route";

const app = express();

app.use(express.json());

app.use("/upload", uploadRoute);

export default app;