// app/page.tsx
"use client";

import { useState } from "react";
import DynamicGoogleDocsEditor from "./GoogleEditor";

export default function Editor() {
  const [savedContent, setSavedContent] = useState("");

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <DynamicGoogleDocsEditor
          initialData={`<h2>Chapter 1, The History</h2>
<p>The city, a kaleidoscope of digital billboards and holographic projections, is in a state of perpetual twilight, casting an ethereal glow on its inhabitants.</p>
<p>X_AE_B-22’s mission is to locate the source of a mysterious signal that has been disrupting the neural networks of both humans and synthetics alike. This signal, rumored to be the work of a rogue faction known as the Shadow Code, has the potential to rewrite the very fabric of consciousness.</p>
<p>X_AE_B-22’s pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned cyber-labs hide secrets long buried by time. Each step forward unravels more of the intricate web spun by the Shadow Code, revealing a plot to seize control of the entire megacity.</p>
<p>Amidst the neon-lit chaos, X_AE_B-22 encounters a diverse cast of allies and adversaries, each with their own agendas and secretss. There is Lunas, a rebellious hacker with a vendetta against the megacorporations, and Kyro, a seasoned detective with a cybernetic arm who has seen too much in his lifetime.</p>`}
          autoSave={true}
          documentTitle="Mon Document Premium"
        />
      </div>
    </main>
  );
}
