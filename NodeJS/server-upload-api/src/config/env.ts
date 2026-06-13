import process from "process";


// export const env = {
//   PORT: process.env.PORT || "3000",

//   STREAM_API_KEY: process.env.STREAM_API_KEY!,
//   LIBRARY_ID: process.env.LIBRARY_ID!,

//   STORAGE_API_KEY: process.env.STORAGE_API_KEY!,
//   STORAGE_ZONE: process.env.STORAGE_ZONE!
// };

export const env = {
  STREAM_API_KEY: process.env.STREAM_API_KEY!,
  LIBRARY_ID: process.env.LIBRARY_ID!,
  CDN_HOST: process.env.CDN_HOST! // vz-xxxx.b-cdn.net
};