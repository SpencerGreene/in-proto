"use client";

import { useState } from "react";
import type { Dimension } from "./data";
import { DIMENSION_COLORS } from "./data";

interface DimensionManagerProps {
  dimensions: Dimension[];
  onAdd: (dim: Dimension) => void;
  onUpdate: (id: string, updates: Partial<Omit<Dimension, "id">>) => void;
  onDelete: (id: string) => void;
}

export function DimensionManager({ dimensions, onAdd, onUpdate, onDelete }: DimensionManagerProps) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState<"text" | "dropdown">("text");
  const [options, setOptions] = useState("");
  const [color, setColor] = useState(DIMENSION_COLORS[0]);

  function resetForm() {
    setName("");
    setType("text");
    setOptions("");
    setColor(DIMENSION_COLORS[0]);
  }

  function startEdit(dim: Dimension) {
    setEditingId(dim.id);
    setName(dim.name);
    setType(dim.type);
    setOptions(dim.options.join(", "));
    setColor(dim.color);
    setAdding(false);
  }

  function startAdd() {
    setAdding(true);
    setEditingId(null);
    resetForm();
  }

  function handleSaveNew() {
    if (!name.trim()) return;
    const id = name.trim().toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    onAdd({
      id,
      name: name.trim(),
      type,
      options: type === "dropdown" ? options.split(",").map((s) => s.trim()).filter(Boolean) : [],
      color,
    });
    setAdding(false);
    resetForm();
  }

  function handleSaveEdit() {
    if (!editingId || !name.trim()) return;
    onUpdate(editingId, {
      name: name.trim(),
      type,
      options: type === "dropdown" ? options.split(",").map((s) => s.trim()).filter(Boolean) : [],
      color,
    });
    setEditingId(null);
    resetForm();
  }

  const showForm = adding || editingId !== null;

  return (
    <div className="border border-zinc-200 rounded-lg bg-zinc-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-zinc-700">Manage Dimensions</div>
        {!showForm && (
          <button
            onClick={startAdd}
            className="text-xs px-2.5 py-1 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            + Add
          </button>
        )}
      </div>

      <div className="space-y-1.5 mb-3">
        {dimensions.map((dim) => (
          <div
            key={dim.id}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
              editingId === dim.id ? "bg-white border border-zinc-300" : "bg-white border border-zinc-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${dim.color.split(" ")[0]}`} />
              <span className="font-medium">{dim.name}</span>
              <span className="text-xs text-zinc-400">{dim.type}</span>
              {dim.type === "dropdown" && dim.options.length > 0 && (
                <span className="text-xs text-zinc-400">({dim.options.length} options)</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => (editingId === dim.id ? (setEditingId(null), resetForm()) : startEdit(dim))}
                className="text-xs text-zinc-400 hover:text-zinc-600 px-1.5 py-0.5 transition-colors"
              >
                {editingId === dim.id ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={() => onDelete(dim.id)}
                className="text-xs text-zinc-400 hover:text-red-500 px-1.5 py-0.5 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="border border-zinc-200 rounded-lg bg-white p-3">
          <div className="text-xs font-medium text-zinc-500 mb-2">
            {adding ? "New Dimension" : "Edit Dimension"}
          </div>
          <div className="flex flex-wrap gap-3 items-end">
            <label className="block">
              <span className="text-xs text-zinc-500">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block mt-1 border border-zinc-200 rounded px-2 py-1 text-sm w-36 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </label>
            <label className="block">
              <span className="text-xs text-zinc-500">Type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "text" | "dropdown")}
                className="block mt-1 border border-zinc-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="text">Free Text</option>
                <option value="dropdown">Dropdown</option>
              </select>
            </label>
            {type === "dropdown" && (
              <label className="block">
                <span className="text-xs text-zinc-500">Options (comma-separated)</span>
                <input
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  className="block mt-1 border border-zinc-200 rounded px-2 py-1 text-sm w-56 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </label>
            )}
          </div>
          <div className="mt-3">
            <span className="text-xs text-zinc-500">Color</span>
            <div className="flex gap-1.5 mt-1">
              {DIMENSION_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full ${c.split(" ")[0]} ${
                    color === c ? "ring-2 ring-offset-1 ring-zinc-400" : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={adding ? handleSaveNew : handleSaveEdit}
              className="text-sm px-3 py-1 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => { setAdding(false); setEditingId(null); resetForm(); }}
              className="text-sm px-3 py-1 text-zinc-500 hover:text-zinc-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
