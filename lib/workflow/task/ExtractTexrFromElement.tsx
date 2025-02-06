import { TaskParamType, TaskType } from "@/types/task";
import { WorkFlowTask } from "@/types/workflow";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTexrFromElement = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-pink-400 " {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [{ name: "Extracted text", type: TaskParamType.STRING }],
} satisfies WorkFlowTask;
