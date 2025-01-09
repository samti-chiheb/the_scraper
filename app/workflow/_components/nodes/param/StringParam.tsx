"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNode";
import { useId, useState } from "react";

const StringParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  return (
    <div className="space-y-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-200 px-2">*</p>}
      </Label>
      <Input
        id={id}
        value={internalValue}
        placeholder="enter value here"
        className="text-xs "
        onBlur={(e) => updateNodeParamValue(e.target.value)}
        onChange={(e) => setInternalValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2"> {param.helperText} </p>
      )}
    </div>
  );
};

export default StringParam;
