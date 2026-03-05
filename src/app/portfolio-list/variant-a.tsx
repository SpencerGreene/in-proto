"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project, Dimension } from "./data";

interface VariantAProps {
  projects: Project[];
  dimensions: Dimension[];
  onAddVersion: (projectId: string, name: string) => void;
  onRenameVersion: (projectId: string, versionId: string, newName: string) => void;
  onUpdateTag: (projectId: string, dimensionId: string, value: string) => void;
}

function InlineVersions({
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
    <div className="mt-3 pt-3 border-t border-zinc-100">
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
          <div key={snap.id} className="group/ver text-xs flex justify-between text-zinc-600">
            {editingId === snap.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editName.trim()) {
                    onRenameVersion(snap.id, editName.trim());
                    setEditingId(null);
                  }
                }}
                className="flex items-center gap-1.5 flex-1"
              >
                <input
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Escape") setEditingId(null); }}
                  className="border border-zinc-200 rounded px-1.5 py-0.5 text-xs w-32 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
                <button type="submit" className="text-zinc-500 hover:text-zinc-700">Save</button>
                <button type="button" onClick={() => setEditingId(null)} className="text-zinc-400 hover:text-zinc-600">Cancel</button>
              </form>
            ) : (
              <span className="flex items-center gap-1">
                {snap.name}
                {i === 0 && (
                  <span className="ml-1.5 text-emerald-600 font-medium">active</span>
                )}
                <button
                  onClick={() => { setEditingId(snap.id); setEditName(snap.name); }}
                  className="opacity-0 group-hover/ver:opacity-100 text-zinc-400 hover:text-zinc-600 transition-opacity ml-1"
                  title="Rename"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
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

export function VariantA({ projects, dimensions, onAddVersion, onRenameVersion }: VariantAProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project) => {
          const active = project.versions[project.versions.length - 1];
          const olderCount = project.versions.length - 1;

          return (
            <div
              key={project.id}
              className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 transition-colors cursor-pointer"
              onClick={() => router.push(`/portfolio-list/${project.id}`)}
            >
              <h3 className="font-semibold text-sm text-zinc-900 hover:text-blue-700 transition-colors">{project.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {dimensions.map((dim) => {
                  const val = project.tags[dim.id];
                  if (!val) return null;
                  return (
                    <span
                      key={dim.id}
                      className={`text-xs px-2 py-0.5 rounded-full ${dim.color}`}
                    >
                      {val}
                    </span>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-100 flex items-start justify-between gap-3">
                <div className="text-xs text-zinc-400 min-w-0">
                  <div className="truncate">{project.creator}</div>
                  <div>{project.lastModified}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === project.id ? null : project.id); }}
                  className="text-xs text-zinc-500 hover:text-zinc-700 text-right shrink-0 transition-colors"
                >
                  <div className="flex items-center gap-1 justify-end">
                    <span className="truncate max-w-[140px]">{active ? active.name : "No versions"}</span>
                    <svg className={`w-3 h-3 text-zinc-400 shrink-0 transition-transform ${expandedId === project.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {olderCount > 0 && (
                    <div className="text-zinc-400 text-[11px]">{olderCount} older</div>
                  )}
                </button>
              </div>

              {expandedId === project.id && (
                <div onClick={(e) => e.stopPropagation()}>
                <InlineVersions
                  project={project}
                  onAddVersion={(name) => onAddVersion(project.id, name)}
                  onRenameVersion={(versionId, newName) => onRenameVersion(project.id, versionId, newName)}
                />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-zinc-400 text-center py-8">No projects match your filters.</p>
      )}
    </div>
  );
}
