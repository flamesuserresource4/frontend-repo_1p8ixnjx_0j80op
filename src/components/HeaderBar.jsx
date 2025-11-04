import { Music, User } from "lucide-react";
import React from "react";

export default function HeaderBar({ title, singer, onChange }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/70 border-b border-black/5">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg grid place-items-center text-white">
            <Music size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Chorded Lyrics Builder</h1>
            <p className="text-sm text-gray-500">Write lyrics, place chords, print-ready in seconds.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white/80 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
            <Music className="text-indigo-500" size={18} />
            <input
              aria-label="Song title"
              value={title}
              onChange={(e) => onChange({ title: e.target.value, singer })}
              placeholder="Song title"
              className="w-full outline-none bg-transparent placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 bg-white/80 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
            <User className="text-indigo-500" size={18} />
            <input
              aria-label="Singer"
              value={singer}
              onChange={(e) => onChange({ title, singer: e.target.value })}
              placeholder="Singer / Artist"
              className="w-full outline-none bg-transparent placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
