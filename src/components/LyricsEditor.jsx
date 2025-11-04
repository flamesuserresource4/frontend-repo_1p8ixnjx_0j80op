import React, { forwardRef, useImperativeHandle, useRef } from "react";

const SAMPLE = `This is the [G]first line with a [D]couple chords
And here comes the [Em]second line that [C]flows

[Am]Bridge starts with a tender [D]feel
Then lifts to a [G]chorus we [C]know`;

const LyricsEditor = forwardRef(function LyricsEditor(
  { lyrics, onChange },
  ref
) {
  const textareaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    insertChordAtCursor: (chord) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart ?? lyrics.length;
      const end = textarea.selectionEnd ?? lyrics.length;
      const insert = `[${chord}]`;
      const next = lyrics.slice(0, start) + insert + lyrics.slice(end);
      onChange(next);
      // restore cursor after update
      setTimeout(() => {
        try {
          textarea.focus();
          const pos = start + insert.length;
          textarea.setSelectionRange(pos, pos);
        } catch {}
      }, 0);
    },
  }));

  return (
    <div className="bg-white/80 border border-gray-200 rounded-xl p-3 shadow-sm">
      <label className="block text-sm font-medium mb-2">Lyrics</label>
      <textarea
        ref={textareaRef}
        value={lyrics}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Type your lyrics here. Use [C] brackets to place chords over words.\nTip: place a chord before the syllable it should align with."}
        rows={12}
        className="w-full resize-y leading-7 rounded-lg border border-gray-200 bg-white/90 p-3 outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium tracking-wide"
        style={{ fontFamily: "IBM Plex Sans, Inter, system-ui, sans-serif" }}
      />
      <div className="mt-2 text-xs text-gray-500">
        Shortcuts: Type [Am], [G/B], [F#m7] etc. or use the buttons above to insert at the cursor.
      </div>
      <div className="mt-3 flex gap-2 text-xs">
        <button
          onClick={() => onChange(lyrics + (lyrics.endsWith("\n") || lyrics === "" ? "" : "\n") + "[C]")}
          className="px-2.5 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
        >
          Quick [C]
        </button>
        <button
          onClick={() => onChange("")}
          className="px-2.5 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
        >
          Clear text
        </button>
        <button
          onClick={() => onChange(SAMPLE)}
          className="px-2.5 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
        >
          Load sample
        </button>
      </div>
    </div>
  );
});

export default LyricsEditor;
