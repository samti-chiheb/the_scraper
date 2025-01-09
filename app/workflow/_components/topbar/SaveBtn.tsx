"use client";

import { UpdateWorflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

const SaveBtn = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "save-workflow" });
    },
  });

  const handleOnClick = () => {
    const workflowDefinition = JSON.stringify(toObject());
    toast.loading("saving workflow ...", { id: "save-workflow" });
    saveMutation.mutate({
      id: workflowId,
      definition: workflowDefinition,
    });
  };

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={handleOnClick}
      disabled={saveMutation.isPending}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
};

export default SaveBtn;
