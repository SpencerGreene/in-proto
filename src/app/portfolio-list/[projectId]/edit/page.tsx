import { DATA_SETS } from "../../data";
import { ProtoBar } from "../../proto-bar";

function findProject(id: string) {
  for (const ds of DATA_SETS) {
    const p = ds.projects.find((p) => p.id === id);
    if (p) return { project: p, dimensions: ds.dimensions };
  }
  return null;
}

export default async function EditProject({
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

  const { project, dimensions } = result;

  return (
    <>
      <ProtoBar backHref="/portfolio-list" />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">Edit Project</div>
        <h1 className="text-2xl font-bold mb-8">{project.name}</h1>

        <div className="space-y-6">
          <section className="border border-zinc-200 rounded-lg p-5">
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-3">Project Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Name</label>
                <div className="border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-400 bg-zinc-50">{project.name}</div>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Description</label>
                <div className="border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-400 bg-zinc-50 min-h-[60px]">{project.description}</div>
              </div>
            </div>
          </section>

          <section className="border border-zinc-200 rounded-lg p-5">
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-3">Metadata</h2>
            <div className="space-y-3">
              {dimensions.map((dim) => (
                <div key={dim.id}>
                  <label className="block text-xs text-zinc-500 mb-1">{dim.name}</label>
                  <div className="border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-400 bg-zinc-50">
                    {project.tags[dim.id] || "—"}
                  </div>
                </div>
              ))}
            </div>
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
