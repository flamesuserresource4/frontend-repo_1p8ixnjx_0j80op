import React from "react";

function parseLine(line) {
  // Split keeping chords like [C]
  const regex = /\[([^\]]+)\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let pendingChord = null;

  while ((match = regex.exec(line)) !== null) {
    const chord = match[1].trim();
    const textBefore = line.slice(lastIndex, match.index);
    if (textBefore.length > 0 || pendingChord !== null) {
      parts.push({ chord: pendingChord, text: textBefore });
    } else if (textBefore.length === 0 && pendingChord === null) {
      // nothing to push
    }
    pendingChord = chord;
    lastIndex = regex.lastIndex;
  }

  const tail = line.slice(lastIndex);
  parts.push({ chord: pendingChord, text: tail });

  // Ensure at least one part
  if (parts.length === 0) parts.push({ chord: null, text: line });
  return parts;
}

export default function LyricsPreview({ title, singer, lyrics }) {
  const lines = lyrics.split("\n");

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white px-5 py-4">
        <h2 className="text-xl font-semibold leading-tight">{title || "Untitled Song"}</h2>
        <p className="text-sm text-white/80">{singer || "Unknown Artist"}</p>
      </div>
      <div className="p-5">
        <div className="prose max-w-none">
          {lines.map((line, idx) => (
            <div key={idx} className="font-medium tracking-wide leading-7" style={{ whiteSpace: "pre-wrap" }}>
              {line.trim() === "" ? (
                <div className="h-4" />
              ) : (
                parseLine(line).map((seg, i) => (
                  <span key={i} className="inline-flex flex-col items-start align-top">
                    <span className="min-h-[1.25rem] -mb-1 text-indigo-600 font-semibold text-xs">
                      {seg.chord ? seg.chord : "\u00A0"}
                    </span>
                    <span>{seg.text.length > 0 ? seg.text : "\u00A0"}</span>
                  </span>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
