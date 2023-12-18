import React, { useState } from "react";

import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

//component
import LoadingButton from "./LoadingButton";

//types
import { TPermission } from "../@types/permission";

//component props type
type PermissionsPickerModalProps = {
  permissions: TPermission[];
  handleSubmit: (permissions: string[]) => void;
  selectedPermissions?: string[];
};

function PermissionsPickerModal({
  permissions,
  selectedPermissions = [],
  handleSubmit,
}: PermissionsPickerModalProps) {
  const formattedPermissions = permissions.reduce((acc, item) => {
    const [key, value] = item.name.split("_");
    acc[key] = [...(acc[key] || []), { ...item, formattedName: value }];
    return acc;
  }, {} as Record<string, any[]>);

  const [newSelectedPermissions, setNewSelectedPermissions] =
    useState<string[]>(selectedPermissions);

  const handleChange = (checked: boolean, id: string) => {
    if (checked) {
      setNewSelectedPermissions((prev) => [...prev, id]);
    } else {
      const newCheckedArray = newSelectedPermissions.filter((p) => p !== id);
      setNewSelectedPermissions(newCheckedArray);
    }
  };

  const handleChangeGroup = (checked: boolean, data: TPermission[]) => {
    const ids = data.map((d) => d._id);
    if (checked) {
      console.log(Array.from(new Set([...newSelectedPermissions, ...ids])));
      setNewSelectedPermissions((prev) =>
        Array.from(new Set([...prev, ...ids]))
      );
    } else {
      setNewSelectedPermissions((prev) => prev.filter((p) => !ids.includes(p)));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(newSelectedPermissions);
  };

  return (
    <Box component={"form"} onSubmit={handleFormSubmit}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={(e, checked) =>
                    handleChangeGroup(checked, permissions)
                  }
                  defaultChecked={
                    newSelectedPermissions.length
                      ? newSelectedPermissions.every((id) =>
                          permissions.map((p) => p._id).includes(id)
                        )
                      : false
                  }
                />
              </TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(formattedPermissions).map((module) => {
              const modulePermissions = formattedPermissions?.[module];
              const modulePermissionIds = modulePermissions.map((mp) => mp._id);
              return (
                <TableRow key={module}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={modulePermissionIds.every((id) =>
                        newSelectedPermissions.includes(id)
                      )}
                      onChange={(e, checked) =>
                        handleChangeGroup(checked, modulePermissions)
                      }
                    />
                  </TableCell>
                  <TableCell size="small">{module}</TableCell>
                  <TableCell>
                    <Table>
                      <TableRow>
                        {modulePermissions.map((modulePermission) => {
                          return (
                            <TableCell
                              size="small"
                              sx={{ border: 0 }}
                              key={modulePermission._id}
                            >
                              <FormControlLabel
                                checked={newSelectedPermissions.includes(
                                  modulePermission._id
                                )}
                                onChange={(e, checked) =>
                                  handleChange(checked, modulePermission._id)
                                }
                                value={modulePermission._id}
                                control={<Checkbox />}
                                label={modulePermission.formattedName}
                              />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </Table>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <FormGroup>
        {permissions.map((permission) => {
          return (
            <FormControlLabel
              key={permission._id}
              control={
                <Checkbox
                  defaultChecked={selectedPermissions.includes(permission._id)}
                />
              }
              label={permission.name}
              onChange={(e, checked) => handleChange(checked, permission._id)}
            />
          );
        })}
      </FormGroup> */}

      <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
      <LoadingButton isLoading={false} title="Select" color="success" />
    </Box>
  );
}

export default PermissionsPickerModal;
