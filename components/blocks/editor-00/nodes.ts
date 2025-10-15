import { AutocompleteNode } from "@/components/editor/nodes/autocomplete-node";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical";

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
  ];
