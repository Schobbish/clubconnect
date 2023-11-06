import { setupWorker } from "msw";
import { getClub } from "./api/getClub";
import { getTopClubs } from "./api/getTopClubs";
import { searchClubs } from "./api/searchClubs";
import { getCategories } from "./api/getCategories";

// add more handlers in the args of setupWorker
export const worker = setupWorker(
  getCategories,
  getClub,
  getTopClubs,
  searchClubs
);
