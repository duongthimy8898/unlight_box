"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudServer = uploadToCloudServer;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
async function uploadToCloudServer(file, fieldName = "file") {
    const formData = new form_data_1.default();
    formData.append(fieldName, fs_1.default.createReadStream(file.path), file.originalname);
    const uploadRes = await axios_1.default.post(`${process.env.SERVER_UPLOAD}/api/v1/resources/upload`, formData, {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });
    console.log("uploadres file:", uploadRes.data);
    fs_1.default.unlinkSync(file.path);
    return `${process.env.SERVER_UPLOAD}${uploadRes.data?.resource?.sourceUrl}`;
}
