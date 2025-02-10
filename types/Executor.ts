import { Browser } from "puppeteer";

export type Environement = {
  browser?: Browser;
  // phases with nodeId/taskId as key
  phases: Record<
    string, // nodeId/taskId
    {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    }
  >;
};
