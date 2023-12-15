import multer from "multer";
import fs from "fs";

//types
import { IFileUploadMiddlewareOptions } from "../types/file";

export const fileUploadMiddleware = ({
  fieldName,
}: IFileUploadMiddlewareOptions) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "uploads/";
      // Check if the directory exists; if not, create it
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  // Create the multer instance with the storage options
  const upload = multer({ storage: storage });

  // Return the middleware with the specified field name
  return upload.single(fieldName);
};
