import { atom } from "recoil";

export const sectionState = atom({
  key: "section",
  default: "RANGE",
});

export const numberState = atom({
  key: "number",
  default: [],
});

export const rangeState = atom({
  key: "range",
  default: 0,
});

export const categoryState = atom({
  key: "category",
  default: {
    mean: 0,
    word: 0,
    page: 1,
  },
});

export const dbWordList = atom({
  key: "dbWord",
  default: [],
});

export const meanListState = atom({
  key: "meanList",
  default: [],
});

export const wordListState = atom({
  key: "wordList",
  default: [],
});
