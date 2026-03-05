"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import type { Project, Dimension } from "./data";

interface VariantBProps {
  projects: Project[];
  dimensions: Dimension[];
  onAddVersion: (projectId: string, name: string) => void;
  onRenameVersion: (projectId: string, versionId: string, newName: string) => void;
  onDeleteProject: (projectId: string) => void;
  sortCol: string;
  sortDir: "asc" | "desc";
  onSort: (col: string) => void;
}

function ExpandedPanel({
  project,
  onAddVersion,
  onRenameVersion,
}: {
  project: Project;
  onAddVersion: (name: string) => void;
  onRenameVersion: (versionId: string, newName: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div>
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">Versions</div>
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
            <button type="submit" className="text-sm px-2 py-1 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors">Save</button>
            <button type="button" onClick={() => { setAdding(false); setNewName(""); }} className="text-sm px-2 py-1 text-zinc-400 hover:text-zinc-600 transition-colors">Cancel</button>
          </form>
        ) : (
          <button onClick={() => setAdding(true)} className="text-xs text-zinc-500 hover:text-zinc-700 transition-colors mb-2">+ New Version</button>
        )}
      </div>
      <div className="space-y-1">
        {[...project.versions].reverse().map((snap, i) => (
          <div key={snap.id} className="group/ver text-xs flex justify-between text-zinc-600">
            {editingId === snap.id ? (
              <form
                onSubmit={(e) => { e.preventDefault(); if (editName.trim()) { onRenameVersion(snap.id, editName.trim()); setEditingId(null); } }}
                className="flex items-center gap-1.5 flex-1"
              >
                <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => { if (e.key === "Escape") setEditingId(null); }} className="border border-zinc-200 rounded px-1.5 py-0.5 text-xs w-32 focus:outline-none focus:ring-1 focus:ring-zinc-400" />
                <button type="submit" className="text-zinc-500 hover:text-zinc-700">Save</button>
                <button type="button" onClick={() => setEditingId(null)} className="text-zinc-400 hover:text-zinc-600">Cancel</button>
              </form>
            ) : (
              <span className="flex items-center gap-1">
                {snap.name}
                {i === 0 && <span className="ml-1.5 text-emerald-600 font-medium">active</span>}
                <button onClick={() => { setEditingId(snap.id); setEditName(snap.name); }} className="opacity-0 group-hover/ver:opacity-100 text-zinc-400 hover:text-zinc-600 transition-opacity ml-1" title="Rename">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              </span>
            )}
            <span className="text-zinc-400">{snap.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RowMenu({
  projectId,
  onDelete,
}: {
  projectId: string;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="p-1 rounded hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600 transition-colors"
        title="Actions"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 right-0 mt-1 w-40 bg-white border border-zinc-200 rounded-lg shadow-lg py-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              router.push(`/portfolio-list/${projectId}/edit`);
            }}
            className="w-full text-left px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Edit project
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete project
          </button>
        </div>
      )}
    </div>
  );
}

export function VariantB({ projects, dimensions, onAddVersion, onRenameVersion, onDeleteProject, sortCol, sortDir, onSort }: VariantBProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  const sortArrow = (col: string) =>
    sortCol === col ? (sortDir === "asc" ? " \u2191" : " \u2193") : "";

  const fixedCols = [
    { key: "name", label: "Project Name" },
    { key: "creator", label: "Creator" },
    { key: "lastModified", label: "Modified" },
  ];

  const totalCols = fixedCols.length + dimensions.length + 1; // +1 for actions col

  return (
    <div>
      <div className="border border-zinc-200 rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              {fixedCols.map((col) => (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  className={`text-left px-3 py-2 font-medium text-zinc-600 cursor-pointer hover:text-zinc-800 select-none whitespace-nowrap ${col.key === "name" ? "max-w-[320px]" : ""}`}
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
              <th className="w-10" />
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
                    onClick={() => router.push(`/portfolio-list/${project.id}`)}
                  >
                    <td className="px-3 py-2 max-w-[320px]">
                      <div className="min-w-0">
                        <div className={`font-medium text-zinc-900 hover:text-blue-700 transition-colors ${isExpanded ? "" : "truncate"}`}>{project.name}</div>
                        <div className={`text-xs text-zinc-400 mt-0.5 ${isExpanded ? "" : "line-clamp-2"}`}>
                          {project.description}
                        </div>
                        {active && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedId(isExpanded ? null : project.id);
                            }}
                            className="text-xs text-zinc-400 mt-0.5 hover:text-zinc-600 transition-colors inline-flex items-center gap-1"
                          >
                            <svg className={`w-3 h-3 text-zinc-400 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-zinc-500">{active.name}</span>
                            {olderCount > 0 && <span>&middot; {olderCount} older</span>}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-zinc-600 whitespace-nowrap">{project.creator}</td>
                    <td className="px-3 py-2 text-zinc-500 whitespace-nowrap">{project.lastModified}</td>
                    {dimensions.map((dim) => (
                      <td key={dim.id} className="px-3 py-2 text-zinc-600 whitespace-nowrap">
                        {project.tags[dim.id] || <span className="text-zinc-300">—</span>}
                      </td>
                    ))}
                    <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                      <RowMenu
                        projectId={project.id}
                        onDelete={() => onDeleteProject(project.id)}
                      />
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-zinc-50" onClick={(e) => e.stopPropagation()}>
                      <td colSpan={totalCols} className="py-4 pl-6 pr-6">
                        <ExpandedPanel
                          project={project}
                          onAddVersion={(name) => onAddVersion(project.id, name)}
                          onRenameVersion={(versionId, newName) => onRenameVersion(project.id, versionId, newName)}
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
