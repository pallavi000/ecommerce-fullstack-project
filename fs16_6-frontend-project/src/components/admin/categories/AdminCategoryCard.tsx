import React, { useState } from "react";
// redux
import { useAppDispatch } from "../../../redux/store";

// MUI
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

// icons
import { Delete, Edit } from "@mui/icons-material";

// components
import CustomModal from "../../CustomModal";
import CategoryForm from "./CategoryForm";

// types
import { TCategory } from "../../../@types/category";

// reducers
import { deleteAdminCategory } from "../../../redux/reducers/admin/adminCategoryReducer";
import usePermission from "../../../hooks/userPermission";

// popover transition from down to up
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// component props type
type AdminCategoryCardProps = { category: TCategory };

function AdminCategoryCard({ category }: AdminCategoryCardProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsloading] = useState(false);

  // modal open/close states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // handle category delete submit
  const handleCategoryDelete = async () => {
    setIsloading(true);
    await dispatch(deleteAdminCategory({ id: category._id }));
    setIsDeleteModalOpen(false);
    setIsloading(false);
  };

  return (
    <>
      <CustomModal
        isOpen={isEditModalOpen}
        modalTitle="Update Category"
        onClose={() => setIsEditModalOpen(false)}
        component={
          <CategoryForm
            category={category}
            onClose={() => setIsEditModalOpen(false)}
          />
        }
      />

      <Dialog
        open={isDeleteModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsDeleteModalOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Category Deletion?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this category? This action cannot be
            undone and will remove all associated items and data. Please confirm
            your choice to proceed with the deletion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={() => handleCategoryDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <Box sx={{ pt: "100%", position: "relative" }}>
          <img
            style={{
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
            }}
            alt={category.name}
            src={category.image}
          />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="button" noWrap>
            {category.name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {usePermission("CATEGORIES_UPDATE") && (
              <Fab
                size="small"
                color="warning"
                aria-label="edit"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit fontSize={"small"} />
              </Fab>
            )}
            {usePermission("CATEGORIES_DELETE") && (
              <Fab
                size="small"
                color="error"
                disabled={isLoading}
                aria-label="delete"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Delete fontSize={"small"} />
                )}
              </Fab>
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
}

export default AdminCategoryCard;
