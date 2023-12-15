import React from "react";
import { useNavigate } from "react-router-dom";

//mui
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";

//redux
import { AppState } from "../../redux/store";
import { useSelector } from "react-redux";

function HomeCategories() {
  const navigate = useNavigate();

  // categories state
  const categories = useSelector((state: AppState) => state.categories.data);

  return (
    <>
      {categories.length > 3 ? (
        <Box sx={{ marginBottom: 8 }}>
          <Typography variant="h4" gutterBottom>
            Shop by Category
          </Typography>
          <Grid marginTop={1} container spacing={2}>
            {/* First column */}
            <Grid item xs={4}>
              <Box
                sx={{
                  height: "500px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                component={"div"}
                onClick={() =>
                  navigate(`/category/${categories[0]._id}/products`)
                }
              >
                <Avatar
                  alt={categories[0].name}
                  src={categories[0].image}
                  variant="square"
                  sx={{ width: "100%", height: "500px" }}
                />
                <Paper
                  sx={{
                    width: "fit-content",
                    position: "absolute",
                    bottom: 20,
                    backgroundColor: "white",
                    padding: "0.3rem 2rem",
                    color: "black",
                  }}
                >
                  <Typography variant="subtitle1">
                    {categories[0].name}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            {/* Second column */}
            <Grid item xs>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Box
                    sx={{
                      height: "242px",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    component={"div"}
                    onClick={() =>
                      navigate(`/category/${categories[1]._id}/products`)
                    }
                  >
                    <Avatar
                      alt={categories[1].name}
                      src={categories[1].image}
                      variant="square"
                      sx={{ width: "100%", height: "242px" }}
                    />
                    <Paper
                      sx={{
                        width: "fit-content",
                        position: "absolute",
                        bottom: 20,
                        backgroundColor: "white",
                        padding: "0.3rem 2rem",
                        color: "black",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {categories[1].name}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    component={"div"}
                    onClick={() =>
                      navigate(`/category/${categories[2]._id}/products`)
                    }
                    sx={{
                      height: "242px",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      alt={categories[2].name}
                      src={categories[2].image}
                      variant="square"
                      sx={{ width: "100%", height: "242px" }}
                    />
                    <Paper
                      sx={{
                        width: "fit-content",
                        position: "absolute",
                        bottom: 20,
                        backgroundColor: "white",
                        padding: "0.3rem 2rem",
                        color: "black",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {categories[2].name}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Third column */}
            <Grid item xs={4}>
              <Box
                sx={{
                  height: "500px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                component={"div"}
                onClick={() =>
                  navigate(`/category/${categories[3]._id}/products`)
                }
              >
                <Avatar
                  alt={categories[3].name}
                  src={categories[3].image}
                  variant="square"
                  sx={{ width: "100%", height: "500px" }}
                />
                <Paper
                  sx={{
                    width: "fit-content",
                    position: "absolute",
                    bottom: 20,
                    backgroundColor: "white",
                    padding: "0.3rem 2rem",
                    color: "black",
                  }}
                >
                  <Typography variant="subtitle1">
                    {categories[3].name}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </>
  );
}

export default HomeCategories;
