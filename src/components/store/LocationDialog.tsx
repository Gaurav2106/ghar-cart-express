import { useState } from "react";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { serviceablePincodes } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function LocationDialog() {
  const { locationOpen, setLocationOpen, setLocation } = useStore();
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const submit = (code = pin) => {
    if (!/^\d{6}$/.test(code)) return setError("Enter a valid 6-digit pincode.");
    const hit = serviceablePincodes[code];
    if (!hit) return setError("We don't deliver here yet — we're expanding fast!");
    setLocation({ pincode: code, ...hit, address: address || undefined });
    setError("");
    setLocationOpen(false);
  };

  return (
    <Dialog open={locationOpen} onOpenChange={setLocationOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Where should we deliver?</DialogTitle>
          <DialogDescription>Enter your pincode to see delivery time and what's in stock near you.</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-3">
          <Input inputMode="numeric" maxLength={6} placeholder="6-digit pincode" value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} className="h-12 text-lg tracking-widest" />
          <Input placeholder="House / flat, street (optional)" value={address} onChange={(e) => setAddress(e.target.value)} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="h-11 w-full text-base font-semibold">Check delivery</Button>
        </form>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Try a serviceable area</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(serviceablePincodes).map(([code, v]) => (
              <button key={code} onClick={() => { setPin(code); submit(code); }}
                className="flex items-center gap-1 rounded-full border bg-secondary/50 px-3 py-1 text-xs hover:border-primary">
                <MapPin className="size-3" /> {v.area}, {v.city}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
