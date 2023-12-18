import React from "react";
import { ColorVariant } from "./theme";

export type TDashboardMainCard = {
  title: string;
  color: ColorVariant;
  total: number | string;
  icon: React.ReactNode;
};

export type TBlogPostNews = {
  id: number;
  title: string;
  description: string;
  image: string;
  postedAt: string;
};

export type TVistorsBySite = {
  name: string;
  value: number;
  icon: React.ReactNode;
};
