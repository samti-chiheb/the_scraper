import { Browser } from "puppeteer";
import { WorkFlowTask } from "./workflow";

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

export type ExecutionEnvironment<T extends WorkFlowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
};
