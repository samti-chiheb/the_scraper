"use client";

import useExecutionPlan from "@/hooks/workflow/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("workflow executed", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("something went wrong", { id: "flow-execution" });
    },
  });

  const handleClick = () => {
    const plan = generate();
    if (!plan) {
      return;
    }
    mutation.mutate({workflowId: workflowId, flowDefinition: JSON.stringify(toObject())});
  };

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
