"use client";

import useFlowValidation from "@/components/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { ReactNode } from "react";

const NodeCard = ({
  children,
  nodeId,
  isSelected,
}: {
  nodeId: string;
  children: ReactNode;
  isSelected: boolean;
}) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some(
    (input) => input.nodeId === nodeId
  );

  const handleDoubleClick = () => {
    const node = getNode(nodeId);

    if (!node?.position || !node?.measured) return;

    const { x, y } = node.position;
    const { width, height } = node.measured;

    if (x == null || y == null || width == null || height == null) return;

    setCenter(x + width / 2, y + height / 2, {
      zoom: 1.2,
      duration: 500,
    });
  };

  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
      onDoubleClick={handleDoubleClick}
    >
      {children}
    </div>
  );
};

export default NodeCard;
