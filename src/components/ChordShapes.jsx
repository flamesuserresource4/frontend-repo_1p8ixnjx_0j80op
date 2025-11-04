import React from "react";

// Basic chord dictionary for guitar: -1 mute, 0 open, numbers are fret from baseFret
const CHORDS = {
  C: { baseFret: 1, strings: [-1, 3, 2, 0, 1, 0] },
  D: { baseFret: 1, strings: [-1, -1, 0, 2, 3, 2] },
  E: { baseFret: 1, strings: [0, 2, 2, 1, 0, 0] },
  F: { baseFret: 1, strings: [1, 3, 3, 2, 1, 1] },
  G: { baseFret: 1, strings: [3, 2, 0, 0, 0, 3] },
  A: { baseFret: 1, strings: [-1, 0, 2, 2, 2, 0] },
  B: { baseFret: 2, strings: [-1, 2, 4, 4, 4, 2] },
  Am: { baseFret: 1, strings: [-1, 0, 2, 2, 1, 0] },
  Dm: { baseFret: 1, strings: [-1, -1, 0, 2, 3, 1] },
  Em: { baseFret: 1, strings: [0, 2, 2, 0, 0, 0] },
  A7: { baseFret: 1, strings: [-1, 0, 2, 0, 2, 0] },
  D7: { baseFret: 1, strings: [-1, -1, 0, 2, 1, 2] },
  E7: { baseFret: 1, strings: [0, 2, 0, 1, 0, 0] },
  G7: { baseFret: 1, strings: [3, 2, 0, 0, 0, 1] },
  Cmaj7: { baseFret: 1, strings: [-1, 3, 2, 0, 0, 0] },
  Em7: { baseFret: 1, strings: [0, 2, 2, 0, 3, 0] },
  Bm: { baseFret: 2, strings: [-1, 2, 4, 4, 3, 2] },
  "F#m": { baseFret: 2, strings: [2, 4, 4, 2, 2, 2] },
};

function Diagram({ name, shape }) {
  const fretsToShow = 5;
  const width = 90;
  const height = 120;
  const margin = 12;
  const gridW = width - margin * 2;
  const gridH = height - margin * 2 - 18; // title space
  const stringCount = 6;
  const fretCount = fretsToShow;
  const stringSpacing = gridW / (stringCount - 1);
  const fretSpacing = gridH / fretCount;

  const base = shape.baseFret || 1;
  const strings = shape.strings; // E A D G B e (low to high)

  // Compute dot positions
  const dots = [];
  strings.forEach((fret, sIndex) => {
    if (fret <= 0) return; // open or mute
    const x = margin + sIndex * stringSpacing;
    const y = margin + 18 + (fret - 0.5) * fretSpacing; // center in fret
    dots.push({ x, y });
  });

  return (
    <div className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="text-sm font-semibold mb-2 text-gray-800">{name}</div>
      <svg width={width} height={height}>
        {/* Nut or first fret */}
        {base === 1 ? (
          <rect x={margin - 2} y={margin + 18 - 3} width={gridW + 4} height={6} fill="#111" />
        ) : (
          <text x={width - margin} y={margin + 14} textAnchor="end" fontSize="10" fill="#555">
            fret {base}
          </text>
        )}
        {/* Grid */}
        {[...Array(stringCount)].map((_, i) => (
          <line
            key={`s${i}`}
            x1={margin + i * stringSpacing}
            y1={margin + 18}
            x2={margin + i * stringSpacing}
            y2={margin + 18 + gridH}
            stroke="#555"
            strokeWidth={1}
          />
        ))}
        {[...Array(fretCount + 1)].map((_, i) => (
          <line
            key={`f${i}`}
            x1={margin}
            y1={margin + 18 + i * fretSpacing}
            x2={margin + gridW}
            y2={margin + 18 + i * fretSpacing}
            stroke="#bbb"
            strokeWidth={1}
          />
        ))}
        {/* Open/muted markers */}
        {strings.map((fret, i) => {
          const x = margin + i * stringSpacing;
          const y = margin + 10;
          if (fret === -1) {
            return (
              <text key={`m${i}`} x={x} y={y} textAnchor="middle" fontSize="10" fill="#888">
                x
              </text>
            );
          }
          if (fret === 0) {
            return <circle key={`o${i}`} cx={x} cy={y} r={4} fill="none" stroke="#888" strokeWidth={1} />;
          }
          return null;
        })}
        {/* Dots */}
        {dots.map((d, idx) => (
          <circle key={idx} cx={d.x} cy={d.y} r={6} fill="#4f46e5" />
        ))}
      </svg>
    </div>
  );
}

export default function ChordShapes({ usedChords }) {
  const present = usedChords
    .map((c) => c.trim())
    .filter((c) => c in CHORDS);

  if (present.length === 0) return null;

  return (
    <div className="bg-white/80 border border-gray-200 rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Chord shapes</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {present.map((name) => (
          <Diagram key={name} name={name} shape={CHORDS[name]} />
        ))}
      </div>
    </div>
  );
}
