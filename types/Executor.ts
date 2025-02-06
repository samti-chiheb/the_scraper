import { Browser } from "puppeteer";

export type Environement = {
  browser?: Browser;
  // phases with phaseId as key
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};
