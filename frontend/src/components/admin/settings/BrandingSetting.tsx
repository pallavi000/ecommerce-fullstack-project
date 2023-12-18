import { ChangeEvent, useMemo, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
//mui
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

//redux
import { AppState } from "../../../redux/store";

//types
import { TSettingInputs } from "../../../@types/setting";

//utils
import ColorPicker from "./ColorPicker";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type TUploadItemKey = "logo" | "logoDark" | "favicon";

type TUploadItem = {
  title: string;
  image: string;
  key: TUploadItemKey;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

function BrandingSetting({ isDisabled = false }: { isDisabled?: boolean }) {
  const { getValues, setValue, watch } = useFormContext<TSettingInputs>();
  const setting = useSelector((state: AppState) => state.setting.data);

  // temporary image state
  const [logoUrl, setLogoUrl] = useState<string>(getValues("logoUrl"));
  const [logoDarkUrl, setLogoDarkUrl] = useState<string>(
    getValues("logoDarkUrl")
  );
  const [faviconUrl, setFaviconUrl] = useState<string>(getValues("faviconUrl"));

  const uploadItems: TUploadItem[] = useMemo(
    () => [
      { title: "Logo", image: logoUrl, setState: setLogoUrl, key: "logo" },
      {
        title: "Dark Mode Logo",
        image: logoDarkUrl,
        setState: setLogoDarkUrl,
        key: "logoDark",
      },
      {
        title: "Favicon",
        image: faviconUrl,
        setState: setFaviconUrl,
        key: "favicon",
      },
    ],
    [logoUrl, logoDarkUrl, faviconUrl]
  );

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    key: TUploadItemKey
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(key, file);
      const reader = new FileReader();
      reader.onload = () => {
        setState(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack rowGap={4} marginTop={4}>
      <Grid container spacing={4}>
        {uploadItems.map((item) => {
          return (
            <Grid key={item.title} item md={4} sm={12}>
              <Card sx={{ paddingBottom: 2 }}>
                <CardHeader title={item.title} />
                <Divider />
                <CardContent
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Avatar
                    alt={item.title}
                    src={item.image}
                    sx={{ alignItems: "center" }}
                    variant="square"
                  />
                </CardContent>
                <CardActions
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Choose File Here
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e, item.setState, item.key)
                      }
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card variant="outlined">
        <CardHeader title="Theme Customizer" />
        <Divider />
        <CardContent>
          <Grid container spacing={2} rowSpacing={4}>
            <ColorPicker />
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default BrandingSetting;
