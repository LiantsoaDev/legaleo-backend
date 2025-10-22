import { DecoratorNode, NodeKey } from "lexical";
import * as React from "react";

type DynamicFieldProps = {
  name: string;
};

function DynamicFieldComponent({ name }: DynamicFieldProps) {
  return (
    <span className="bg-[#0099FF1A] font-semibold text-[#0099FF]">{`${name}`}</span>
  );
}

export class DynamicFieldNode extends DecoratorNode<React.JSX.Element> {
  __name: string;

  static getType() {
    return "dynamic-field";
  }

  static clone(node: DynamicFieldNode) {
    return new DynamicFieldNode(node.__name, node.__key);
  }

  constructor(name: string, key?: NodeKey) {
    super(key);
    this.__name = name;
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    span.className = "dynamic-field";
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.JSX.Element {
    return <DynamicFieldComponent name={this.__name} />;
  }

  exportJSON() {
    return {
      type: "dynamic-field",
      version: 1,
      name: this.__name,
    };
  }

  static importJSON(serializedNode: any): DynamicFieldNode {
    const { name } = serializedNode;
    return new DynamicFieldNode(name);
  }
}

export function $createDynamicFieldNode(name: string): DynamicFieldNode {
  return new DynamicFieldNode(name);
}
