import { DecoratorNode } from "lexical";
import * as React from "react";

type MentionProps = { name: string };

function MentionComponent({ name }: MentionProps) {
  return (
    <span className="bg-[#E6F2F2] text-[#087F83] font-semibold rounded px-1">
      @{name}
    </span>
  );
}

export class MentionNode extends DecoratorNode<React.JSX.Element> {
  __name: string;

  static getType(): string {
    return "mention";
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__name, node.__key);
  }

  constructor(name: string, key?: string) {
    super(key);
    this.__name = name;
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): React.JSX.Element {
    return <MentionComponent name={this.__name} />;
  }
}

export function $createMentionNode(name: string): MentionNode {
  return new MentionNode(name);
}

export function $isMentionNode(node: any): node is MentionNode {
  return node instanceof MentionNode;
}
