import { IconButton } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import React, { useRef } from "react";

type CustomFileUploadProps = {
  buttonComponent: React.ReactElement;
  handleFileChange: (file: File | null) => void;
  mimeType?: string;
};

function CustomFileUpload({
  buttonComponent,
  handleFileChange,
  mimeType = "all/*",
}: CustomFileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>();

  return (
    <>
      <IconButton onClick={() => inputRef.current?.click()}>
        {buttonComponent}
      </IconButton>
      <MuiFileInput
        onChange={handleFileChange}
        inputProps={{ accept: mimeType }}
        fullWidth
        inputRef={inputRef}
        sx={{ display: "none" }}
      />
    </>
  );
}

export default CustomFileUpload;
