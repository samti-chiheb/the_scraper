"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";

const TaskMenu = () => {
  return (
    <aside className="w-[340px] min-w-[340-px] max-w-[340px] border-r-2 border-separate p-2 h-full px-4 overflow-auto  ">
      <Accordion
        type="multiple"
        className="w-full "
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;

const TaskMenuBtn = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];

  const handleDragStart = (e: React.DragEvent) => {
    if (!e.dataTransfer) {
      throw new Error("DragEvent is missing the dataTransfer property.");
    }

    e.dataTransfer?.setData("application/reactflow", taskType);
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <Button
      variant={"secondary"}
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(e) => handleDragStart(e)}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
};
