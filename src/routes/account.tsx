import { createFileRoute } from "@tanstack/react-router";
import { Heart, MapPin, Package, User } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My account — GharMart" },
      { name: "description", content: "Manage your GharMart orders, addresses and wishlist." },
      { property: "og:title", content: "My account — GharMart" },
      { property: "og:description", content: "Manage your GharMart orders, addresses and wishlist." },
    ],
  }),
  component: Account,
});

const sections = [
  { icon: Package, title: "My orders", body: "Track live orders and reorder past ones." },
  { icon: MapPin, title: "Saved addresses", body: "Home, office and more." },
  { icon: Heart, title: "Wishlist", body: "Items you've saved for later." },
  { icon: User, title: "Profile", body: "Name, phone and preferences." },
];

function Account() {
  const { location, setLocationOpen } = useStore();
  return (
    <StoreLayout>
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border bg-card p-5">
          <div className="grid size-14 place-items-center rounded-full bg-accent text-2xl">🙏</div>
          <p className="mt-3 font-display text-lg font-bold">Namaste!</p>
          <p className="text-sm text-muted-foreground">Phone OTP sign-in arrives in the next phase.</p>
          <button disabled className="mt-4 h-10 w-full rounded-lg bg-primary/60 text-sm font-semibold text-primary-foreground">Login with OTP</button>
        </aside>
        <div>
          <h1 className="text-3xl font-extrabold">My account</h1>
          <div className="mt-4 rounded-2xl border bg-secondary/50 p-4 text-sm">
            Delivering to: <b>{location ? `${location.address ? location.address + ", " : ""}${location.area}, ${location.city} ${location.pincode}` : "No location set"}</b>
            <button onClick={() => setLocationOpen(true)} className="ml-2 font-semibold text-primary">Change</button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {sections.map(({ icon: I, title, body }) => (
              <div key={title} className="rounded-2xl border bg-card p-5">
                <I className="size-6 text-primary" />
                <p className="mt-3 font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{body}</p>
                <span className="mt-3 inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
