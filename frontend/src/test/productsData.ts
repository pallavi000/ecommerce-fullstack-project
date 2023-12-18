import { TProduct } from "../@types/product";

export const productsData: TProduct[] = [
  {
    _id: "540",
    name: "Люк класс шузы",
    price: 10,
    stock: 100,
    description: "носят тотлько не гомосекчуалисты и undefined",
    image:
      "https://disgustingmen.com/wp-content/uploads/2016/03/radial-1024x509.png",

    createdAt: "2023-10-04T08:39:27.000Z",
    updatedAt: "2023-10-04T08:39:27.000Z",
    category: {
      _id: "27",
      name: "Ishake",
      image: "https://placeimg.com/640/480/any",
    },
    size: {
      _id: "1",
      name: "large",
    },
  },
  {
    _id: "541",
    name: "Раб для вас",
    price: 100,
    stock: 100,
    description: "Сделает все,но некторое только с доплатой",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/bc/Kenyan_man_2.jpg",

    createdAt: "2023-10-04T08:41:15.000Z",
    updatedAt: "2023-10-04T08:41:15.000Z",
    category: {
      _id: "27",
      name: "Ishake",
      image: "https://placeimg.com/640/480/any",
    },
    size: {
      _id: "1",
      name: "large",
    },
  },
];
