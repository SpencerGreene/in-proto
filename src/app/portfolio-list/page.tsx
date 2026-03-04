"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { PROJECTS, INITIAL_DIMENSIONS } from "./data";
import type { Project, Dimension } from "./data";
import { FilterBar } from "./filter-bar";
import { DimensionManager } from "./dimension-manager";
import { VariantA } from "./variant-a";
import { VariantB } from "./variant-b";

type View = "grid" | "table";

function ColumnChooser({
  dimensions,
  visibleDimIds,
  onToggle,
}: {
  dimensions: Dimension[];
  visibleDimIds: Set<string>;
  onToggle: (id: string) => void;
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

  const hiddenCount = dimensions.length - visibleDimIds.size;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`text-xs px-3 py-1.5 border rounded-lg flex items-center gap-1.5 transition-colors ${
          open ? "border-zinc-400 bg-zinc-100 text-zinc-800" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        Columns
        {hiddenCount > 0 && (
          <span className="text-[10px] text-zinc-400">({hiddenCount} hidden)</span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 right-0 w-48 bg-white border border-zinc-200 rounded-lg shadow-lg p-2">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide px-2 py-1 mb-1">
            Visible Columns
          </div>
          {dimensions.map((dim) => (
            <label
              key={dim.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-50 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={visibleDimIds.has(dim.id)}
                onChange={() => onToggle(dim.id)}
                className="rounded border-zinc-300 text-zinc-800 focus:ring-zinc-400"
              />
              <span className={visibleDimIds.has(dim.id) ? "text-zinc-800" : "text-zinc-400"}>
                {dim.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PortfolioList() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [dimensions, setDimensions] = useState<Dimension[]>(INITIAL_DIMENSIONS);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("lastModified");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({});
  const [view, setView] = useState<View>("grid");
  const [showDimManager, setShowDimManager] = useState(false);
  const [visibleDimIds, setVisibleDimIds] = useState<Set<string>>(() => new Set(INITIAL_DIMENSIONS.map((d) => d.id)));

  const filtered = useMemo(() => {
    let result = projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.creator.toLowerCase().includes(search.toLowerCase());

      const matchesTags = Object.entries(activeFilters).every(([dimId, values]) => {
        if (values.size === 0) return true;
        return p.tags[dimId] && values.has(p.tags[dimId]);
      });

      return matchesSearch && matchesTags;
    });

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "creator") cmp = a.creator.localeCompare(b.creator);
      else if (sortBy === "lastModified") cmp = a.lastModified.localeCompare(b.lastModified);
      else if (sortBy.startsWith("dim:")) {
        const dimId = sortBy.slice(4);
        cmp = (a.tags[dimId] || "").localeCompare(b.tags[dimId] || "");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [projects, search, sortBy, sortDir, activeFilters]);

  // For table view: sort can target dimension columns too
  const [tableSortCol, setTableSortCol] = useState<string>("lastModified");
  const [tableSortDir, setTableSortDir] = useState<"asc" | "desc">("desc");

  const tableSorted = useMemo(() => {
    let result = projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.creator.toLowerCase().includes(search.toLowerCase());

      const matchesTags = Object.entries(activeFilters).every(([dimId, values]) => {
        if (values.size === 0) return true;
        return p.tags[dimId] && values.has(p.tags[dimId]);
      });

      return matchesSearch && matchesTags;
    });

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (tableSortCol === "name") cmp = a.name.localeCompare(b.name);
      else if (tableSortCol === "creator") cmp = a.creator.localeCompare(b.creator);
      else if (tableSortCol === "lastModified") cmp = a.lastModified.localeCompare(b.lastModified);
      else if (tableSortCol.startsWith("dim:")) {
        const dimId = tableSortCol.slice(4);
        cmp = (a.tags[dimId] || "").localeCompare(b.tags[dimId] || "");
      }
      return tableSortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [projects, search, tableSortCol, tableSortDir, activeFilters]);

  function handleTableSort(col: string) {
    if (tableSortCol === col) setTableSortDir(tableSortDir === "asc" ? "desc" : "asc");
    else {
      setTableSortCol(col);
      setTableSortDir("asc");
    }
  }

  function toggleFilter(dimensionId: string, value: string) {
    setActiveFilters((prev) => {
      const next = { ...prev };
      const set = new Set(next[dimensionId] || []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      next[dimensionId] = set;
      return next;
    });
  }

  function addSnapshot(projectId: string, name: string) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              snapshots: [
                ...p.snapshots,
                { id: `s${p.id}-${Date.now()}`, name, date: new Date().toISOString().slice(0, 10) },
              ],
            }
          : p
      )
    );
  }

  function updateTag(projectId: string, dimensionId: string, value: string) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, tags: { ...p.tags, [dimensionId]: value } }
          : p
      )
    );
  }

  function toggleVisibleDim(dimId: string) {
    setVisibleDimIds((prev) => {
      const next = new Set(prev);
      if (next.has(dimId)) next.delete(dimId);
      else next.add(dimId);
      return next;
    });
  }

  function addDimension(dim: Dimension) {
    setDimensions((prev) => [...prev, dim]);
    setVisibleDimIds((prev) => new Set([...prev, dim.id]));
  }

  function updateDimension(id: string, updates: Partial<Omit<Dimension, "id">>) {
    setDimensions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  }

  function deleteDimension(id: string) {
    setDimensions((prev) => prev.filter((d) => d.id !== id));
    setVisibleDimIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setActiveFilters((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  const visibleDimensions = dimensions.filter((d) => visibleDimIds.has(d.id));

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
      >
        &larr; Back
      </Link>
      <h1 className="text-2xl font-bold mt-4 mb-1">Portfolio List</h1>
      <p className="text-zinc-500 text-sm mb-6">
        Enterprise innovation project portfolio — toggle between grid and table views.
      </p>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-zinc-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />

        {/* Sort — always visible, visually distinct */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <select
            value={view === "grid" ? sortBy : tableSortCol}
            onChange={(e) => {
              if (view === "grid") {
                setSortBy(e.target.value);
              } else {
                setTableSortCol(e.target.value);
                setTableSortDir("asc");
              }
            }}
            className="border border-zinc-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
          >
            <option value="lastModified">Date</option>
            <option value="name">Name</option>
            <option value="creator">Creator</option>
            {dimensions.map((dim) => (
              <option key={dim.id} value={`dim:${dim.id}`}>{dim.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              if (view === "grid") setSortDir(sortDir === "asc" ? "desc" : "asc");
              else setTableSortDir(tableSortDir === "asc" ? "desc" : "asc");
            }}
            className="text-xs px-1.5 py-1.5 border border-zinc-200 rounded-lg text-zinc-500 hover:bg-zinc-50 transition-colors"
            title={`Sort ${(view === "grid" ? sortDir : tableSortDir) === "asc" ? "ascending" : "descending"}`}
          >
            {(view === "grid" ? sortDir : tableSortDir) === "asc" ? "\u2191" : "\u2193"}
          </button>
        </div>

        <div className="w-px h-5 bg-zinc-200" />

        {/* Filters */}
        <FilterBar
          dimensions={dimensions}
          projects={projects}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
        />

        <div className="flex-1" />

        <button
          onClick={() => setShowDimManager(!showDimManager)}
          className={`text-xs px-3 py-1.5 border rounded-lg flex items-center gap-1.5 transition-colors ${
            showDimManager
              ? "border-zinc-400 bg-zinc-100 text-zinc-800"
              : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Dimensions
        </button>

        {/* Column chooser — table view only */}
        {view === "table" && (
          <ColumnChooser
            dimensions={dimensions}
            visibleDimIds={visibleDimIds}
            onToggle={toggleVisibleDim}
          />
        )}

        {/* View toggle */}
        <div className="flex border border-zinc-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 transition-colors ${
              view === "grid" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
            }`}
            title="Card grid"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-1.5 transition-colors ${
              view === "table" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
            }`}
            title="Table"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dimension Manager */}
      {showDimManager && (
        <div className="mb-6">
          <DimensionManager
            dimensions={dimensions}
            onAdd={addDimension}
            onUpdate={updateDimension}
            onDelete={deleteDimension}
          />
        </div>
      )}

      {/* Active view */}
      {view === "grid" ? (
        <VariantA
          projects={filtered}
          dimensions={dimensions}
          onAddSnapshot={addSnapshot}
          onUpdateTag={updateTag}
        />
      ) : (
        <VariantB
          projects={tableSorted}
          dimensions={visibleDimensions}
          onUpdateTag={updateTag}
          onAddSnapshot={addSnapshot}
          sortCol={tableSortCol}
          sortDir={tableSortDir}
          onSort={handleTableSort}
        />
      )}
    </main>
  );
}
