import livesale1 from "../../../public/livesale1.svg";
import livesale2 from "../../../public/livesale2.svg";
import livesale3 from "../../../public/livesale3.svg";
import avatar1 from "../../../public/avatar1.svg";
import avatar2 from "../../../public/avatar2.svg";
import avatar3 from "../../../public/avatar3.svg";
import avatar4 from "../../../public/avatar4.svg";

export interface NFT {
  id: number;
  name: string;
  price: number;
  image: string;
  avatars: Avatar[];
  description: string;
  chef: string;
}

export interface Avatar {
  id: number;
  name: string;
  image: string;
  designation: string;
}

export const nfts: NFT[] = [
  {
    id: 1,
    name: "Sauce",
    price: 2,
    image: livesale1,
    avatars: [
      {
        id: 1,
        name: "SkipperGee",
        image: avatar1,
        designation: "Chef",
      },
      {
        id: 2,
        name: "ConorMG",
        image: avatar2,
        designation: "XXLChef",
      },
      {
        id: 3,
        name: "LennyPink",
        image: avatar3,
        designation: "mini-Chef",
      },
      {
        id: 4,
        name: "ToomuchLag",
        image: avatar4,
        designation: "Sauce master",
      },
    ],
    description:
      "This card is for some special elements, like displaying background gifs on hover only.",
    chef: "ToomuchLag",
  },
  {
    id: 1,
    name: "Sauce",
    price: 2,
    image: livesale2,
    avatars: [
      {
        id: 1,
        name: "SkipperGee",
        image: avatar1,
        designation: "Chef",
      },
      {
        id: 2,
        name: "ConorMG",
        image: avatar2,
        designation: "XXLChef",
      },
      {
        id: 3,
        name: "LennyPink",
        image: avatar3,
        designation: "mini-Chef",
      },
      {
        id: 4,
        name: "ToomuchLag",
        image: avatar4,
        designation: "Sauce master",
      },
    ],
    description:
      "This card is for some special elements, like displaying background gifs on hover only.",
    chef: "ToomuchLag",
  },
  {
    id: 1,
    name: "Burger",
    price: 3,
    image: livesale3,
    avatars: [
      {
        id: 1,
        name: "SkipperGee",
        image: avatar1,
        designation: "Chef",
      },
      {
        id: 2,
        name: "ConorMG",
        image: avatar2,
        designation: "XXLChef",
      },
      {
        id: 3,
        name: "LennyPink",
        image: avatar3,
        designation: "mini-Chef",
      },
      {
        id: 4,
        name: "ToomuchLag",
        image: avatar4,
        designation: "Sauce master",
      },
    ],
    description:
      "This card is for some special elements, like displaying background gifs on hover only.",
    chef: "Werewanle",
  },
  {
    id: 1,
    name: "Smocha",
    price: 1,
    image: livesale1,
    avatars: [
      {
        id: 1,
        name: "SkipperGee",
        image: avatar1,
        designation: "Chef",
      },
      {
        id: 2,
        name: "ConorMG",
        image: avatar2,
        designation: "XXLChef",
      },
      {
        id: 3,
        name: "LennyPink",
        image: avatar3,
        designation: "mini-Chef",
      },
      {
        id: 4,
        name: "ToomuchLag",
        image: avatar4,
        designation: "Sauce master",
      },
    ],
    description:
      "This card is for some special elements, like displaying background gifs on hover only.",
    chef: "SnipQux",
  },
];
