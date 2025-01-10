"use client";

import { ParamProps } from "@/types/appNode";

const BrowserInstanceParam = ({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) => {
  return <p className="text-xs ">{param.name}</p>;
};

export default BrowserInstanceParam;