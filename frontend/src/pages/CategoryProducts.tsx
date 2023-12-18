import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import { Box, Container, Grid, SelectChangeEvent } from "@mui/material";

// reducers
import { setCategory } from "../redux/reducers/categoryReducer";
import { fetchProducts } from "../redux/reducers/productsReducer";

// components
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";
import SidebarFilter from "../components/SidebarFilter";
import SkeletonProductCard from "../components/skeleton/SkeletonProductCard";
import BannerContainer from "../components/BannerContainer";
import CustomPagination from "../components/CustomPagination";
import TopbarFilter from "../components/TopbarFilter";

//types
import { TProductSortingOption } from "../@types/product";

function CategoryProducts() {
  const { id } = useParams();

  // app dispatch
  const dispatch = useAppDispatch();

  // pagination states
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [sorting, setSorting] = useState<TProductSortingOption>("newest");

  // sidebar filter states
  const [price, setPrice] = React.useState<number[]>([1, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>();

  // categoreis states
  const categories = useSelector((state: AppState) => state.categories.data);

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
  }, [id]);

  // current category and products state
  const { category } = useSelector((state: AppState) => ({
    category: state.category.data,
  }));
  const { products, isLoading, totalPages } = useSelector(
    (state: AppState) => ({
      products: state.products.data,
      isLoading: state.products.isLoading,
      totalPages: state.products.totalPages,
    })
  );

  // fetch products of a category
  React.useEffect(() => {
    if (selectedCategory) {
      dispatch(
        fetchProducts({
          pageNo,
          perPage,
          price_min: price[0],
          price_max: price[1],
          categoryId: selectedCategory,
          sorting,
          sizeIds: selectedSizes,
        })
      );
    }
  }, [pageNo, perPage, price, selectedCategory, sorting, selectedSizes]);

  // set current category
  React.useEffect(() => {
    if (categories.length) {
      const foundCategory = categories.find((cat) => cat._id === id);
      if (foundCategory) dispatch(setCategory(foundCategory));
    }
  }, [categories, id]);

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
        <BreadCrumb label={category?.name || ""} />
      </Box>
      <Grid container columns={12} spacing={6} sx={{ padding: "2rem 0rem" }}>
        <Grid item xs={12} md={4} lg={3}>
          <SidebarFilter
            price={price}
            setPrice={setPrice}
            selectedCategory={selectedCategory}
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

export default CategoryProducts;
