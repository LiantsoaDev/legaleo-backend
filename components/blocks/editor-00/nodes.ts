import { AutocompleteNode } from "@/components/editor/nodes/autocomplete-node";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import { DynamicParagraphNode } from "@/components/Editor/DynamiqueParagraphNode";
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical";
import { DynamicFieldNode } from "./DynamicFieldNode";

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    AutoLinkNode,
    LinkNode,
    AutocompleteNode,
    TableNode,
    TableRowNode,
    TableCellNode,
    DynamicFieldNode,
    DynamicParagraphNode,
  ];
