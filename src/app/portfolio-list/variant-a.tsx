"use client";

import { useState } from "react";
import type { Project, Dimension } from "./data";
import { SnapshotPopover } from "./snapshot-popover";

interface VariantAProps {
  projects: Project[];
  dimensions: Dimension[];
  onAddSnapshot: (projectId: string, name: string) => void;
  onUpdateTag: (projectId: string, dimensionId: string, value: string) => void;
}

export function VariantA({ projects, dimensions, onAddSnapshot, onUpdateTag }: VariantAProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 transition-colors"
          >
            <button
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
              className="w-full text-left"
            >
              <h3 className="font-semibold text-sm">{project.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{project.description}</p>
            </button>

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
              <SnapshotPopover
                snapshots={project.snapshots}
                onAddSnapshot={(name) => onAddSnapshot(project.id, name)}
              />
            </div>

            {expandedId === project.id && (
              <div className="mt-3 pt-3 border-t border-zinc-100">
                <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">
                  Snapshot Timeline
                </div>
                <div className="space-y-1">
                  {project.snapshots.map((snap, i) => (
                    <div key={snap.id} className="text-xs flex justify-between text-zinc-600">
                      <span>
                        {snap.name}
                        {i === project.snapshots.length - 1 && (
                          <span className="ml-1 text-emerald-600 font-medium">current</span>
                        )}
                      </span>
                      <span className="text-zinc-400">{snap.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-zinc-400 text-center py-8">No projects match your filters.</p>
      )}
    </div>
  );
}
