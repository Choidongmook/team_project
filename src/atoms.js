import { atom } from "recoil";

export const sectionState = atom({
  key: "section",
  default: "RANGE",
});

export const numberState = atom({
  key: "number",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: {
    mean: 0,
    word: 0,
  },
});
