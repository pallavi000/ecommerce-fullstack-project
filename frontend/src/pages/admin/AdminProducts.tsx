import React, { useEffect } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  TextField,
  InputAdornment,
  LinearProgress,
  Divider,
} from "@mui/material";

// icons
import { Add, Search } from "@mui/icons-material";

// reducers
import {
  deleteAdminProduct,
  fetchAdminAllProducts,
} from "../../redux/reducers/admin/adminProductReducer";
import { fetchAdminCategories } from "../../redux/reducers/admin/adminCategoryReducer";
import { fetchAdminSizes } from "../../redux/reducers/admin/adminSizeReducer";

// components
import TableOptionPopover from "../../components/TableOptionPopover";
import ProductTableBody from "../../components/admin/products/ProductTableBody";
import TableSearchNotFound from "../../components/TableSearchNotFound";
import CustomModal from "../../components/CustomModal";
import AdminProductForm from "../../components/admin/products/AdminProductForm";

// types
import { TProduct } from "../../@types/product";

//helpers
import withPermission from "../../context/withPermission";
import usePermission from "../../hooks/userPermission";

function AdminProducts() {
  const dispatch = useAppDispatch();

  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter states
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const [filterName, setFilterName] = React.useState("");

  // popover control states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [activeProduct, setActiveProduct] = React.useState<null | TProduct>(
    null
  );

  // modal control states
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);

  // products state
  const { products, isLoading } = useSelector((state: AppState) => ({
    products: state.adminProducts.data,
    isLoading: state.adminProducts.isLoading,
    totalPages: state.adminProducts.totalPages,
  }));

  // categories
  const categories = useSelector(
    (state: AppState) => state.adminCategories.data
  );

  // categories
  const sizes = useSelector((state: AppState) => state.adminSizes.data);

  // fetch categories & products
  useEffect(() => {
    dispatch(fetchAdminAllProducts());
    // categories for adding and editing products
    dispatch(fetchAdminCategories());

    // sizes for adding and editing products
    dispatch(fetchAdminSizes());
  }, []);

  // handle checkbox all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = products.map((u) => u._id);
      setSelectedProducts(newSelecteds);
      return;
    }
    setSelectedProducts([]);
  };

  // handle single checkbox click
  const handleSelectClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (selectedProducts.includes(id)) {
      const filterdSelectedUsers = selectedProducts.filter((s) => s !== id);
      setSelectedProducts(filterdSelectedUsers);
    } else {
      setSelectedProducts((prev) => [...prev, id]);
    }
  };

  // handle search by name
  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // paginations
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // popover handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: TProduct
  ) => {
    setActiveProduct(product);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
  };

  const handleModalClose = () => {
    setIsProductModalOpen(false);
    setActiveProduct(null);
  };

  // handle popover menus click
  const handleProductEditClick = () => {
    handlePopoverClose();
    setIsProductModalOpen(true);
  };

  const handleProductDeleteClick = async () => {
    if (activeProduct)
      await dispatch(deleteAdminProduct({ id: activeProduct._id }));
    setActiveProduct(null);
    handlePopoverClose();
  };

  // serach/filter products
  const filterProducts = products?.filter((u) =>
    u.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
  );

  const isNotFound = !filterProducts.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Products</Typography>
        {usePermission("PRODUCTS_CREATE") && (
          <Button
            size="small"
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsProductModalOpen(true)}
          >
            New Product
          </Button>
        )}
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 4 }} />

      <CustomModal
        modalTitle={activeProduct ? "Update Product" : "Create Product"}
        isOpen={isProductModalOpen}
        onClose={handleModalClose}
        component={
          <AdminProductForm
            product={activeProduct}
            onClose={handleModalClose}
          />
        }
      />

      <Card>
        <TextField
          size="small"
          sx={{ ml: 1, flex: 1, margin: "1rem" }}
          placeholder="Search Products"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleFilterByName}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedProducts.length > 0 &&
                      selectedProducts.length < products.length
                    }
                    checked={
                      products.length > 0 &&
                      selectedProducts.length === products.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterProducts &&
                filterProducts
                  .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                  .map((product) => {
                    return (
                      <ProductTableBody
                        key={product._id}
                        product={product}
                        selectedProducts={selectedProducts}
                        handleSelectClick={handleSelectClick}
                        handlePopoverOpen={handlePopoverOpen}
                      />
                    );
                  })}
            </TableBody>

            {isLoading && !products.length && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            {isNotFound && <TableSearchNotFound query={filterName} />}

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  count={filterProducts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <TableOptionPopover
          isLoading={isLoading}
          anchorEl={popoverEle}
          handleEdit={handleProductEditClick}
          handleDelete={handleProductDeleteClick}
          handleCloseMenu={handlePopoverClose}
          showEdit={usePermission("PRODUCTS_UPDATE")}
          showDelete={usePermission("PRODUCTS_DELETE")}
        />
      </Card>
    </Container>
  );
}

export default withPermission(AdminProducts, "PRODUCTS_READ");
