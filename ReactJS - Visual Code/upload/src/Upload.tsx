import React, { useState } from "react";
import axios from "axios";

interface UploadFile {
  file: File;
  progress: number;
  status: "waiting" | "uploading" | "done" | "error";
}

export default function Upload() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      progress: 0,
      status: "waiting" as const,
    }));

    setFiles(newFiles);
  };

  const uploadFile = async (index: number) => {
    const item = files[index];

    const formData = new FormData();
    formData.append("files", item.file);

    try {
      updateFile(index, { status: "uploading" });

      await axios.post("http://localhost:3000/upload", formData, {
        onUploadProgress: (e) => {
          if (!e.total) return;

          const percent = Math.round((e.loaded * 100) / e.total);

          updateFile(index, { progress: percent });
        },
      });

      updateFile(index, { status: "done", progress: 100 });
    } catch (err) {
      updateFile(index, { status: "error" });
    }
  };

  const updateFile = (index: number, data: Partial<UploadFile>) => {
    setFiles((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...data };
      return copy;
    });
  };

  const handleUploadAll = async () => {
    // upload tuần tự (an toàn)
    for (let i = 0; i < files.length; i++) {
      await uploadFile(i);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Multi Video</h2>

      <input type="file" multiple onChange={handleFileChange} />

      <button onClick={handleUploadAll} style={{ marginTop: 20 }}>
        Upload All
      </button>

      <div style={{ marginTop: 20 }}>
        {files.map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div>{item.file.name}</div>

            <div
              style={{
                width: "300px",
                height: "10px",
                background: "#eee",
              }}
            >
              <div
                style={{
                  width: `${item.progress}%`,
                  height: "100%",
                  background: "green",
                }}
              />
            </div>

            <div>
              {item.status} - {item.progress}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}