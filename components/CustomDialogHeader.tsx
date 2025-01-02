"use client";
import React from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface Props {
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;

  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}
const CustomDialogHeader = (props: Props) => {
  const {
    icon : Icon,
    title,
    subtitle,
    iconClassName,
    titleClassName,
    subtitleClassName,
  } = props;

  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && (
            <Icon size={30} className={cn("stroke-primary", iconClassName)} />
          )}
          {title && (
            <p className={cn("text-xl text-primary", titleClassName)}>
              {title}
            </p>
          )}
          {subtitle && (
            <p
              className={cn("text-sm text-muted-foreground", subtitleClassName)}
            >
              {subtitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
