import { setupWorker } from "msw";
import { helloWorld } from "./api/helloWorld";

// add more handlers in the args of setupWorker
export const worker = setupWorker(helloWorld);
