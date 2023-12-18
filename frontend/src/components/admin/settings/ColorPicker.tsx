import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useFormContext } from "react-hook-form";
import { TSettingInputs } from "../../../@types/setting";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const colorItems: { title: string; field: any }[] = [
  { title: "Primary Color", field: "theme.primaryColor" },
  { title: "Secondary Color", field: "theme.secondaryColor" },
  { title: "Info Color", field: "theme.infoColor" },
  { title: "Warning Color", field: "theme.warningColor" },
  { title: "Success Color", field: "theme.successColor" },
  { title: "Error Color", field: "theme.errorColor" },
];

function ColorPicker() {
  const { getValues, setValue, watch } = useFormContext<TSettingInputs>();

  return (
    <>
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
    </>
  );
}

export default ColorPicker;
