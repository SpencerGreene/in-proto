"use client";

import { useState, Fragment } from "react";
import type { Project, Dimension } from "./data";

interface VariantBProps {
  projects: Project[];
  dimensions: Dimension[];
  onUpdateTag: (projectId: string, dimensionId: string, value: string) => void;
  onAddVersion: (projectId: string, name: string) => void;
  sortCol: string;
  sortDir: "asc" | "desc";
  onSort: (col: string) => void;
}

function InlineVersions({
  project,
  onAddVersion,
}: {
  project: Project;
  onAddVersion: (name: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <div className="mb-2">
        {adding ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newName.trim()) {
                onAddVersion(newName.trim());
                setNewName("");
                setAdding(false);
              }
            }}
            className="flex gap-2 mb-2"
          >
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Version name..."
              className="flex-1 text-sm border border-zinc-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
            <button
              type="submit"
              className="text-sm px-2 py-1 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setNewName(""); }}
              className="text-sm px-2 py-1 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="text-xs text-zinc-500 hover:text-zinc-700 transition-colors mb-2"
          >
            + New Version
          </button>
        )}
      </div>
      <div className="space-y-1">
        {[...project.versions].reverse().map((snap, i) => (
          <div key={snap.id} className="text-xs flex justify-between text-zinc-600">
            <span>
              {snap.name}
              {i === 0 && (
                <span className="ml-1.5 text-emerald-600 font-medium">active</span>
              )}
            </span>
            <span className="text-zinc-400">{snap.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VariantB({ projects, dimensions, onUpdateTag, onAddVersion, sortCol, sortDir, onSort }: VariantBProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortArrow = (col: string) =>
    sortCol === col ? (sortDir === "asc" ? " \u2191" : " \u2193") : "";

  const fixedCols = [
    { key: "name", label: "Name" },
    { key: "creator", label: "Creator" },
    { key: "lastModified", label: "Modified" },
  ];

  const totalCols = fixedCols.length + dimensions.length;

  return (
    <div>
      <div className="border border-zinc-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              {fixedCols.map((col) => (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  className="text-left px-3 py-2 font-medium text-zinc-600 cursor-pointer hover:text-zinc-800 select-none whitespace-nowrap"
                >
                  {col.label}{sortArrow(col.key)}
                </th>
              ))}
              {dimensions.map((dim) => (
                <th
                  key={dim.id}
                  onClick={() => onSort(`dim:${dim.id}`)}
                  className="text-left px-3 py-2 font-medium text-zinc-600 cursor-pointer hover:text-zinc-800 select-none whitespace-nowrap"
                >
                  {dim.name}{sortArrow(`dim:${dim.id}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const isExpanded = expandedId === project.id;
              const active = project.versions[project.versions.length - 1];
              const olderCount = project.versions.length - 1;

              return (
                <Fragment key={project.id}>
                  <tr
                    className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors cursor-pointer"
                    onClick={(e) => {
                      // Don't toggle when clicking inputs/selects
                      if ((e.target as HTMLElement).closest("input, select")) return;
                      setExpandedId(isExpanded ? null : project.id);
                    }}
                  >
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <svg className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-2">
                            <span>{project.description}</span>
                            {active && (
                              <>
                                <span className="text-zinc-300">&middot;</span>
                                <span className="text-zinc-400 shrink-0">
                                  {active.name}
                                  {olderCount > 0 && <span className="ml-1">&middot; {olderCount} older</span>}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-zinc-600 whitespace-nowrap">{project.creator}</td>
                    <td className="px-3 py-2 text-zinc-500 whitespace-nowrap">{project.lastModified}</td>
                    {dimensions.map((dim) => (
                      <td key={dim.id} className="px-3 py-2">
                        {dim.type === "dropdown" ? (
                          <select
                            value={project.tags[dim.id] || ""}
                            onChange={(e) => onUpdateTag(project.id, dim.id, e.target.value)}
                            className="text-sm border border-zinc-200 rounded px-1.5 py-0.5 w-full focus:outline-none focus:ring-1 focus:ring-zinc-400"
                          >
                            <option value="">—</option>
                            {dim.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={project.tags[dim.id] || ""}
                            onChange={(e) => onUpdateTag(project.id, dim.id, e.target.value)}
                            className="text-sm border border-zinc-200 rounded px-1.5 py-0.5 w-full focus:outline-none focus:ring-1 focus:ring-zinc-400"
                            placeholder="—"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                  {isExpanded && (
                    <tr className="bg-zinc-50">
                      <td colSpan={totalCols} className="py-3 pl-10 pr-4">
                        <InlineVersions
                          project={project}
                          onAddVersion={(name) => onAddVersion(project.id, name)}
                        />
                      </td>
                    </tr>
                )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-zinc-400 text-center py-8">No projects match your search.</p>
      )}
    </div>
  );
}
