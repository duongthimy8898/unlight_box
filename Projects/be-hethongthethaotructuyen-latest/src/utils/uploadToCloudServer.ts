import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

async function uploadToCloudServer(file: Express.Multer.File, fieldName = "file") {
  const formData = new FormData();
  formData.append(fieldName, fs.createReadStream(file.path), file.originalname);

  const uploadRes = await axios.post<any>(
    `${process.env.SERVER_UPLOAD}/api/v1/resources/upload`,
    formData,
    {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    } as any
  );

  console.log("uploadres file:", uploadRes.data);


  fs.unlinkSync(file.path);

  return `${process.env.SERVER_UPLOAD}${uploadRes.data?.resource?.sourceUrl}`;
}

export { uploadToCloudServer };
