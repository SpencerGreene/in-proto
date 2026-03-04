"use client";

import { useState, Fragment } from "react";
import type { Project, Dimension } from "./data";
import { SnapshotPopover } from "./snapshot-popover";

interface VariantBProps {
  projects: Project[];
  dimensions: Dimension[];
  onUpdateTag: (projectId: string, dimensionId: string, value: string) => void;
  onAddSnapshot: (projectId: string, name: string) => void;
  sortCol: string;
  sortDir: "asc" | "desc";
  onSort: (col: string) => void;
}

export function VariantB({ projects, dimensions, onUpdateTag, onAddSnapshot, sortCol, sortDir, onSort }: VariantBProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortArrow = (col: string) =>
    sortCol === col ? (sortDir === "asc" ? " \u2191" : " \u2193") : "";

  const fixedCols = [
    { key: "name", label: "Name" },
    { key: "creator", label: "Creator" },
    { key: "lastModified", label: "Modified" },
  ];

  const totalCols = fixedCols.length + dimensions.length + 1;

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
              <th className="px-3 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <Fragment key={project.id}>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <td className="px-3 py-2">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{project.description}</div>
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
                  <td className="px-3 py-2">
                    <button
                      onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                      className="text-zinc-400 hover:text-zinc-600 transition-colors"
                      title="Toggle snapshots"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={expandedId === project.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                  </td>
                </tr>
                {expandedId === project.id && (
                  <tr className="bg-zinc-50">
                    <td colSpan={totalCols} className="px-4 py-3">
                      <SnapshotPopover
                        snapshots={project.snapshots}
                        onAddSnapshot={(name) => onAddSnapshot(project.id, name)}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-zinc-400 text-center py-8">No projects match your search.</p>
      )}
    </div>
  );
}
