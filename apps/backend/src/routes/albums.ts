import { Router } from "express";
import { getAlbums } from "../services/albums.service";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const albums = await getAlbums();
        res.json(albums);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch albums" });
    }
});

export default router;