import Link from "next/link";

export default function ProtoExample() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        &larr; Back
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-6">Example Proto</h1>
      <p className="text-zinc-400">
        Replace this with your prototype UI.
      </p>
    </main>
  );
}
