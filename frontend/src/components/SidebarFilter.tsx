import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
} from "@mui/material";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// helpers
import { valueToText } from "../utils/helper";
import { fetchAdminSizes } from "../redux/reducers/admin/adminSizeReducer";

// price range display text/label
const MIN_PRICE_RANGE_DISTANCE = 500;
const PRICE_RANGE_MARKS = [
  { value: 0, label: "$0" },
  { value: 10000, label: "$10000" },
];
for (let i = 0; i < 10000; i++) {
  if (i % 1000 === 0) {
    PRICE_RANGE_MARKS.push({ value: i, label: "" });
  }
}

// component props type
type SidebarFilterProps = {
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  selectedCategory?: string | number;
  setSelectedCategory: Function;
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
};

function SidebarFilter({
  price,
  setPrice,
  selectedCategory = 0,
  setSelectedCategory,
  selectedSizes,
  setSelectedSizes,
}: SidebarFilterProps) {
  const dispatch = useAppDispatch();
  // price ranges
  const [value, setValue] = useState<number[]>(price);

  // categories states
  const categories = useSelector((state: AppState) => state.categories.data);
  const sizes = useSelector((state: AppState) => state.adminSizes.data);

  useEffect(() => {
    dispatch(fetchAdminSizes());
  }, []);

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([
        Math.min(newValue[0], value[1] - MIN_PRICE_RANGE_DISTANCE),
        value[1],
      ]);
    } else {
      setValue([
        value[0],
        Math.max(newValue[1], value[0] + MIN_PRICE_RANGE_DISTANCE),
      ]);
    }
  };

  const handlePriceRangeChangeCommited = (
    event: Event | React.SyntheticEvent<Element | Event>,
    newValue: number | number[]
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const val = [
      Math.min(newValue[0], newValue[1] - MIN_PRICE_RANGE_DISTANCE),
      Math.max(newValue[1], newValue[0] + MIN_PRICE_RANGE_DISTANCE),
    ];
    setValue(val as number[]);
    setPrice(val as number[]);
  };

  const handleChangeCategory = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setSelectedCategory((event.target as HTMLInputElement).value);
  };

  const handleSizeChange = (id: string) => {
    if (selectedSizes?.includes(id)) {
      // remove
      setSelectedSizes((prev) => prev.filter((p) => p !== id));
    } else {
      setSelectedSizes((prev) => [...prev, id]);
    }
  };

  return (
    <Box>
      <Typography variant="h4" marginBottom={4}>
        Filters
      </Typography>
      <Accordion expanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup defaultValue={selectedCategory}>
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="All"
                defaultChecked
                onChange={handleChangeCategory}
              />
              {categories.map((category) => {
                return (
                  <FormControlLabel
                    key={category._id}
                    value={category._id}
                    control={<Radio />}
                    label={category.name}
                    onChange={handleChangeCategory}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ margin: "2rem 0rem" }}>
        <Typography variant="h6" marginBottom={"1rem 0rem"}>
          Price
        </Typography>
        <Box sx={{ px: 1, mt: 1 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChangeCommitted={handlePriceRangeChangeCommited}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            getAriaValueText={valueToText}
            max={10000}
            step={MIN_PRICE_RANGE_DISTANCE}
            marks={PRICE_RANGE_MARKS}
            disableSwap
          />
        </Box>
      </Box>
      <Box sx={{ margin: "2rem 0rem" }}>
        <Typography variant="h6" marginBottom={"1rem 0rem"}>
          Size
        </Typography>
        <Grid container sx={{ marginTop: 1 }} spacing={2}>
          {sizes.map((size) => {
            return (
              <Grid item key={size._id}>
                <Button
                  variant="text"
                  sx={{ padding: 0 }}
                  onClick={() => handleSizeChange(size._id)}
                >
                  <Paper
                    sx={{
                      padding: 2,
                      textAlign: "center",
                      minWidth: 60,
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: selectedSizes.includes(size._id)
                        ? "primary.main"
                        : "background.default",
                    }}
                  >
                    <Typography variant="subtitle2">{size.name}</Typography>
                  </Paper>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default SidebarFilter;
