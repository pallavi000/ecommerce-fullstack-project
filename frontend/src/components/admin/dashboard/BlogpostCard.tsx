import React from "react";

// MUI
import { Box, Link, Stack, Typography } from "@mui/material";

// types
import { TBlogPostNews } from "../../../@types/dashboard";

// component props type
type BlogpostCardProps = { news: TBlogPostNews };

function BlogpostCard({ news }: BlogpostCardProps) {
  return (
    <Stack key={news.id} direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={news.title}
        src={news.image}
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          flexShrink: 0,
        }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {news.title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {news.description}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {news.postedAt}
      </Typography>
    </Stack>
  );
}

export default BlogpostCard;
