import { DATA_SETS } from "../data";
import { ProtoBar } from "../proto-bar";

function findProject(id: string) {
  for (const ds of DATA_SETS) {
    const p = ds.projects.find((p) => p.id === id);
    if (p) return { project: p, dimensions: ds.dimensions };
  }
  return null;
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const result = findProject(projectId);

  if (!result) {
    return (
      <>
        <ProtoBar backHref="/portfolio-list" />
        <main className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold mb-2">Project not found</h1>
          <p className="text-zinc-500">No project with ID <code className="text-sm bg-zinc-100 px-1.5 py-0.5 rounded">{projectId}</code>.</p>
        </main>
      </>
    );
  }

  const { project } = result;

  return (
    <>
      <ProtoBar backHref="/portfolio-list" />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">Project Homepage placeholder</div>
        <h1 className="text-2xl font-bold mb-1">{project.name}</h1>
        <p className="text-zinc-500 mb-1">{project.description}</p>
        <p className="text-sm text-zinc-400 mb-8">
          Created by {project.creator} · Last modified {project.lastModified}
        </p>

        <div className="space-y-6">
          <section className="border border-zinc-200 rounded-lg p-5">
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-3">Metadata</h2>
            <div className="text-sm text-zinc-400 italic">Editable metadata fields will go here.</div>
          </section>

          <section className="border border-zinc-200 rounded-lg p-5">
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-3">Versions</h2>
            <div className="space-y-1.5">
              {[...project.versions].reverse().map((v, i) => (
                <div key={v.id} className="flex items-center justify-between text-sm">
                  <span className="text-zinc-700">
                    {v.name}
                    {i === 0 && <span className="ml-2 text-xs text-emerald-600 font-medium">active</span>}
                  </span>
                  <span className="text-zinc-400 text-xs">{v.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
