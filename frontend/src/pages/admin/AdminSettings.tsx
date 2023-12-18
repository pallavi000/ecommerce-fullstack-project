import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//mui
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";

//redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

//types
import { TSettingInputs } from "../../@types/setting";

//components
import GeneralSetting from "../../components/admin/settings/GeneralSetting";
import BrandingSetting from "../../components/admin/settings/BrandingSetting";
import LoadingButton from "../../components/LoadingButton";

//reducers
import { updateWebsietSetting } from "../../redux/reducers/settingReducer";

//helpers
import usePermission from "../../hooks/userPermission";

const TABS = [
  { label: "General", Component: GeneralSetting },
  { label: "Branding", Component: BrandingSetting },
];

const themeSchema = yup.object().shape({
  primaryColor: yup.string().optional(),
  secondaryColor: yup.string().optional(),
  infoColor: yup.string().optional(),
  warningColor: yup.string().optional(),
  successColor: yup.string().optional(),
  errorColor: yup.string().optional(),
});

const validationSchema = yup.object().shape({
  websiteName: yup.string().required("Website Name is required"),
  defaultCurrency: yup.string().required("Default Currency is required"),
  logoUrl: yup.string().required("Logo is required"),
  logoDarkUrl: yup.string().required("Dark Mode Logo is required"),
  faviconUrl: yup.string().required("Favicon URL is required"),
  websiteDescription: yup.string().optional(),
  websiteTagline: yup.string().optional(),
  theme: themeSchema.optional(),
  logo: yup.mixed().optional(),
  logoDark: yup.mixed().optional(),
  favicon: yup.mixed().optional(),
});

function AdminSettings() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = React.useState(0);

  const hasPermissionToUpdate = usePermission("SETTINGS_UPDATE");

  const { setting, isLoading } = useSelector((state: AppState) => ({
    setting: state.setting.data,
    isLoading: state.setting.isLoading,
  }));

  const methods = useForm<TSettingInputs>({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (setting) {
      setValue("websiteName", setting.websiteName);
      setValue("defaultCurrency", setting.defaultCurrency);
      setValue("logoUrl", setting.logoUrl);
      setValue("logoDarkUrl", setting.logoDarkUrl);
      setValue("faviconUrl", setting.faviconUrl);
      setValue("websiteDescription", setting.websiteDescription);
      setValue("websiteTagline", setting.websiteTagline);
      setValue(
        "theme.primaryColor",
        setting.theme?.primaryColor ?? theme.palette.primary.main
      );
      setValue(
        "theme.secondaryColor",
        setting.theme?.secondaryColor ?? theme.palette.secondary.main
      );
      setValue(
        "theme.infoColor",
        setting.theme?.infoColor ?? theme.palette.info.main
      );
      setValue(
        "theme.warningColor",
        setting.theme?.warningColor ?? theme.palette.warning.main
      );
      setValue(
        "theme.successColor",
        setting.theme?.successColor ?? theme.palette.success.main
      );
      setValue(
        "theme.errorColor",
        setting.theme?.errorColor ?? theme.palette.error.main
      );
    }
  }, [setting]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onSubmit = (data: TSettingInputs) => {
    if (setting) {
      const formData = new FormData();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          const typedKey = key as keyof TSettingInputs;
          formData.append(
            typedKey,
            typedKey === "theme"
              ? JSON.stringify(data[typedKey])
              : data[typedKey]
          );
        }
      }
      dispatch(
        updateWebsietSetting({ settingId: setting._id, data: formData })
      );
    }
  };

  return (
    <Container>
      <Typography variant="h6">Settings</Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 4 }} />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          {TABS.map((tab, index) => {
            return <Tab key={index} label={tab.label} />;
          })}
        </Tabs>
      </Box>
      <FormProvider {...methods}>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ padding: "1rem" }}
          encType="multipart/form-data"
        >
          {TABS.map((tab, index) => {
            return tabValue === index ? (
              <Box key={index}>
                {<tab.Component isDisabled={!hasPermissionToUpdate} />}
              </Box>
            ) : null;
          })}
          <Box sx={{ marginTop: 6, float: "right" }}>
            <LoadingButton
              title={
                hasPermissionToUpdate ? "Save Changes" : "Not Enough Permission"
              }
              color="primary"
              isLoading={isLoading}
              isDisabled={!hasPermissionToUpdate}
            />
          </Box>
        </Box>
      </FormProvider>
    </Container>
  );
}

export default AdminSettings;
