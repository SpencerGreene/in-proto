import Link from "next/link";

const protos = [
  {
    slug: "portfolio-list",
    title: "Portfolio List",
    description: "Enterprise innovation project portfolio with 3 layout variants.",
  },
];

const externalProtos = [
  {
    href: "http://13.89.123.63:3000/",
    title: "Pravda / SoT Prototype",
    description: "Source of Truth prototype.",
  },
  {
    href: "http://13.89.123.63:3001/",
    title: "Slides Prototype",
    description: "Slides prototype.",
  },
];

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Proto Sandbox</h1>
      <p className="text-zinc-500 mb-10">
        Pick a prototype to view.
      </p>
      <div className="grid gap-4">
        {protos.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="block p-5 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
          >
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-zinc-500 mt-1">{p.description}</p>
          </Link>
        ))}
        {externalProtos.map((p) => (
          <a
            key={p.href}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
          >
            <h2 className="text-lg font-semibold">
              {p.title}
              <span className="text-xs font-normal text-zinc-400 ml-2">↗ external</span>
            </h2>
            <p className="text-sm text-zinc-500 mt-1">{p.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
