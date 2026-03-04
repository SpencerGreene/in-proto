"use client";

import { useState, useRef, useEffect } from "react";
import type { Snapshot } from "./data";

interface SnapshotPopoverProps {
  snapshots: Snapshot[];
  onAddSnapshot: (name: string) => void;
}

export function SnapshotPopover({ snapshots, onAddSnapshot }: SnapshotPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(snapshots[snapshots.length - 1]?.id);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setAdding(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const latest = snapshots[snapshots.length - 1];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {latest ? latest.name : "No snapshots"}
        {snapshots.length > 1 && (
          <span className="text-zinc-400">&middot; {snapshots.length - 1} older</span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 left-0 w-72 bg-white border border-zinc-200 rounded-lg shadow-lg p-3">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">Snapshots</div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {[...snapshots].reverse().map((snap, i) => (
              <button
                key={snap.id}
                onClick={() => setSelected(snap.id)}
                className={`w-full text-left px-2 py-1.5 rounded text-sm flex justify-between items-center transition-colors ${
                  selected === snap.id
                    ? "bg-zinc-100 font-medium"
                    : "hover:bg-zinc-50"
                }`}
              >
                <span className="truncate">
                  {snap.name}
                  {i === 0 && (
                    <span className="ml-1.5 text-xs text-emerald-600 font-medium">latest</span>
                  )}
                </span>
                <span className="text-xs text-zinc-400 shrink-0 ml-2">{snap.date}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-zinc-100 mt-2 pt-2">
            {adding ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newName.trim()) {
                    onAddSnapshot(newName.trim());
                    setNewName("");
                    setAdding(false);
                  }
                }}
                className="flex gap-2"
              >
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Snapshot name..."
                  className="flex-1 text-sm border border-zinc-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
                <button
                  type="submit"
                  className="text-sm px-2 py-1 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
                >
                  Save
                </button>
              </form>
            ) : (
              <button
                onClick={() => setAdding(true)}
                className="text-sm text-zinc-600 hover:text-zinc-800 transition-colors"
              >
                + Save New Snapshot
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
