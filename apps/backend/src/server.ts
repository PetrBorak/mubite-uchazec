import express from "express";
import cors from "cors";
import albumsRouter from "./routes/albums";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/albums", albumsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Backendové API spuštěné na http://localhost:${PORT}`);
});