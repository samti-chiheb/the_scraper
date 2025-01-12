import { WorkFlowTask } from "@/types/workflow";
import { ExtractTexrFromElement } from "./ExtractTexrFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { TaskType } from "@/types/task";

type Registry = {
  [K in TaskType]: WorkFlowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEST_FROM_ELEMENT: ExtractTexrFromElement,
};
