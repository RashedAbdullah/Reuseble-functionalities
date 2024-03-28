// After making json files  on this folder:

import "server-only";

const languages = {
  en: () => import("./en.json").then((module) => module.default),
  ar: () => import("./ar.json").then((module) => module.default),
  bn: () => import("./bn.json").then((module) => module.default),
};

export const getManageLangs = async (locale) => languages[locale]();
