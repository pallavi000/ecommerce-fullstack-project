import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

// icons
import { Add, Search } from "@mui/icons-material";

// components
import CustomModal from "../../components/CustomModal";
import TableOptionPopover from "../../components/TableOptionPopover";
import SizeBodyTable from "../../components/admin/sizes/SizeTableBody";
import TableSearchNotFound from "../../components/TableSearchNotFound";
import AdminSizeForm from "../../components/admin/sizes/AdminSizeForm";

// reducers
import {
  deleteAdminSize,
  fetchAdminSizes,
} from "../../redux/reducers/admin/adminSizeReducer";

//types
import { TSize } from "../../@types/size";
import withPermission from "../../context/withPermission";
import usePermission from "../../hooks/userPermission";

function AdminSizes() {
  const dispatch = useAppDispatch();

  // modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSize, setActiveSize] = useState<null | TSize>(null);

  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // filter states
  const [filterSizeName, setFilterSizeName] = React.useState("");
  // popover menu states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  // sizes states
  const { sizes, isLoading } = useSelector((state: AppState) => ({
    sizes: state.adminSizes.data,
    isLoading: state.adminSizes.isLoading,
  }));

  // handle search by order id
  const handleFilterBySizeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(0);
    setFilterSizeName(event.target.value);
  };

  // pagination handlers
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

  // fetch sizes
  useEffect(() => {
    dispatch(fetchAdminSizes());
  }, []);

  // popover open/close handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    size: TSize
  ) => {
    setActiveSize(size);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setActiveSize(null);
  };

  // popover menu item click handler
  const handleSizeEditClick = () => {
    handlePopoverClose();
    setIsModalOpen(true);
  };

  const handleSizeDeleteClick = async () => {
    if (activeSize) await dispatch(deleteAdminSize({ id: activeSize._id }));
    handlePopoverClose();
    setActiveSize(null);
  };

  // filter sizes
  const filterSizes = sizes.filter((u) =>
    u.name.toLocaleLowerCase().includes(filterSizeName.toLocaleLowerCase())
  );

  const isNotFound = !filterSizes.length && !!filterSizeName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Sizes</Typography>
        {usePermission("SIZES_CREATE") && (
          <Button
            size="small"
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsModalOpen(true)}
          >
            New Size
          </Button>
        )}
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 4 }} />

      {/* create/edit size modal */}
      <CustomModal
        modalTitle="Create Size"
        isOpen={isModalOpen}
        onClose={() => handleModalClose()}
        component={
          <AdminSizeForm
            size={activeSize}
            handleClose={() => handleModalClose()}
          />
        }
      />

      <Card>
        <TextField
          size="small"
          sx={{ ml: 1, flex: 1, margin: "1rem" }}
          placeholder="Search by name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleFilterBySizeName}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created at</TableCell>

                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterSizes
                .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                .map((size) => {
                  return (
                    <SizeBodyTable
                      size={size}
                      key={size._id}
                      handlePopoverOpen={handlePopoverOpen}
                    />
                  );
                })}
            </TableBody>

            {isNotFound && <TableSearchNotFound query={filterSizeName} />}

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  count={filterSizeName.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
      <TableOptionPopover
        anchorEl={popoverEle}
        handleEdit={handleSizeEditClick}
        handleDelete={handleSizeDeleteClick}
        handleCloseMenu={handlePopoverClose}
        showDelete={usePermission("SIZES_DELETE")}
        showEdit={usePermission("SIZES_UPDATE")}
      />
    </Container>
  );
}

export default withPermission(AdminSizes, "SIZES_READ");
