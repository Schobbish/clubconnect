import { setupWorker } from "msw";
import { getCategories } from "./api/getCategories";
import { getClub } from "./api/getClub";
import { searchClubs } from "./api/searchClubs";

// add more handlers in the args of setupWorker
export const worker = setupWorker(getCategories, getClub, searchClubs);
