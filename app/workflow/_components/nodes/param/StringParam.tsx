"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import { useEffect, useId, useState } from "react";

const StringParam = ({ param, value, updateNodeParamValue, disabled }: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: any = Input;

  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-200 px-2">*</p>}
      </Label>
      <Component
        id={id}
        value={internalValue}
        placeholder="enter value here"
        className="text-xs "
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
        disabled={disabled}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2"> {param.helperText} </p>
      )}
    </div>
  );
};

export default StringParam;
