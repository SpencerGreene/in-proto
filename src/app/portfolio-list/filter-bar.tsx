"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type { Dimension, Project } from "./data";

interface FilterBarProps {
  dimensions: Dimension[];
  projects: Project[];
  activeFilters: Record<string, Set<string>>;
  onToggleFilter: (dimensionId: string, value: string) => void;
}

function FilterPopover({
  dimension,
  values,
  activeValues,
  onToggle,
}: {
  dimension: Dimension;
  values: string[];
  activeValues: Set<string>;
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const count = activeValues.size;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`text-sm px-3 py-1.5 border rounded-lg flex items-center gap-1.5 transition-colors ${
          count > 0
            ? "border-zinc-400 bg-zinc-100 text-zinc-800"
            : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
        }`}
      >
        {dimension.name}
        {count > 0 && (
          <span className="bg-zinc-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {count}
          </span>
        )}
        <svg className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 left-0 w-48 bg-white border border-zinc-200 rounded-lg shadow-lg p-2">
          {values.length === 0 && (
            <div className="text-xs text-zinc-400 px-2 py-1.5">No values</div>
          )}
          {values.map((val) => {
            const active = activeValues.has(val);
            return (
              <label
                key={val}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-50 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onToggle(val)}
                  className="rounded border-zinc-300 text-zinc-800 focus:ring-zinc-400"
                />
                <span className={active ? "text-zinc-800 font-medium" : "text-zinc-600"}>{val}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FilterBar({ dimensions, projects, activeFilters, onToggleFilter }: FilterBarProps) {
  const valuesByDimension = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const dim of dimensions) {
      const values = new Set<string>();
      for (const p of projects) {
        if (p.tags[dim.id]) values.add(p.tags[dim.id]);
      }
      map[dim.id] = Array.from(values).sort();
    }
    return map;
  }, [dimensions, projects]);

  const activeChips: { dimensionId: string; dimensionName: string; value: string; color: string }[] = [];
  for (const dim of dimensions) {
    const values = activeFilters[dim.id];
    if (values) {
      for (const val of values) {
        activeChips.push({ dimensionId: dim.id, dimensionName: dim.name, value: val, color: dim.color });
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {dimensions.map((dim) => (
        <FilterPopover
          key={dim.id}
          dimension={dim}
          values={valuesByDimension[dim.id] || []}
          activeValues={activeFilters[dim.id] || new Set()}
          onToggle={(val) => onToggleFilter(dim.id, val)}
        />
      ))}

      {activeChips.length > 0 && (
        <>
          <div className="w-px h-5 bg-zinc-200 mx-1" />
          {activeChips.map(({ dimensionId, dimensionName, value, color }) => (
            <button
              key={`${dimensionId}-${value}`}
              onClick={() => onToggleFilter(dimensionId, value)}
              className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${color}`}
            >
              <span className="text-[10px] text-current/60">{dimensionName}:</span>
              {value}
              <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          <button
            onClick={() => {
              for (const chip of activeChips) onToggleFilter(chip.dimensionId, chip.value);
            }}
            className="text-xs text-zinc-400 hover:text-zinc-600 ml-1 transition-colors"
          >
            Clear all
          </button>
        </>
      )}
    </div>
  );
}
