"use client";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "../../../../types/task";
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, Copy, GripVerticalIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { AppNode } from "@/types/appNode";

const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) => {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();

  const handleDelete = () => {
    deleteElements({
      nodes: [{ id: nodeId }],
    });
  };

  const handleCopy = () => {
    const node = getNode(nodeId) as AppNode;
    const newX = node.position.x;
    const newY = node.position.y + node.measured?.height! + 20;
    const newNode = CreateFlowNode(node.data.type, {
      x: newX,
      y: newY,
    });
    addNodes([newNode]);
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground ">
          {task.label}
        </p>
        <div className="flex gap-2 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="flex items-center gap-2 text-xs ">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button variant={"ghost"} size={"icon"} onClick={handleDelete}>
                <TrashIcon size={12} />
              </Button>
              <Button variant={"ghost"} size={"icon"} onClick={handleCopy}>
                <Copy size={12} />
              </Button>
            </>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            {" "}
            <GripVerticalIcon size={20} />{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
