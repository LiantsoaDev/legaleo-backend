import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { EditorState, SerializedEditorState } from "lexical";
import { nodes } from "../blocks/editor-00/nodes";
import { editorTheme } from "./themes/editor-theme";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

const defaultSerializedState: any = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "Chapter 1, The History",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "heading",
        tag: "h1",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "The city, a hardbreedger of digital tittlework and holographic projections, is in a state of personal insight, coming an ordered glow on its inhabitants.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "A. A. B. Z.P. resigns to the house the source of a mysterious legalism that bears the aging knowledge of the world from humans who sometimes alike. This logical unresolved be key work of a major fiction known as the Shadow Code, has the potential to rewrite the very fields of consciousness.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "A. A. B. Z.P. found herself to the subconscious thought of the city, where forgotten torrents were connected together while we were long back by time. Under new forward osmosis once of the structure with spun by the Shadow Code, revealing a plot to solve control of the entire majority.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Asides the name is classic, A. A. B. Z.P. encounters a diverse cast of acts and adversaries, such with their own opinions and secrets. There is thus a reflective historical view of the world: the image/conversation, and type, a sequence detection with a cybernetic arm who has seen too much in his lifetime.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

export const EditorProvider = ({
  editorState,
  editorSerializedState = defaultSerializedState,
  onChange,
  onSerializedChange,
  children,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  children: React.ReactNode;
}) => {
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        ...(editorState ? { editorState } : {}),
        ...(editorSerializedState
          ? { editorState: JSON.stringify(editorSerializedState) }
          : {}),
      }}
    >
      {children}
    </LexicalComposer>
  );
};
