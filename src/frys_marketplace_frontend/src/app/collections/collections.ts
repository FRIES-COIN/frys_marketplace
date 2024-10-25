import collection1 from "../../../public/collection1.png";
import collection2 from "../../../public/collection2.png";
import collection3 from "../../../public/collection3.png";
import collection4 from "../../../public/collection4.png";
import collection5 from "../../../public/collection5.png";
import collection6 from "../../../public/collection6.png";

export interface ICollection {
  id: string;
  likes: number;
  expiresIn: string;
  name: string;
  number: number;
  price: number;
  stock: number;
  image: string;
}

export const collections: ICollection[] = [
  {
    id: "1",
    likes: 22,
    expiresIn: "3h:15m:20s",
    name: "CloneF",
    number: 1123,
    price: 2.115,
    stock: 99,
    image: collection1,
  },
  {
    id: "2",
    likes: 17,
    expiresIn: "3h:15m:20s",
    name: "CloneF",
    number: 1147,
    price: 2.115,
    stock: 99,
    image: collection2,
  },
  {
    id: "3",
    likes: 12,
    expiresIn: "3h:15m:20s",
    name: "CloneF",
    number: 1117,
    price: 2.115,
    stock: 99,
    image: collection3,
  },
  {
    id: "4",
    likes: 28,
    expiresIn: "3h:15m:20s",
    name: "CloneF",
    number: 1047,
    price: 2.115,
    stock: 99,
    image: collection4,
  },
  {
    id: "5",
    likes: 10,
    expiresIn: "3h:15m:20s",
    name: "CloneF",
    number: 1337,
    price: 2.115,
    stock: 99,
    image: collection5,
  },
  {
    id: "6",
    likes: 16,
    expiresIn: "3h:15m:20s",
    name: "CloneF",
    number: 1789,
    price: 2.115,
    stock: 99,
    image: collection6,
  },
];
