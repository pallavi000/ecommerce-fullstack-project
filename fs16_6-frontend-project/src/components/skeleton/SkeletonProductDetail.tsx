// @mui
import { Grid, Skeleton, GridProps, Divider, Box } from "@mui/material";

export default function SkeletonProductDetail({ ...props }: GridProps) {
  return (
    <Grid container spacing={6} {...props}>
      <Grid item xs={12} md={6} lg={6}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={"500px"}
          sx={{ borderRadius: 2 }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} width={100} />
        <Skeleton variant="text" height={40} width={300} />
        <Skeleton variant="text" height={40} width={200} />
        <Skeleton variant="text" height={40} width={90} />
        <Divider sx={{ margin: "1rem 0 3rem 0rem" }} />
        <Grid container spacing={3} columns={12} marginTop={"2rem"}>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" height={60} width={"100%"} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" height={60} width={"100%"} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
