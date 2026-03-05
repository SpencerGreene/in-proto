"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function ProtoBar({ children, backHref = "/" }: { children?: ReactNode; backHref?: string }) {
  return (
    <div className="bg-zinc-900 text-zinc-300 border-b border-zinc-700">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-4">
        <Link
          href={backHref}
          className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          &larr; Back
        </Link>
        {children && (
          <>
            <div className="w-px h-4 bg-zinc-700" />
            {children}
          </>
        )}
      </div>
    </div>
  );
}
