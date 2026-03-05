"use client";

import { useState } from "react";
import type { Project, Dimension } from "./data";

interface VariantAProps {
  projects: Project[];
  dimensions: Dimension[];
  onAddVersion: (projectId: string, name: string) => void;
  onUpdateTag: (projectId: string, dimensionId: string, value: string) => void;
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

export function VariantA({ projects, dimensions, onAddVersion }: VariantAProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project) => {
          const active = project.versions[project.versions.length - 1];
          const olderCount = project.versions.length - 1;

          return (
            <div
              key={project.id}
              className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 transition-colors"
            >
              <h3 className="font-semibold text-sm">{project.name}</h3>
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

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100">
                <div className="text-xs text-zinc-400">
                  {project.creator} &middot; {project.lastModified}
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  className="text-xs text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {active ? active.name : "No versions"}
                  {olderCount > 0 && (
                    <span className="text-zinc-400">&middot; {olderCount} older</span>
                  )}
                  <svg className={`w-3 h-3 text-zinc-400 transition-transform ${expandedId === project.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {expandedId === project.id && (
                <InlineVersions
                  project={project}
                  onAddVersion={(name) => onAddVersion(project.id, name)}
                />
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
