import React, { useMemo, useRef, useState } from "react";
import HeaderBar from "./components/HeaderBar.jsx";
import ChordToolbar from "./components/ChordToolbar.jsx";
import LyricsEditor from "./components/LyricsEditor.jsx";
import LyricsPreview from "./components/LyricsPreview.jsx";
import ChordShapes from "./components/ChordShapes.jsx";

function App() {
  const [title, setTitle] = useState("");
  const [singer, setSinger] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [selectedChord, setSelectedChord] = useState("C");
  const editorRef = useRef(null);

  const usedChords = useMemo(() => {
    const set = new Set();
    const regex = /\[([^\]]+)\]/g;
    let m;
    while ((m = regex.exec(lyrics)) !== null) {
      set.add(m[1].trim());
    }
    return Array.from(set);
  }, [lyrics]);

  const handleHeaderChange = ({ title: t, singer: s }) => {
    setTitle(t);
    setSinger(s);
  };

  const insertChord = (ch) => {
    editorRef.current?.insertChordAtCursor(ch);
  };

  const clearChords = () => {
    setLyrics((prev) => prev.replace(/\[[^\]]+\]/g, ""));
  };

  const loadSample = () => {
    setTitle("Shine On");
    setSinger("The Daydreamers");
    setLyrics(
      `Wake up to the [G]light, feel the [D]morning in your [Em]eyes\nBreathe in and [C]let it go\n\nTake a step into the [Am]sun, leave the [D]shadows all be[G]hind\nWe were [C]made to glow`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50">
      <HeaderBar title={title} singer={singer} onChange={handleHeaderChange} />

      <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 gap-6">
        <ChordToolbar
          selectedChord={selectedChord}
          onSelect={setSelectedChord}
          onInsert={insertChord}
          onClear={clearChords}
          onSample={loadSample}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LyricsEditor ref={editorRef} lyrics={lyrics} onChange={setLyrics} />
          <LyricsPreview title={title} singer={singer} lyrics={lyrics} />
        </div>

        <ChordShapes usedChords={usedChords} />

        <footer className="text-center text-xs text-gray-500 py-4">
          Tip: Place chords with square brackets like [G] right before the syllable they align with.
        </footer>
      </main>
    </div>
  );
}

export default App;
