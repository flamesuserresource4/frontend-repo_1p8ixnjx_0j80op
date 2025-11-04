import React, { useState } from "react";
import { Guitar, PlusCircle, Eraser } from "lucide-react";

const COMMON_CHORDS = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "Am",
  "Dm",
  "Em",
  "A7",
  "D7",
  "E7",
  "G7",
  "Cmaj7",
  "Em7",
  "Bm",
  "F#m",
];

export default function ChordToolbar({ selectedChord, onSelect, onInsert, onClear, onSample }) {
  const [custom, setCustom] = useState("");

  const handleInsert = (value) => {
    if (!value) return;
    onInsert(value.trim());
  };

  return (
    <div className="bg-white/80 border border-gray-200 rounded-xl p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Guitar className="text-indigo-500" size={18} />
        <span className="text-sm font-medium">Chords</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {COMMON_CHORDS.map((ch) => (
          <button
            key={ch}
            onClick={() => {
              onSelect(ch);
              handleInsert(ch);
            }}
            className={`px-2.5 py-1.5 rounded-md text-sm border transition shadow-sm ${
              selectedChord === ch
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white hover:bg-indigo-50 text-gray-700 border-gray-200"
            }`}
          >
            {ch}
          </button>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Custom (e.g., G/B)"
            className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <button
            onClick={() => {
              if (!custom.trim()) return;
              onSelect(custom.trim());
              handleInsert(custom.trim());
              setCustom("");
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          >
            <PlusCircle size={16} /> Insert
          </button>
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          >
            <Eraser size={16} /> Clear chords
          </button>
          <button
            onClick={onSample}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          >
            Load sample
          </button>
        </div>
      </div>
    </div>
  );
}
