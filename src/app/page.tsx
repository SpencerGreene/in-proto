import Link from "next/link";

const protos = [
  {
    slug: "proto-example",
    title: "Example Proto",
    description: "A placeholder prototype to show the pattern.",
  },
];

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Proto Sandbox</h1>
      <p className="text-zinc-400 mb-10">
        Pick a prototype to view.
      </p>
      <div className="grid gap-4">
        {protos.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="block p-5 rounded-lg border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-colors"
          >
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-zinc-400 mt-1">{p.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
