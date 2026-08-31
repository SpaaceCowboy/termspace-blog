"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError, login, logout, register } from "@/lib/api";
import { useMarketplaceSession } from "./marketplace-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AccountForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter(); const params = useSearchParams(); const session = useMarketplaceSession();
  if (session.email) return <div className="mx-auto max-w-md rounded-xl border bg-surface p-7"><h1 className="editorial text-4xl">Your account</h1><p className="mt-3 text-muted-foreground">Signed in as {session.email}</p><Button className="mt-7" variant="secondary" onClick={async () => { await logout(); await session.refresh(); router.replace("/"); router.refresh(); }}>Sign out</Button></div>;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError(null);
    const data = new FormData(event.currentTarget);
    try {
      const email = String(data.get("email")); const password = String(data.get("password"));
      await (mode === "login" ? login(email, password) : register(email, password));
      await session.refresh();
      const next = params.get("next"); router.replace(next?.startsWith("/") && !next.startsWith("//") ? next : "/"); router.refresh();
    } catch (cause) { setError(cause instanceof ApiError ? cause.message : "Account services are temporarily unavailable."); }
    finally { setSubmitting(false); }
  }
  return <div className="mx-auto max-w-md rounded-xl border bg-surface p-7">
    <h1 className="editorial text-4xl">{mode === "login" ? "Sign in" : "Create account"}</h1>
    <p className="mt-2 text-sm text-muted-foreground">Use one account for the TermSpace marketplace and editorial library.</p>
    <form className="mt-7 space-y-4" onSubmit={submit}>
      <label className="block text-sm font-medium">Email<Input name="email" type="email" required autoComplete="email" className="mt-2" /></label>
      <label className="block text-sm font-medium">Password<Input name="password" type="password" minLength={8} maxLength={128} required autoComplete={mode === "login" ? "current-password" : "new-password"} className="mt-2" /></label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button className="w-full" disabled={submitting}>{submitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</Button>
    </form>
    <button className="mt-5 text-sm font-semibold text-primary" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}>
      {mode === "login" ? "Need an account? Register" : "Already registered? Sign in"}
    </button>
  </div>;
}
