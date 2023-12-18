import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// redux
import { AppState, useAppDispatch } from "../redux/store";

//MUI
import { Box, Container, Grid, SelectChangeEvent } from "@mui/material";

// components
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";
import SidebarFilter from "../components/SidebarFilter";
import SkeletonProductCard from "../components/skeleton/SkeletonProductCard";
import BannerContainer from "../components/BannerContainer";

// reducers
import { fetchSearchProducts } from "../redux/reducers/productsReducer";
import CustomPagination from "../components/CustomPagination";
import TopbarFilter from "../components/TopbarFilter";

//types
import { TProductSortingOption } from "../@types/product";

function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // query params
  const [searchQuery, setSearchQuery] = useState<string>("");

  // app dispatch
  const dispatch = useAppDispatch();

  // for pagination
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [sorting, setSorting] = useState<TProductSortingOption>("newest");

  // sidebar filter
  const [price, setPrice] = React.useState<number[]>([1, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // products state
  const { products, isLoading, totalPages } = useSelector(
    (state: AppState) => ({
      products: state.products.data,
      isLoading: state.products.isLoading,
      totalPages: state.products.totalPages,
    })
  );
  // categories states
  const { category } = useSelector((state: AppState) => ({
    category: state.category.data,
  }));

  // search query param
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
    } else {
      navigate("/not-found");
    }
  }, [location]);

  // search products fetch
  React.useEffect(() => {
    if (searchQuery) {
      dispatch(
        fetchSearchProducts({
          pageNo,
          perPage,
          query: searchQuery,
          price_min: price[0],
          price_max: price[1],
          categoryId: selectedCategory,
          sorting,
          sizeIds: selectedSizes,
        })
      );
    }
  }, [
    perPage,
    pageNo,
    searchQuery,
    price,
    selectedCategory,
    sorting,
    selectedSizes,
  ]);

  const handlePerPageChange = (e: SelectChangeEvent) => {
    setPerPage(Number(e.target.value));
  };

  const handleSortingChange = (e: SelectChangeEvent) => {
    setSorting(e.target.value as TProductSortingOption);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNo(value);
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "0rem 1rem" }}>
      <BannerContainer />
      <Box sx={{ margin: "2rem 0rem" }}>
        <BreadCrumb label={`Search Result for "${searchQuery}"`} />
      </Box>
      <Grid container columns={12} spacing={6} sx={{ padding: "2rem 0rem" }}>
        <Grid item xs={12} md={4} lg={3}>
          <SidebarFilter
            price={price}
            setPrice={setPrice}
            setSelectedCategory={setSelectedCategory}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <TopbarFilter
            pageNo={pageNo}
            perPage={perPage}
            sorting={sorting}
            handlePerPageChange={handlePerPageChange}
            handleSortingChange={handleSortingChange}
          />
          <Grid container spacing={3} columns={12} sx={{ marginTop: "2rem" }}>
            {isLoading
              ? [...Array(perPage)].map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))
              : products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
          </Grid>
          <CustomPagination
            currentPage={pageNo}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchResult;
