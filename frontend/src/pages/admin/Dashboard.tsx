import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// components
import DashboardCardWidget from "../../components/admin/dashboard/DashboardCardWidget";
import BlogpostCard from "../../components/admin/dashboard/BlogpostCard";
import VisitorBySiteCard from "../../components/admin/dashboard/VisitorBySiteCard";

// icons
import {
  AccountBox,
  ArrowForward,
  Facebook,
  Google,
  LinkedIn,
  Money,
  ShoppingBag,
  ShoppingCart,
  Twitter,
} from "@mui/icons-material";

// types
import {
  TBlogPostNews,
  TDashboardMainCard,
  TVistorsBySite,
} from "../../@types/dashboard";

//helper
import withPermission from "../../context/withPermission";

// data
const cards: TDashboardMainCard[] = [
  {
    title: "Total Products",
    color: "primary",
    total: 100,
    icon: <ShoppingBag />,
  },
  {
    title: "New Customers",
    color: "info",
    total: 100,
    icon: <AccountBox />,
  },
  {
    title: "Total Orders",
    color: "warning",
    total: 100,
    icon: <ShoppingCart />,
  },
  { title: "Total Income", color: "error", total: "$100", icon: <Money /> },
];
const sites: TVistorsBySite[] = [
  {
    name: "Facebook",
    value: 323234,
    icon: <Facebook sx={{ color: "#1877F2" }} width={32} />,
  },
  {
    name: "Google",
    value: 341212,
    icon: <Google sx={{ color: "#DF3E30" }} width={32} />,
  },
  {
    name: "Linkedin",
    value: 411213,
    icon: <LinkedIn sx={{ color: "#006097" }} width={32} />,
  },
  {
    name: "Twitter",
    value: 443232,
    icon: <Twitter sx={{ color: "#1C9CEA" }} width={32} />,
  },
];
const newsLists: TBlogPostNews[] = [...Array(5)].map((_, index) => ({
  id: Math.floor(Math.random() * 1000),
  title: "Blog Post Title",
  description: "Blog Post Description",
  image: "/images/img1.png",
  postedAt: "about 5 hours ago",
}));

function Dashboard() {
  const user = useSelector((state: AppState) => state.auth.user);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back, {user?.firstName} {user?.lastName}
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => {
          return (
            <Grid key={card.title} item xs={12} sm={6} md={3}>
              <DashboardCardWidget
                title={card.title}
                total={card.total}
                color={card.color}
                icon={card.icon}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} md={6} lg={8} marginTop={8}>
          <Card>
            <CardHeader title={"Blog Posts"} subheader={"feature blog posts"} />
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
              {newsLists.map((news) => (
                <BlogpostCard key={news.id} news={news} />
              ))}
            </Stack>
            <Divider />
            <Box sx={{ p: 2, textAlign: "right" }}>
              <Button size="small" color="inherit" endIcon={<ArrowForward />}>
                View all
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4} marginTop={8}>
          <Card>
            <CardHeader
              title={"Traffic by Site"}
              subheader={"list of visitors from other sites"}
            />
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {sites.map((site) => (
                  <VisitorBySiteCard key={site.name} site={site} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPermission(Dashboard, "DASHBOARD_READ");
