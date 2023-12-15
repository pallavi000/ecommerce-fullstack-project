import { Request } from "express";
import { File } from "multer";

export interface IFileUploadMiddlewareOptions {
  fieldName: string;
}

export interface IMulterRequest extends Request {
  file: File;
}
