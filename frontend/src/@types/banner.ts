export type TBanner = {
  _id: string;
  image: string;
  position: string;
  page: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BannerInputs = {
  image: string;
  position: string;
  page: string;
};
