import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./SiteHeader";

export function StoreLayout({ children, initialQuery }: { children: ReactNode; initialQuery?: string }) {
  return (
    <div className="min-h-screen">
      <SiteHeader initialQuery={initialQuery} />
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      <SiteFooter />
    </div>
  );
}
