import React, { useEffect, useState } from "react";
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
  CardContent,
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";

// icons
import { PersonAdd, Search } from "@mui/icons-material";

// reducers
import {
  deleteUser,
  fetchUsers,
} from "../../redux/reducers/admin/adminUserReducer";

// components
import TableOptionPopover from "../../components/TableOptionPopover";
import UserTableBody from "../../components/admin/users/UserTableBody";

// types
import { TUser } from "../../@types/user";
import { fetchPermissions } from "../../redux/reducers/admin/adminPermissionReducer";
import CustomModal from "../../components/CustomModal";
import AdminUserForm from "../../components/admin/users/AdminUserForm";
import TableSearchNotFound from "../../components/TableSearchNotFound";
import withPermission from "../../context/withPermission";
import { ADMIN_SIDEBAR_WIDTH } from "../../utils/constants";
import usePermission from "../../hooks/userPermission";

function AdminUsers() {
  const [tabValue, setTabValue] = React.useState(0);
  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter states
  const [filterName, setFilterName] = React.useState("");

  // popover menu states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [activeUser, setActiveUser] = useState<null | TUser>(null);

  // modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // app dispatch
  const dispatch = useAppDispatch();

  // auth state
  const { users, isLoading } = useSelector((state: AppState) => ({
    users: state.adminUsers.data,
    isLoading: state.adminUsers.isLoading,
  }));

  const canReadPermission = usePermission("PERMISSIONS_READ");

  // get/fetch users
  useEffect(() => {
    dispatch(fetchUsers());
    if (canReadPermission) dispatch(fetchPermissions());
  }, []);

  // handle search by name
  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // handle paginations
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

  // popover open/close handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: TUser
  ) => {
    setActiveUser(user);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
    //setActiveUser(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setActiveUser(null);
  };

  // popover menu item click handler
  const handleUserEditClick = () => {
    handlePopoverClose();
    setIsModalOpen(true);
  };

  const handleUserDeleteClick = () => {
    if (activeUser) dispatch(deleteUser({ id: activeUser._id }));
    handlePopoverClose();
  };

  // search filter hanlder
  const filteredUsers = users.filter(
    (u: TUser) =>
      u.firstName
        .toLocaleLowerCase()
        .includes(filterName.toLocaleLowerCase()) &&
      u.role === (tabValue === 0 ? "ADMIN" : "USER")
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Users</Typography>
        {usePermission("USERS_CREATE") && (
          <Button
            size="small"
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setIsModalOpen(true)}
          >
            New User
          </Button>
        )}
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 4 }} />

      <CustomModal
        isOpen={isModalOpen}
        modalTitle="Create User"
        onClose={() => handleModalClose()}
        component={
          <AdminUserForm user={activeUser} onClose={() => handleModalClose()} />
        }
      />

      <Card>
        <CardContent>
          <TextField
            size="small"
            sx={{ ml: 1, flex: 1, margin: "1rem" }}
            placeholder="Search Users"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleFilterByName}
          />

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Admin/Staffs" />
              <Tab label="Users/Customers" />
            </Tabs>
          </Box>

          <Container maxWidth="md">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                    .map((user: TUser) => {
                      return (
                        <UserTableBody
                          key={user._id}
                          user={user}
                          handlePopoverOpen={handlePopoverOpen}
                        />
                      );
                    })}
                </TableBody>
                {isLoading && !users.length && (
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
                      rowsPerPageOptions={[10, 50]}
                      count={users.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Container>
          <TableOptionPopover
            anchorEl={popoverEle}
            handleEdit={handleUserEditClick}
            handleDelete={handleUserDeleteClick}
            handleCloseMenu={handlePopoverClose}
            showEdit={usePermission("USERS_UPDATE")}
            showDelete={usePermission("USERS_DELETE")}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default withPermission(AdminUsers, "USERS_READ");
