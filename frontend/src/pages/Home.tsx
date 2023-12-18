import React, { useEffect } from "react";
import { useAppDispatch } from "../redux/store";

// MUI
import { Container } from "@mui/material";

// reducers
import { fetchProducts } from "../redux/reducers/productsReducer";
import { fetchBanners } from "../redux/reducers/bannerReducer";

// components
import HomeBanner from "../components/home/HomeBanner";
import HomeCategories from "../components/home/HomeCategories";
import HomeProducts from "../components/home/HomeProducts";
import HomeBrands from "../components/home/HomeBrands";

function Home() {
  // app dispatch
  const dispatch = useAppDispatch();

  // fetch products
  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(
      fetchProducts({
        pageNo: 1,
        perPage: 16,
        price_min: 0,
        price_max: 5000,
        sorting: "price_high_to_low",
      })
    );
  }, []);

  return (
    <>
      <HomeBanner />
      <Container maxWidth="xl">
        <HomeCategories />
        <HomeProducts title="New Arrivals" />
      </Container>
      <HomeBanner />
      <Container maxWidth="xl">
        <HomeBrands />
        <HomeProducts title="Popular Products" startIndex={8} endIndex={16} />
      </Container>
    </>
  );
}

export default Home;
