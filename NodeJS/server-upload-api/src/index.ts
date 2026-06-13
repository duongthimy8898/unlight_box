import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import { Readable } from "stream";
import * as BunnyStorageSDK from "@bunny.net/storage-sdk";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());
const port = 3000;

// ===== ENV =====
const STORAGE_ZONE = "v-shorts/";
const STORAGE_KEY = "238059a3-c49c-4a58-812d427f6443-372e-40ec";
const STREAM_LIBRARY_ID = "632041";
const STREAM_API_KEY = "5879b546-9587-49bf-8e54da44b79a-153f-47a6";

// ===== STORAGE CONNECT =====
const storageZone = BunnyStorageSDK.zone.connect_with_accesskey(
    BunnyStorageSDK.regions.StorageRegion.Falkenstein,
    STORAGE_ZONE,
    STORAGE_KEY
);

// ===== MULTER =====
const upload = multer({
    storage: multer.memoryStorage(),
});

// ===== CREATE VIDEO (STREAM) =====
async function createVideo(title: string) {
    const res = await axios.post(
        `https://video.bunnycdn.com/library/${STREAM_LIBRARY_ID}/videos`,
        { title },
        {
            headers: {
                AccessKey: STREAM_API_KEY,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data; // { guid }
}

// ===== UPLOAD TO STORAGE =====
async function uploadToStorage(path: string, buffer: Buffer, mime: string) {
    const nodeStream = Readable.from(buffer);
    const webStream = Readable.toWeb(nodeStream); // 🔥 fix tại đây

    await BunnyStorageSDK.file.upload(
        storageZone,
        path,
        webStream,
        {
            contentType: mime,
        }
    );
}

// ===== UPLOAD TO STREAM =====
async function uploadToStream(videoId: string, buffer: Buffer) {
    await axios.put(
        `https://video.bunnycdn.com/library/${STREAM_LIBRARY_ID}/videos/${videoId}`,
        buffer,
        {
            headers: {
                AccessKey: STREAM_API_KEY,
                "Content-Type": "application/octet-stream",
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        }
    );
}

// ===== ROUTE =====
app.post("/upload", upload.array("files"), async (req: any, res) => {
    try {
        const files = req.files;

        const results = await Promise.all(
            files.map(async (file: any) => {
                if (!file.originalname.endsWith(".mp4")) return null;

                const filename = `${Date.now()}-${file.originalname}`;
                const storagePath = `/á á/${filename}`;

                // 1. tạo video stream
                const video = await createVideo(file.originalname);
                const videoId = video.guid;

                // 2. upload song song
                await Promise.all([
                    uploadToStorage(storagePath, file.buffer, file.mimetype),
                    // uploadToStream(videoId, file.buffer),
                ]);

                return {
                    filename,
                    storagePath,
                    videoId,
                    hls: `https://vz-6349f5f6-c7f.b-cdn.net/${videoId}/playlist.m3u8`,
                    embed: `https://iframe.mediadelivery.net/embed/${STREAM_LIBRARY_ID}/${videoId}`,
                };
            })
        );

        res.json({
            success: true,
            videos: results.filter(Boolean),
        });
    } catch (err: any) {
        console.error(err?.response?.data || err.message);
        res.status(500).json({ error: "Upload failed" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running http://localhost:${port}`);
});