import { TProduct } from "../../@types/product";

export const productsData: TProduct[] = [
  {
    _id: "8",
    name: "nuevo name",
    price: 987,
    stock: 100,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      _id: "5",
      name: "Others",
      image: "https://placeimg.com/640/480/any?r=0.591926261873231",
    },
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",

    size: {
      _id: "1",
      name: "large",
    },
  },
  {
    _id: "9",
    name: "Bespoke Wooden Shirt",
    price: 551,
    stock: 100,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      _id: "5",
      name: "Others",
      image: "https://placeimg.com/640/480/any?r=0.591926261873231",
    },
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",

    size: {
      _id: "1",
      name: "large",
    },
  },
  {
    _id: "10",
    name: "Gorgeous Soft Hat",
    price: 635,
    stock: 100,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      _id: "5",
      name: "Others",
      image: "https://placeimg.com/640/480/any?r=0.591926261873231",
    },
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",

    size: {
      _id: "1",
      name: "large",
    },
  },
];
