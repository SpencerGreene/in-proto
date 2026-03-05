import { DATA_SETS } from "../data";
import { ProtoBar } from "../proto-bar";

function findProject(id: string) {
  for (const ds of DATA_SETS) {
    const p = ds.projects.find((p) => p.id === id);
    if (p) return { project: p, dimensions: ds.dimensions };
  }
  return null;
}

function NavRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-zinc-50 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-zinc-400">{icon}</span>
        <span className="text-sm text-zinc-800">{label}</span>
      </div>
      <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
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
        <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-4">Project Homepage placeholder</div>

        {/* Header */}
        <div className="flex items-start gap-2 mb-8">
          <h1 className="text-lg font-semibold truncate">{project.name}</h1>
          <button className="shrink-0 mt-0.5 text-zinc-300 hover:text-zinc-500 transition-colors" title="Project info">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Decision Status */}
            <section className="border border-zinc-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-zinc-500">Decision Status</h2>
                <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.description}
              </p>
            </section>
          </div>

          {/* Middle column */}
          <div className="space-y-6">
            {/* Next Steps */}
            <section className="border border-zinc-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-zinc-500">Next Steps</h2>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-400">See All (3)</span>
                  <svg className="w-3.5 h-3.5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="divide-y divide-zinc-100">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-zinc-700">Review stakeholder feedback</span>
                  <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-zinc-700">Finalize budget proposal</span>
                  <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-zinc-700">Schedule technical review</span>
                  <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </section>

            {/* Exported Files */}
            <section className="border border-zinc-200 rounded-lg p-5">
              <h2 className="text-sm font-medium text-zinc-500 mb-3">Exported Files</h2>
              <p className="text-sm text-zinc-400">No exports yet. Use the Export button to generate reports.</p>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Project Inputs */}
            <section className="border border-zinc-200 rounded-lg p-5">
              <h2 className="text-sm font-medium text-zinc-500 mb-2">Project Inputs</h2>
              <div className="divide-y divide-zinc-100">
                <NavRow
                  icon={<svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                  label="Vault"
                />
                <NavRow
                  icon={<svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                  label="Project Instructions"
                />
              </div>
            </section>

            {/* View Project */}
            <section className="border border-zinc-200 rounded-lg p-5">
              <h2 className="text-sm font-medium text-zinc-500 mb-2">View Project</h2>
              <div className="divide-y divide-zinc-100">
                <NavRow
                  icon={<svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                  label="Document"
                />
                <NavRow
                  icon={<svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4V2m0 2a2 2 0 00-2 2v1h10V6a2 2 0 00-2-2H7zm-4 6h14M3 10v8a2 2 0 002 2h8a2 2 0 002-2v-8H3z" /></svg>}
                  label="Presentation"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
