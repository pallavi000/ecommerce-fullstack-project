import { ChangeEvent, useMemo, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
//mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

//redux
import { AppState } from "../../../redux/store";

//types
import { TSettingInputs } from "../../../@types/setting";

//utils
import { showCustomToastr } from "../../../utils/helper";

const colorItems: { title: string; field: any }[] = [
  { title: "Primary Color", field: "theme.primaryColor" },
  { title: "Secondary Color", field: "theme.secondaryColor" },
  { title: "Info Color", field: "theme.infoColor" },
  { title: "Warning Color", field: "theme.warningColor" },
  { title: "Success Color", field: "theme.successColor" },
  { title: "Error Color", field: "theme.errorColor" },
];

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

function BrandingSetting({ isDisabled = false }: { isDisabled?: boolean }) {
  const { getValues, setValue, watch } = useFormContext<TSettingInputs>();
  const setting = useSelector((state: AppState) => state.setting.data);

  // temporary image state
  const [logoUrl, setLogoUrl] = useState<string>(getValues("logoUrl"));
  const [logoDarkUrl, setLogoDarkUrl] = useState<string>(
    getValues("logoDarkUrl")
  );
  const [faviconUrl, setFaviconUrl] = useState<string>(getValues("faviconUrl"));

  const uploadItems = useMemo(
    () => [
      { title: "Logo", image: logoUrl, setImage: setLogoUrl },
      { title: "Dark Mode Logo", image: logoDarkUrl, setImage: setLogoDarkUrl },
      { title: "Favicon", image: faviconUrl, setImage: setFaviconUrl },
    ],
    [logoUrl, logoDarkUrl, faviconUrl]
  );

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
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
                      onChange={(e) => handleImageChange(e, item.setImage)}
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
            {colorItems.map((color) => {
              return (
                <Grid key={color.title} item lg={4} md={6} sm={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <Typography sx={{ padding: 1 }} variant="subtitle1">
                          {color.title}
                        </Typography>
                        <Paper
                          sx={{
                            bgcolor: watch(color.field),
                            width: 30,
                            height: 20,
                          }}
                        />
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ padding: 2 }}>
                        <ChromePicker
                          color={getValues(color.field)}
                          onChange={(newColor: ColorResult) =>
                            setValue(color.field, newColor.hex)
                          }
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default BrandingSetting;
