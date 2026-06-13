import { Request, Response } from "express";
import Busboy from "busboy";
import axios from "axios";
import pLimit from "p-limit";
import { env } from "../config/env";

const limit = pLimit(2); // ⚠️ giới hạn 2 file cùng lúc

export class UploadController {
  static upload(req: Request, res: Response) {
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        files: 10, // max 10 file
        fileSize: 5 * 1024 * 1024 * 1024 // 5GB/file
      }
    });

    const results: any[] = [];
    const tasks: Promise<void>[] = [];

    busboy.on("file", (fieldname, file, filename) => {
      const task = limit(async () => {
        try {
          // ===== 1. CREATE VIDEO =====
          const createRes = await axios.post(
            `https://video.bunnycdn.com/library/${env.LIBRARY_ID}/videos`,
            { title: filename },
            {
              headers: {
                AccessKey: env.STREAM_API_KEY,
                "Content-Type": "application/json"
              }
            }
          );

          const videoId = createRes.data.guid;

          // ===== 2. STREAM UPLOAD =====
          await axios.put(
            `https://video.bunnycdn.com/library/${env.LIBRARY_ID}/videos/${videoId}`,
            file, // 🔥 stream trực tiếp
            {
              headers: {
                AccessKey: env.STREAM_API_KEY,
                "Content-Type": "application/octet-stream"
              },
              maxBodyLength: Infinity
            }
          );

          // ===== 3. PUSH RESULT =====
          results.push({
            fileName: filename,
            videoId,
            hls: `https://${env.CDN_HOST}/${videoId}/playlist.m3u8`
          });

        } catch (err) {
          results.push({
            fileName: filename,
            error: "Upload failed"
          });
        }
      });

      tasks.push(task);
    });

    busboy.on("finish", async () => {
      await Promise.all(tasks);

      return res.json({
        success: true,
        data: results
      });
    });

    req.pipe(busboy);
  }
}