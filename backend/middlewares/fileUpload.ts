import multer from "multer";
import fs from "fs";

//types
import { generateUniqueFilename } from "../utils/helpers";

export const fileUploadMiddleware = (...fieldNames: string[]) => {
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
      const fileExtension = file.originalname.split(".").pop();
      const fname = generateUniqueFilename(fileExtension);
      cb(null, fname);
    },
  });
  // Create an array of middleware functions for each field name
  const upload = multer({ storage: storage });
  const fields = fieldNames.length
    ? fieldNames.map((field) => ({ name: field, maxCount: 1 }))
    : [];
  return upload.fields(fields);
};
