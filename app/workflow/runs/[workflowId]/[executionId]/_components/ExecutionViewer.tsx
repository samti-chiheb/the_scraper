"use client";

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import { ReactNode } from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (query) =>
      query.state.data?.status === WorkflowExecutionStatus.RUNNING
        ? 1000
        : false,
  });

  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px]  min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden ">
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.status}
          />

          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <span className="lowerCase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />

          <ExecutionLabel icon={ClockIcon} label="Duration" value={"TODO"} />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value={"TODO"}
          />
        </div>
        <Separator />
        <div className="">
          <div className="">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80"/>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;

const ExecutionLabel = ({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) => {
  const Icon = icon;
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm ">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
};
