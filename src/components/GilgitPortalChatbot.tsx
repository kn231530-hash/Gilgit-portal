import { FormEvent, useState } from "react";
import { Bot, X, Send, Sparkles, LoaderCircle } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
const welcome: Message = {
  role: "assistant",
  content: "Assalam-o-Alaikum! Welcome to Gilgit Portal. Ask me about tourism, public services, development projects, or the local economy. Aap Urdu, Roman Urdu, ya English mein sawal kar sakte hain.",
};
const suggestions = [
  "Tell me about tourism in Gilgit-Baltistan",
  "Gilgit Portal par kaun si services hain?",
  "How can I find development projects?",
];

export function GilgitPortalChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function send(text = draft) {
    const question = text.trim();
    if (!question || loading) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setDraft("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== welcome).slice(-16) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "AI is temporarily unavailable.");
      if (typeof data.reply !== "string") throw new Error("Invalid AI response.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send();
  }

  return (
    <div className="fixed bottom-20 right-4 z-[100] sm:bottom-6 sm:right-6">
      {open && (
        <section role="dialog" aria-label="Gilgit Portal AI chat" className="mb-3 flex h-[min(600px,calc(100dvh-150px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-2xl">
          <header className="flex items-center gap-3 bg-gradient-to-r from-emerald-950 to-emerald-800 px-4 py-4 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15"><Bot size={25} /></span>
            <div className="min-w-0 flex-1"><h2 className="font-semibold">Gilgit Portal AI</h2><p className="text-xs text-emerald-100">Civic Desk Assistant</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 hover:bg-white/15"><X size={20} /></button>
          </header>
          <div className="flex items-start gap-2 border-b border-emerald-50 bg-emerald-50/70 px-4 py-2.5 text-xs leading-5 text-emerald-950"><Sparkles size={15} className="mt-0.5 shrink-0" /><p>Ask in Urdu, Roman Urdu, or English. Verify official information.</p></div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/80 p-3 sm:p-4" aria-live="polite">
            {messages.map((m, i) => <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-3 text-sm leading-6 ${m.role === "user" ? "rounded-br-md bg-emerald-800 text-white" : "rounded-bl-md border border-slate-100 bg-white text-slate-800 shadow-sm"}`}>{m.content}</div></div>)}
            {loading && <div className="flex items-center gap-2 text-sm text-slate-500"><LoaderCircle size={16} className="animate-spin" />Gilgit AI is thinking…</div>}
            {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}<button type="button" onClick={() => { const last = [...messages].reverse().find((m) => m.role === "user"); if (last) { setMessages(messages.slice(0, -1)); void send(last.content); } }} className="ml-2 underline">Try again</button></div>}
            {messages.length === 1 && <div className="space-y-2 pt-1"><p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Try asking</p>{suggestions.map((s) => <button key={s} type="button" disabled={loading} onClick={() => void send(s)} className="block w-full rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-left text-xs leading-5 text-emerald-950 hover:bg-emerald-50 disabled:opacity-50">{s}</button>)}</div>}
          </div>
          <form onSubmit={submit} className="flex items-end gap-2 border-t border-slate-100 bg-white p-3">
            <label className="sr-only" htmlFor="gilgit-ai-message">Your message</label>
            <textarea id="gilgit-ai-message" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }} placeholder="Type your question…" rows={1} maxLength={3000} className="max-h-28 min-h-11 flex-1 resize-y rounded-2xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-emerald-700" />
            <button type="submit" disabled={loading || !draft.trim()} aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white disabled:opacity-40"><Send size={18} /></button>
          </form>
          <p className="bg-white px-3 pb-3 text-center text-[10px] text-slate-400">AI answers may be inaccurate.</p>
        </section>
      )}
      <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close Gilgit Portal AI" : "Open Gilgit Portal AI"} className="ml-auto flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:bg-emerald-800">{open ? <X size={20} /> : <Sparkles size={20} />}<span>{open ? "Close chat" : "Ask Gilgit AI"}</span></button>
    </div>
  );
}
