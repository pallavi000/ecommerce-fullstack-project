import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// icons
import { Add } from "@mui/icons-material";

// components
import AdminCategoryCard from "../../components/admin/categories/AdminCategoryCard";
import SkeletonCategoryCard from "../../components/skeleton/SkeletonCategoryCard";
import CustomModal from "../../components/CustomModal";
import CategoryForm from "../../components/admin/categories/CategoryForm";

// reducers
import { fetchAdminCategories } from "../../redux/reducers/admin/adminCategoryReducer";

//helpers
import withPermission from "../../context/withPermission";
import usePermission from "../../hooks/userPermission";

function AdminCategories() {
  const dispatch = useAppDispatch();

  // categories states
  const { categories, isLoading } = useSelector((state: AppState) => ({
    categories: state.adminCategories.data,
    isLoading: state.adminCategories.isLoading,
  }));

  // new category modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch categories
  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Categories</Typography>
        {usePermission("CATEGORIES_CREATE") && (
          <Button
            onClick={() => setIsModalOpen(true)}
            size="small"
            variant="contained"
            startIcon={<Add />}
          >
            New Category
          </Button>
        )}
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 4 }} />

      <CustomModal
        isOpen={isModalOpen}
        modalTitle="Creat Category"
        onClose={() => setIsModalOpen(false)}
        component={<CategoryForm onClose={() => setIsModalOpen(false)} />}
      />

      <Grid container spacing={3}>
        {isLoading && !categories.length
          ? [...Array(8)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <SkeletonCategoryCard key={index} />
              </Grid>
            ))
          : categories.map((category) => (
              <Grid key={category._id} item xs={6} sm={4} md={3}>
                <AdminCategoryCard category={category} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default withPermission(AdminCategories, "CATEGORIES_READ");
