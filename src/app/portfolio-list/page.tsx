"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { PROJECTS, INITIAL_DIMENSIONS, DATA_SETS } from "./data";
import type { Project, Dimension } from "./data";
import { FilterBar } from "./filter-bar";
import { DimensionManager } from "./dimension-manager";
import { ProtoBar } from "./proto-bar";
import { VariantA } from "./variant-a";
import { VariantB } from "./variant-b";

type View = "grid" | "table";

const STORAGE_KEY = "portfolio-list-state";

function loadState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state: Record<string, unknown>) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function SortControls({
  sortValue,
  sortDir,
  dimensions,
  onSortChange,
  onDirToggle,
}: {
  sortValue: string;
  sortDir: "asc" | "desc";
  dimensions: Dimension[];
  onSortChange: (val: string) => void;
  onDirToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-zinc-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
      >
        <option value="lastModified">Date</option>
        <option value="name">Name</option>
        <option value="creator">Creator</option>
        {dimensions.map((dim) => (
          <option key={dim.id} value={`dim:${dim.id}`}>{dim.name}</option>
        ))}
      </select>
      <button
        onClick={onDirToggle}
        className="text-xs px-1.5 py-1.5 border border-zinc-200 rounded-lg text-zinc-500 bg-white hover:bg-zinc-50 transition-colors"
        title={`Sort ${sortDir === "asc" ? "ascending" : "descending"}`}
      >
        {sortDir === "asc" ? "\u2191" : "\u2193"}
      </button>
    </div>
  );
}

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
        className={`relative p-1.5 border rounded-lg transition-colors ${
          open ? "border-zinc-400 bg-zinc-100 text-zinc-800" : "border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
        }`}
        title="Columns"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        {hiddenCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-zinc-800 text-white text-[9px] flex items-center justify-center">{hiddenCount}</span>
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
  const saved = loadState();
  const [dataSetIndex, setDataSetIndex] = useState(() => saved?.dataSetIndex ?? 0);
  const initDs = saved?.dataSetIndex != null ? DATA_SETS[saved.dataSetIndex] : null;
  const [projects, setProjects] = useState<Project[]>(() => initDs?.projects ?? PROJECTS);
  const [dimensions, setDimensions] = useState<Dimension[]>(() => initDs?.dimensions ?? INITIAL_DIMENSIONS);
  const [search, setSearch] = useState(() => saved?.search ?? "");
  const [sortBy, setSortBy] = useState(() => saved?.sortBy ?? "lastModified");
  const [sortDir, setSortDir] = useState<"asc" | "desc">(() => saved?.sortDir ?? "desc");
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>(() => {
    if (saved?.activeFilters) {
      const restored: Record<string, Set<string>> = {};
      for (const [k, v] of Object.entries(saved.activeFilters)) restored[k] = new Set(v as string[]);
      return restored;
    }
    return {};
  });
  const [view, setView] = useState<View>(() => saved?.view ?? "table");
  const [showDimManager, setShowDimManager] = useState(() => saved?.showDimManager ?? false);
  const [showToolbar, setShowToolbar] = useState(() => saved?.showToolbar ?? false);
  const [toolbarMode, setToolbarMode] = useState<"collapsible" | "always">(() => saved?.toolbarMode ?? "collapsible");
  const [visibleDimIds, setVisibleDimIds] = useState<Set<string>>(() => {
    if (saved?.visibleDimIds) return new Set(saved.visibleDimIds as string[]);
    return new Set((initDs?.dimensions ?? INITIAL_DIMENSIONS).map((d) => d.id));
  });

  function switchDataSet(index: number) {
    const ds = DATA_SETS[index];
    setDataSetIndex(index);
    setProjects([...ds.projects]);
    setDimensions([...ds.dimensions]);
    setVisibleDimIds(new Set(ds.dimensions.map((d) => d.id)));
    setActiveFilters({});
    setSearch("");
    setSortBy("lastModified");
    setSortDir("desc");
    setTableSortCol("lastModified");
    setTableSortDir("desc");
    setShowDimManager(false);
  }

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
  const [tableSortCol, setTableSortCol] = useState<string>(() => saved?.tableSortCol ?? "lastModified");
  const [tableSortDir, setTableSortDir] = useState<"asc" | "desc">(() => saved?.tableSortDir ?? "desc");

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

  useEffect(() => {
    const filtersObj: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(activeFilters)) filtersObj[k] = Array.from(v);
    saveState({
      dataSetIndex, search, sortBy, sortDir, view, showDimManager, showToolbar,
      toolbarMode, tableSortCol, tableSortDir,
      visibleDimIds: Array.from(visibleDimIds),
      activeFilters: filtersObj,
    });
  }, [dataSetIndex, search, sortBy, sortDir, activeFilters, view, showDimManager, showToolbar, toolbarMode, visibleDimIds, tableSortCol, tableSortDir]);

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

  function addVersion(projectId: string, name: string) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              versions: [
                ...p.versions,
                { id: `s${p.id}-${Date.now()}`, name, date: new Date().toISOString().slice(0, 10) },
              ],
            }
          : p
      )
    );
  }

  function renameVersion(projectId: string, versionId: string, newName: string) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              versions: p.versions.map((v) =>
                v.id === versionId ? { ...v, name: newName } : v
              ),
            }
          : p
      )
    );
  }

  function deleteProject(projectId: string) {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
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

  const activeFilterCount = Object.values(activeFilters).reduce((sum, s) => sum + s.size, 0);

  const toolbarAlways = toolbarMode === "always";

  return (
    <>
      <ProtoBar>
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Data</span>
        <div className="flex items-center gap-1">
          {DATA_SETS.map((ds, i) => (
            <button
              key={ds.label}
              onClick={() => switchDataSet(i)}
              className={`text-xs px-2.5 py-1 rounded transition-colors ${
                dataSetIndex === i
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {ds.label}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-zinc-700" />
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Toolbar</span>
        <div className="flex items-center gap-1">
          {(["collapsible", "always"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setToolbarMode(mode)}
              className={`text-xs px-2.5 py-1 rounded transition-colors ${
                toolbarMode === mode
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {mode === "collapsible" ? "Collapsible" : "Always-visible"}
            </button>
          ))}
        </div>
      </ProtoBar>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">{DATA_SETS[dataSetIndex].label} Portfolio</h1>

      {/* Toolbar row 1: search + actions (always visible) */}
      <div className="flex items-start gap-3 mb-3">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-zinc-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />

        {/* In "always" mode, sort inline here */}
        {toolbarAlways && (
          <SortControls
            sortValue={view === "grid" ? sortBy : tableSortCol}
            sortDir={view === "grid" ? sortDir : tableSortDir}
            dimensions={dimensions}
            onSortChange={(val) => {
              if (view === "grid") setSortBy(val);
              else { setTableSortCol(val); setTableSortDir("asc"); }
            }}
            onDirToggle={() => {
              if (view === "grid") setSortDir(sortDir === "asc" ? "desc" : "asc");
              else setTableSortDir(tableSortDir === "asc" ? "desc" : "asc");
            }}
          />
        )}

        {/* In "collapsible" mode, toggle button + inline active filter chips */}
        {!toolbarAlways && (
          <>
            <button
              onClick={() => setShowToolbar(!showToolbar)}
              className={`text-xs px-3 py-1.5 border rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
                showToolbar
                  ? "border-zinc-400 bg-zinc-100 text-zinc-800"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Sort & Filter
            </button>
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-1.5 flex-1 min-w-0 items-center">
                {dimensions.flatMap((dim) => {
                  const vals = activeFilters[dim.id];
                  if (!vals) return [];
                  return Array.from(vals).map((val) => (
                    <button
                      key={`${dim.id}-${val}`}
                      onClick={() => toggleFilter(dim.id, val)}
                      className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${dim.color}`}
                    >
                      {val}
                      <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ));
                })}
                <button
                  onClick={() => { for (const dim of dimensions) { const vals = activeFilters[dim.id]; if (vals) for (const val of vals) toggleFilter(dim.id, val); } }}
                  className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </>
        )}

        {/* "Always" mode: Dimensions button in top row */}
        {toolbarAlways && (
          <>
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
          </>
        )}

        {!toolbarAlways && activeFilterCount === 0 && <div className="flex-1" />}

        {view === "table" && (
          <ColumnChooser
            dimensions={dimensions}
            visibleDimIds={visibleDimIds}
            onToggle={toggleVisibleDim}
          />
        )}

        <div className="flex border border-zinc-200 rounded-lg overflow-hidden">
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
        </div>
      </div>

      {/* "Always" mode: filter row with inline chips */}
      {toolbarAlways && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <FilterBar
            dimensions={dimensions}
            projects={projects}
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
          />
          {activeFilterCount > 0 && (
            <>
              <div className="w-px h-5 bg-zinc-200 mx-1" />
              {dimensions.flatMap((dim) => {
                const vals = activeFilters[dim.id];
                if (!vals) return [];
                return Array.from(vals).map((val) => (
                  <button
                    key={`${dim.id}-${val}`}
                    onClick={() => toggleFilter(dim.id, val)}
                    className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${dim.color}`}
                  >
                    {val}
                    <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ));
              })}
              <button
                onClick={() => {
                  for (const dim of dimensions) {
                    const vals = activeFilters[dim.id];
                    if (vals) for (const val of vals) toggleFilter(dim.id, val);
                  }
                }}
                className="text-xs text-zinc-400 hover:text-zinc-600 ml-1 transition-colors"
              >
                Clear all
              </button>
            </>
          )}
        </div>
      )}

      {/* "Collapsible" mode: sort, filter & dimensions panel */}
      {!toolbarAlways && showToolbar && (
        <div className="relative mb-4 p-3 border border-zinc-200 rounded-lg bg-zinc-50/50">
          <button
            onClick={() => setShowDimManager(!showDimManager)}
            className={`absolute top-3 right-3 p-1.5 rounded-lg transition-colors ${
              showDimManager
                ? "bg-zinc-200 text-zinc-700"
                : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
            }`}
            title="Manage Dimensions"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-10 shrink-0">Sort</span>
              <SortControls
                sortValue={view === "grid" ? sortBy : tableSortCol}
                sortDir={view === "grid" ? sortDir : tableSortDir}
                dimensions={dimensions}
                onSortChange={(val) => {
                  if (view === "grid") setSortBy(val);
                  else { setTableSortCol(val); setTableSortDir("asc"); }
                }}
                onDirToggle={() => {
                  if (view === "grid") setSortDir(sortDir === "asc" ? "desc" : "asc");
                  else setTableSortDir(tableSortDir === "asc" ? "desc" : "asc");
                }}
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-10 shrink-0 pt-1.5">Filter</span>
              <FilterBar
                dimensions={dimensions}
                projects={projects}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
              />
            </div>
          </div>
        </div>
      )}

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
          key={`${sortBy}-${sortDir}`}
          projects={filtered}
          dimensions={dimensions}
          onAddVersion={addVersion}
          onRenameVersion={renameVersion}
          onUpdateTag={updateTag}
        />
      ) : (
        <VariantB
          key={`${tableSortCol}-${tableSortDir}`}
          projects={tableSorted}
          dimensions={visibleDimensions}
          onAddVersion={addVersion}
          onRenameVersion={renameVersion}
          onDeleteProject={deleteProject}
          sortCol={tableSortCol}
          sortDir={tableSortDir}
          onSort={handleTableSort}
        />
      )}
    </main>
    </>
  );
}
