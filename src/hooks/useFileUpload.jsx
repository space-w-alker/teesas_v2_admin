import { useState } from "react";
import { uploadFile } from "react-s3";

const S3_BUCKET = "teesasocean";
const REGION = "us-east-1";

const config = {
  bucketName: S3_BUCKET,
  dirName: "TeesasAdmin", /* optional: FoodImages, Logos */
  region: REGION,
  accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  acl: 'public-read', // Make uploaded files publicly accessible
};

const sanitizeFileName = (name) => {
  return name.replace(/\s+/g, "_").replace(/[()]/g, "_");
};

export const useFileUploadHandler = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoader, setImageLoader] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return null;

    setImageLoader(true);
    try {
      const sanitizedFile = new File([file], sanitizeFileName(file.name), {
        type: file.type,
      });

      const data = await uploadFile(sanitizedFile, config);
      const { location } = data;
      // Ensure the URL is properly formatted as a public URL
      // Replace spaces with + and ensure it's a valid public URL
      const fileUrl = location ? location.replace(/ /g, "+") : location;
      setImageUrl(fileUrl);
      return fileUrl;
    } catch (err) {
      console.error("File upload error:", err);
      throw err;
    } finally {
      setImageLoader(false);
    }
  };

  return {
    imageUrl,
    imageLoader,
    setImageUrl,
    handleFileUpload,
  };
};

export default useFileUploadHandler;

