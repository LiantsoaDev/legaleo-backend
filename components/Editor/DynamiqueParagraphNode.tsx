// components/editor/nodes/DynamicParagraphNode.tsx
import { DecoratorNode, LexicalEditor, NodeKey } from "lexical";
import * as React from "react";

// Composant React affiché dans l'éditeur (decorator)
function DynamicParagraphComponent({
  contenu,
  clauseId,
  onChange,
}: {
  contenu: string;
  clauseId: string;
  onChange?: (newValue: string) => void;
}) {
  const [value, setValue] = React.useState(contenu ?? "");

  React.useEffect(() => {
    setValue(contenu ?? "");
  }, [contenu]);

  return (
    <div className="my-2 p-2 border border-[#E3E3E3] rounded-sm shadow-xs px-5 py-6 flex  flex-col gap-2.5">
      <label className="bg-[#FACC151A] py-1.5 px-2.5 w-fit font-semibold text-sm text-[#D3AA05] ">
        {clauseId}
      </label>
      <textarea
        className="w-full text-base border-none bg-transparent resize-none outline-none"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
}

export type SerializedDynamicParagraph = {
  type: "dynamic-paragraph";
  version: 1;
  contenu: string;
  clauseId: string;
};

export class DynamicParagraphNode extends DecoratorNode<React.JSX.Element> {
  __contenu: string;
  __clauseId: string;

  // IMPORTANT : fournir des valeurs par défaut pour éviter l'erreur
  constructor(contenu: string = "", clauseId: string = "", key?: NodeKey) {
    super(key);
    this.__contenu = contenu;
    this.__clauseId = clauseId;
  }

  static getType(): string {
    return "dynamic-paragraph";
  }

  static clone(node: DynamicParagraphNode) {
    return new DynamicParagraphNode(
      node.__contenu,
      node.__clauseId,
      node.__key
    );
  }

  // Sérialisation (export) pour que Lexical puisse sauvegarder le node
  exportJSON(): SerializedDynamicParagraph {
    return {
      type: "dynamic-paragraph",
      version: 1,
      contenu: this.__contenu,
      clauseId: this.__clauseId,
    };
  }

  // Désérialisation (import) : comment recréer le node depuis JSON
  static importJSON(serialized: SerializedDynamicParagraph) {
    const { contenu = "", clauseId = "" } = serialized;
    return new DynamicParagraphNode(contenu, clauseId);
  }

  // Méthode utilitaire pour mettre à jour le contenu du node (via editor.update)
  setContenu(newValue: string) {
    const writable = this.getWritable() as DynamicParagraphNode;
    writable.__contenu = newValue;
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    return div;
  }

  updateDOM(): boolean {
    // Nous laissons React gérer le rendu via decorate
    return false;
  }

  decorate(editor: LexicalEditor): React.JSX.Element {
    return (
      <DynamicParagraphComponent
        contenu={this.__contenu}
        clauseId={this.__clauseId}
        onChange={(newVal) => {
          // Mise à jour du contenu du node dans l'arbre Lexical
          editor.update(() => {
            const node = this.getWritable() as DynamicParagraphNode;
            node.__contenu = newVal;
            // Optionnel : trigger autres effets (sauvegarde, API...) ici ou via observer
          });
        }}
      />
    );
  }
}
