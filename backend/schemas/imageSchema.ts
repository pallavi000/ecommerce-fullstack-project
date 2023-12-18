import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../constants/server";
import { z } from "zod";

export const ImageSchema = z
  .any()
  .refine((file) => Boolean(file), "Image is required.")
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype),
    ".jpg, .jpeg, .png and .webp files are accepted."
  );
