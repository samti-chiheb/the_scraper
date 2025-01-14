import { AppNode } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

type FlowToExecutinPlan = {
  executionPlan?: WorkflowExecutionPlan;
};

export const FlowToExecutinPlan = (
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutinPlan => {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    throw new Error("TODO : Handle this error");
  }

  const planned = new Set<string>();

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // node allready in the execution plan
        continue;
      }

      const invalideInputs = getInvalideInputs(currentNode, edges, planned);

      if (invalideInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);

        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // if all incomers are planned and there are still invalid inputs this means that this particular node has an invalid input wich means that the workflow is invalid

          console.error("invalid inputs", currentNode.id, invalideInputs);
          throw new Error("TODO: handle error 1");
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }

    executionPlan.push(nextPhase);
  }

  return { executionPlan };
};

const getInvalideInputs = (
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
) => {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const isInputValueProvided = inputValue?.length > 0;

    if (isInputValueProvided) {
      // this input is fine
      continue;
    }

    // if a value is not provided by user check if there is an output linked to the current input
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const isRequiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (isRequiredInputProvidedByVisitedOutput) {
      // input is required and have valid value provided by the task that is allready planned
      continue;
    } else if (!input.required) {
      // if the input is not required but there is an output linked to it than wen eed to be sure that the output is allready plnned
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // the output is providing a value to the input : the input is valid
        continue;
      }
    }

    invalidInputs.push(input.name);
  }

  return invalidInputs;
};
