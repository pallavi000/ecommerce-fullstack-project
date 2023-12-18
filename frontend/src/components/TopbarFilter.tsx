import React from "react";

//MUI
import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

//redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// icons
import GridViewIcon from "@mui/icons-material/GridView";

//types
import { TProductSortingOption } from "../@types/product";

type TopbarFilterProps = {
  pageNo: number;
  perPage: number;
  sorting: TProductSortingOption;
  handlePerPageChange: (e: SelectChangeEvent) => void;
  handleSortingChange: (e: SelectChangeEvent) => void;
};

function TopbarFilter({
  pageNo,
  perPage,
  sorting,
  handlePerPageChange,
  handleSortingChange,
}: TopbarFilterProps) {
  // current category state
  const { totalProducts } = useSelector((state: AppState) => ({
    totalProducts: state.products.totalProducts,
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <GridViewIcon />
          <Typography variant="subtitle1">
            Showing {(pageNo - 1) * perPage}-
            {pageNo * perPage < totalProducts
              ? pageNo * perPage
              : totalProducts}{" "}
            of {totalProducts} items
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="subtitle1" flexGrow={1}>
              Sort By:
            </Typography>
            <FormControl>
              <Select
                value={sorting}
                onChange={handleSortingChange}
                size="small"
              >
                <MenuItem value={"newest"}>Newest Arrivals</MenuItem>
                <MenuItem value={"price_low_to_high"}>
                  Price Low to High
                </MenuItem>
                <MenuItem value={"price_high_to_low"}>
                  Price High to Low
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="subtitle1">Show:</Typography>
            <FormControl fullWidth>
              <Select
                value={perPage.toString()}
                onChange={handlePerPageChange}
                size="small"
              >
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={20}>24</MenuItem>
                <MenuItem value={30}>36</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>
      <Divider />
    </>
  );
}

export default TopbarFilter;
