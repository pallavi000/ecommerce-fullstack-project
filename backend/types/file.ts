import { Request } from "express";

export interface IFileUploadMiddlewareOptions {
  fieldName: string;
}

export interface IMulterFile {
  [fieldname: string]: any;
}
export interface IMulterRequest extends Request {
  file: Express.Multer.File;
}
