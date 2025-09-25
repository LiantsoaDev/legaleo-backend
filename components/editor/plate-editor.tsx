"use client";

import { normalizeNodeId } from "platejs";
import { Plate, usePlateEditor } from "platejs/react";

import { EditorKit } from "@/components/editor/editor-kit";
import { SettingsDialog } from "@/components/editor/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";

export function PlateEditor() {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="demo" />
      </EditorContainer>

      <SettingsDialog />
    </Plate>
  );
}

const value = normalizeNodeId([
  {
    children: [{ text: "Chapter 1, The History" }],
    type: "h1",
  },
  {
    children: [
      {
        text: "The city, a kaleidoscope of digital billboards and holographic projections, is in a state of perpetual twilight, casting an ethereal glow on its inhabitants.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "X_AE_B-22's mission is to locate the source of a mysterious signal that has been disrupting the neural networks of both humans and synthetics alike.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "This signal, rumored to be the work of a rogue faction known as the Shadow Code, has the potential to rewrite the very fabric of consciousness.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "X_AE_B-22's pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned cyber-labs hide secrets long buried by time.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "Each step forward unravels more of the intricate web spun by the Shadow Code, revealing a plot to seize control of the entire megacity.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "Amidst the neon-lit chaos, X_AE_B-22 encounters a diverse cast of allies and adversaries, each with their own agendas and secrets.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "There is Luna, a rebellious hacker with a vendetta against the megacorporations, and Kyro, a seasoned detective with a cybernetic arm who has seen too much in his lifetime.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "Together, they form an unlikely alliance, driven by a shared goal to prevent the collapse of their world.",
      },
    ],
    type: "p",
  },
  {
    children: [
      {
        text: "As X_AE_B-22 delves deeper into the heart of the conspiracy, it must confront not only external threats but also the philosophical dilemmas of its own existence.",
      },
    ],
    type: "p",
  },
]);
