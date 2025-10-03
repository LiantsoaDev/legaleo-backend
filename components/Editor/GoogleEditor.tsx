"use client";

import { TocItem } from "@/app/(page)/projets/[id]/layout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  BlockQuote,
  Bold,
  Code,
  DecoupledEditor,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontSize,
  Heading,
  Image,
  Indent,
  Italic,
  Link,
  PageBreak,
  Paragraph,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  Underline,
} from "ckeditor5";
import { FormatPainter, TableOfContents } from "ckeditor5-premium-features";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import "ckeditor5/ckeditor5.css";
import { useCallback, useEffect, useRef, useState } from "react";

const licence_key = process.env.CK_EDITOR_SECRET_KEY;

interface GoogleDocsEditorProps {
  initialData?: string;
  onSave?: (data: string) => void;
  autoSave?: boolean;
  documentTitle?: string;
  onHeadingsChange?: (headings: TocItem[]) => void;
}

export const GoogleDocsEditor = ({
  initialData = "<p>Hello from CKEditor 5 in React!</p>",
  onSave,
  autoSave = false,
  documentTitle = "Document sans titre",
  onHeadingsChange,
}: GoogleDocsEditorProps) => {
  const [editorData, setEditorData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const editorRef = useRef<any>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Fonction pour extraire les titres et notifier le parent ---
  const extractHeadings = useCallback(
    (editor: any) => {
      const data = editor.getData();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // Sélectionner tous les titres (h1 à h6)
      const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const newTocItems: TocItem[] = [];

      headings.forEach((heading) => {
        // Nous nous basons sur l'ID que CKEditor est configuré pour ajouter
        const id = heading.id;
        if (!id) return;

        const level = parseInt(heading.tagName.replace("H", ""), 10);

        newTocItems.push({
          id: id,
          text: heading.textContent || "",
          level: level,
        });
      });

      // Envoi des titres au Layout parent
      if (onHeadingsChange) {
        onHeadingsChange(newTocItems);
      }
    },
    [onHeadingsChange]
  );

  const editorConfiguration = {
    licenseKey:
      "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjA0ODYzOTksImp0aSI6ImM3ZDdlNmJmLWZhNGYtNDYyYi1hNzA1LTUxMGU1NWMwYTA1MSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImY5NjNiMjkxIn0.F_R-7TvYVN_ZESiQHUUMN_qkAseE1UBnvUEb18gPIQOUXzRolAhyB-qQMQXYIGmIRJBNf35nnpGmc6luYqqkDw",
    plugins: [
      Essentials,
      Heading,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Subscript,
      Superscript,
      FontSize,
      FontColor,
      FontBackgroundColor,
      Alignment,
      Indent,
      Link,
      BlockQuote,
      Table,
      Image,
      Code,
      FormatPainter,
      PageBreak,
      TableOfContents,
    ],
    toolbar: [
      "undo",
      "redo",
      "|",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
      "|",
      "alignment",
      "|",
      "indent",
      "|",
      "link",
      "blockQuote",
      "insertTable",
      "uploadImage",
      "code",
      "|",
      "formatPainter",
      "pageBreak",
      "tableOfContents",
    ],
    menuBar: {
      isVisible: false,
    },
    initialData: initialData,
  };

  useEffect(() => {
    if (autoSave && editorData !== initialData && isEditing) {
      const timeoutId = setTimeout(() => {
        handleSave();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [editorData, autoSave, isEditing]);

  const handleReady = (editor: any) => {
    editorRef.current = editor;

    // Insertion de la toolbar dans notre container personnalisé
    if (toolbarRef.current) {
      toolbarRef.current.appendChild(editor.ui.view.toolbar.element);
    }

    // Écouteur pour les changements de contenu
    editor.model.document.on("change:data", () => {
      const data = editor.getData();
      setEditorData(data);
      setIsEditing(true);

      // Calcul des statistiques basique
      const textContent = editor.getData().replace(/<[^>]*>/g, "");
      setCharacterCount(textContent.length);
      setWordCount(
        textContent.trim() ? textContent.trim().split(/\s+/).length : 0
      );
    });
  };

  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onSave && editorData !== initialData) {
      onSave(editorData);
    }
    setLastSaved(new Date());
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (isEditing && !autoSave) {
      handleSave();
    }
  };

  const handleShare = () => {
    // Implémentation basique du partage
    if (navigator.share) {
      navigator.share({
        title: documentTitle,
        text: "Check out this document",
        url: window.location.href,
      });
    } else {
      // Fallback pour copier le lien
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header style Google Docs */}

      {/* Toolbar container */}
      <div
        ref={toolbarRef}
        className="border-b border-gray-200 bg-white sticky top-0 z-10 px-4 py-2"
      />

      {/* Editor container */}
      <div
        ref={containerRef}
        className="px-16 py-8 bg-white min-h-screen relative"
        onBlur={handleBlur}
      >
        <div className="max-w-3xl mx-auto">
          <CKEditor
            editor={DecoupledEditor}
            config={editorConfiguration}
            onReady={handleReady}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-2 flex justify-between items-center text-sm text-gray-500">
        <div ref={containerRef} className="flex space-x-4">
          {/* Les statistiques CKEditor seront injectées ici */}
        </div>
      </div>
    </div>
  );
};

// Version avec chargement conditionnel pour éviter les problèmes SSR
export default function DynamicGoogleDocsEditor(props: GoogleDocsEditorProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="px-16 py-8 bg-white min-h-[600px]">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return <GoogleDocsEditor {...props} />;
}
