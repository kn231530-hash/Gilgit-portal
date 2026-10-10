import { FormEvent, useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowLeft, Bell, BriefcaseBusiness, CheckCircle2, CircleAlert, Database, LogOut, Plus, RefreshCw, ShieldCheck, Trash2, X } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

type Project = { id: string; title: string; category: string; district: string | null; status: string; budget: number | null; description: string; created_at: string };
type Notice = { id: string; title: string; category: string; body: string; is_published: boolean; created_at: string };
type Tab = "overview" | "projects" | "notices" | "settings";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";
const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50";

export function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: "", category: "Development", district: "Gilgit", status: "Planned", budget: "", description: "" });
  const [noticeForm, setNoticeForm] = useState({ title: "", category: "General", body: "", is_published: false });

  const loadContent = useCallback(async () => {
    if (!supabase) return;
    setError("");
    const [projectResult, noticeResult] = await Promise.all([
      supabase.from("portal_projects").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("portal_notices").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    if (projectResult.error) setError(projectResult.error.message);
    else setProjects((projectResult.data ?? []) as Project[]);
    if (noticeResult.error) setError((previous) => previous || noticeResult.error!.message);
    else setNotices((noticeResult.data ?? []) as Notice[]);
  }, []);

  const checkSession = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase.auth.getSession();
    const currentUser = data.session?.user ?? null;
    setUser(currentUser);
    if (currentUser) {
      const { data: profile, error: profileError } = await supabase.from("user_profiles").select("role").eq("user_id", currentUser.id).maybeSingle();
      if (profileError) setError(profileError.message);
      const adminRole = profile?.role === "admin";
      setIsAdmin(adminRole);
      if (adminRole) await loadContent();
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, [loadContent]);

  useEffect(() => {
    void checkSession();
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange(() => { void checkSession(); });
    return () => listener.subscription.unsubscribe();
  }, [checkSession]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setError(""); setNotice("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) setError(signInError.message);
    else await checkSession();
    setBusy(false);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null); setIsAdmin(false); setProjects([]); setNotices([]);
  }

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !isAdmin) return;
    setBusy(true); setError(""); setNotice("");
    const payload = { ...projectForm, title: projectForm.title.trim(), district: projectForm.district.trim() || null, budget: projectForm.budget ? Number(projectForm.budget) : null };
    const { error: saveError } = await supabase.from("portal_projects").insert(payload);
    if (saveError) setError(saveError.message);
    else { setProjectForm({ title: "", category: "Development", district: "Gilgit", status: "Planned", budget: "", description: "" }); setNotice("Project saved successfully."); await loadContent(); setTab("projects"); }
    setBusy(false);
  }

  async function saveNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !isAdmin) return;
    setBusy(true); setError(""); setNotice("");
    const { error: saveError } = await supabase.from("portal_notices").insert({ ...noticeForm, title: noticeForm.title.trim() });
    if (saveError) setError(saveError.message);
    else { setNoticeForm({ title: "", category: "General", body: "", is_published: false }); setNotice("Notice saved successfully."); await loadContent(); setTab("notices"); }
    setBusy(false);
  }

  async function toggleNotice(item: Notice) {
    if (!supabase || !isAdmin) return;
    const { error: updateError } = await supabase.from("portal_notices").update({ is_published: !item.is_published }).eq("id", item.id);
    if (updateError) setError(updateError.message); else { setNotice("Notice status updated."); await loadContent(); }
  }

  async function deleteRow(table: "portal_projects" | "portal_notices", id: string) {
    if (!supabase || !isAdmin || !window.confirm("Are you sure you want to delete this record?")) return;
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id);
    if (deleteError) setError(deleteError.message); else { setNotice("Record deleted."); await loadContent(); }
  }

  if (loading) return <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-600"><RefreshCw className="animate-spin mr-2 inline" /> Loading admin panel…</div>;

  if (!isSupabaseConfigured) return (
    <div className="min-h-screen bg-slate-50 p-5 sm:p-10"><div className="mx-auto max-w-xl rounded-3xl border bg-white p-7 shadow-sm">
      <Database className="mb-4 text-emerald-800" size={32} /><h1 className="text-2xl font-bold text-slate-900">Connect Orken AI Database</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">Add the two Supabase environment variables to your local .env file and Vercel project settings to activate admin login.</p>
      <pre className="mt-4 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-emerald-100">VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co{"\n"}VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key</pre>
      <a className="mt-5 inline-flex text-sm font-semibold text-emerald-800 underline" href="https://supabase.com/dashboard">Open Supabase dashboard</a>
      <button className="mt-6 block text-sm text-slate-600 underline" onClick={() => { window.location.href = "/"; }}>Back to portal</button>
    </div></div>
  );

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 p-5 sm:p-10">
      <div className="mx-auto grid min-h-[80vh] max-w-4xl items-center gap-8 md:grid-cols-2">
        <div className="text-white"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><ShieldCheck size={30}/></div><p className="text-xs font-bold uppercase tracking-[.25em] text-emerald-200">Orken AI</p><h1 className="mt-3 text-4xl font-bold tracking-tight">Admin dashboard</h1><p className="mt-4 max-w-md leading-7 text-emerald-100/80">Manage AI projects and published updates in one secure place.</p><button onClick={() => { window.location.href = "/"; }} className="mt-8 inline-flex items-center gap-2 text-sm text-emerald-100 hover:text-white"><ArrowLeft size={16}/> Back to website</button></div>
        <form onSubmit={signIn} className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><h2 className="text-xl font-bold text-slate-900">Administrator sign in</h2><p className="mb-6 mt-1 text-sm text-slate-500">Use the admin account created in Supabase Auth.</p>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label><input className={inputClass} type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com"/>
          <label className="mb-1 mt-4 block text-sm font-medium text-slate-700">Password</label><input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password"/>
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button className={buttonClass + " mt-5 w-full"} disabled={busy}>{busy ? "Signing in…" : "Sign in securely"}</button>
          <p className="mt-4 text-xs leading-5 text-slate-500">Admin access is checked against the database role; a normal account cannot manage records.</p>
        </form>
      </div>
    </div>
  );

  if (!isAdmin) return <div className="grid min-h-screen place-items-center bg-slate-50 p-5"><div className="max-w-md rounded-2xl border bg-white p-7 text-center shadow-sm"><CircleAlert className="mx-auto mb-3 text-amber-600" size={32}/><h1 className="text-xl font-bold">Admin access required</h1><p className="mt-2 text-sm leading-6 text-slate-600">This account is signed in, but it does not have the admin role. Ask the database owner to assign the role in Supabase.</p><button className={buttonClass + " mt-5"} onClick={() => void signOut()}>Sign out</button></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-900 text-white"><ShieldCheck size={23}/></div>
              <div><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">Orken AI</p><h1 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">{tab==="overview"?"Dashboard":tab==="projects"?"AI Projects":tab==="notices"?"Updates & Notices":"Settings & Account"}</h1><p className="mt-1 text-xs text-slate-500">Admin control center</p></div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden max-w-[220px] truncate text-sm text-slate-500 sm:inline">{user.email}</span>
              <button onClick={() => void loadContent()} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium hover:bg-slate-50"><RefreshCw size={16}/> Refresh</button>
              <button onClick={() => void signOut()} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium hover:bg-slate-50"><LogOut size={16}/> Sign out</button>
            </div>
          </div>
          <nav aria-label="Admin pages" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {([{id:"overview",label:"Dashboard",icon:<Database size={18}/>},{id:"projects",label:"Projects",icon:<BriefcaseBusiness size={18}/>},{id:"notices",label:"Notices",icon:<Bell size={18}/>},{id:"settings",label:"Settings",icon:<ShieldCheck size={18}/>} ] as const).map((item) => <button key={item.id} onClick={() => setTab(item.id)} aria-current={tab===item.id?"page":undefined} className={`flex h-12 min-w-0 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors ${tab===item.id?"border-emerald-900 bg-emerald-900 text-white shadow-sm":"border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"}`}>{item.icon}<span className="truncate">{item.label}</span></button>)}
          </nav>
        </header>
        {error && <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"><CircleAlert size={18} className="mt-0.5 shrink-0"/>{error}</div>}
        {notice && <div className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-900"><CheckCircle2 size={18} className="mt-0.5 shrink-0"/>{notice}<button className="ml-auto" onClick={() => setNotice("")}><X size={16}/></button></div>}
        {tab==="overview" && <><div className="mt-7 grid gap-4 sm:grid-cols-3"><Stat title="Total projects" value={projects.length} icon={<BriefcaseBusiness/>}/><Stat title="Total notices" value={notices.length} icon={<Bell/>}/><Stat title="Published notices" value={notices.filter(n=>n.is_published).length} icon={<CheckCircle2/>}/></div><div className="mt-7 grid gap-6 lg:grid-cols-2"><section className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Recent projects</h2><div className="mt-4 space-y-3">{projects.slice(0,5).map(p=><div key={p.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0"><div><p className="text-sm font-semibold">{p.title}</p><p className="mt-1 text-xs text-slate-500">{p.district || "No district"} · {p.category}</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-900">{p.status}</span></div>)}{projects.length===0&&<p className="text-sm text-slate-500">No projects added yet.</p>}</div><button onClick={()=>setTab("projects")} className="mt-3 text-sm font-semibold text-emerald-800">Manage projects →</button></section><section className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Recent notices</h2><div className="mt-4 space-y-3">{notices.slice(0,5).map(n=><div key={n.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0"><div><p className="text-sm font-semibold">{n.title}</p><p className="mt-1 text-xs text-slate-500">{n.category}</p></div><span className={`rounded-full px-2 py-1 text-xs ${n.is_published?"bg-emerald-50 text-emerald-900":"bg-slate-100 text-slate-600"}`}>{n.is_published?"Published":"Draft"}</span></div>)}{notices.length===0&&<p className="text-sm text-slate-500">No notices added yet.</p>}</div><button onClick={()=>setTab("notices")} className="mt-3 text-sm font-semibold text-emerald-800">Manage notices →</button></section></div></>}
        {tab==="projects" && <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><section className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Project records</h2><div className="mt-4 space-y-3">{projects.map(p=><div key={p.id} className="flex flex-wrap items-start justify-between gap-3 rounded-xl border p-3"><div className="min-w-0 flex-1"><p className="font-semibold">{p.title}</p><p className="mt-1 text-xs text-slate-500">{p.category} · {p.district||"—"} · {p.status}</p><p className="mt-2 line-clamp-2 text-sm text-slate-600">{p.description}</p>{p.budget!==null&&<p className="mt-2 text-xs font-semibold">Budget: {Number(p.budget).toLocaleString()}</p>}</div><button aria-label={"Delete "+p.title} onClick={()=>void deleteRow("portal_projects",p.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17}/></button></div>)}{projects.length===0&&<p className="text-sm text-slate-500">No project records yet.</p>}</div></section><form onSubmit={saveProject} className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Add project</h2><label className="mt-4 block text-sm font-medium">Project title</label><input className={inputClass+" mt-1"} required maxLength={180} value={projectForm.title} onChange={e=>setProjectForm({...projectForm,title:e.target.value})}/><label className="mt-3 block text-sm font-medium">Category</label><input className={inputClass+" mt-1"} value={projectForm.category} onChange={e=>setProjectForm({...projectForm,category:e.target.value})}/><label className="mt-3 block text-sm font-medium">District</label><input className={inputClass+" mt-1"} value={projectForm.district} onChange={e=>setProjectForm({...projectForm,district:e.target.value})}/><label className="mt-3 block text-sm font-medium">Status</label><select className={inputClass+" mt-1"} value={projectForm.status} onChange={e=>setProjectForm({...projectForm,status:e.target.value})}><option>Planned</option><option>In Progress</option><option>Completed</option><option>On Hold</option></select><label className="mt-3 block text-sm font-medium">Budget (optional)</label><input className={inputClass+" mt-1"} type="number" min="0" step="0.01" value={projectForm.budget} onChange={e=>setProjectForm({...projectForm,budget:e.target.value})}/><label className="mt-3 block text-sm font-medium">Description</label><textarea className={inputClass+" mt-1"} rows={3} value={projectForm.description} onChange={e=>setProjectForm({...projectForm,description:e.target.value})}/><button className={buttonClass+" mt-4 w-full"} disabled={busy}><Plus size={16}/> Save project</button></form></div>}
        {tab==="notices" && <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><section className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Notice records</h2><div className="mt-4 space-y-3">{notices.map(n=><div key={n.id} className="rounded-xl border p-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0 flex-1"><p className="font-semibold">{n.title}</p><p className="mt-1 text-xs text-slate-500">{n.category} · {new Date(n.created_at).toLocaleDateString()}</p><p className="mt-2 line-clamp-3 text-sm text-slate-600">{n.body}</p></div><button aria-label={"Delete "+n.title} onClick={()=>void deleteRow("portal_notices",n.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17}/></button></div><button onClick={()=>void toggleNotice(n)} className={`mt-3 rounded-lg px-3 py-2 text-xs font-semibold ${n.is_published?"bg-amber-50 text-amber-900":"bg-emerald-50 text-emerald-900"}`}>{n.is_published?"Unpublish":"Publish notice"}</button></div>)}{notices.length===0&&<p className="text-sm text-slate-500">No notices yet.</p>}</div></section><form onSubmit={saveNotice} className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Add notice</h2><label className="mt-4 block text-sm font-medium">Notice title</label><input className={inputClass+" mt-1"} required maxLength={180} value={noticeForm.title} onChange={e=>setNoticeForm({...noticeForm,title:e.target.value})}/><label className="mt-3 block text-sm font-medium">Category</label><input className={inputClass+" mt-1"} value={noticeForm.category} onChange={e=>setNoticeForm({...noticeForm,category:e.target.value})}/><label className="mt-3 block text-sm font-medium">Notice details</label><textarea className={inputClass+" mt-1"} rows={5} value={noticeForm.body} onChange={e=>setNoticeForm({...noticeForm,body:e.target.value})}/><label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={noticeForm.is_published} onChange={e=>setNoticeForm({...noticeForm,is_published:e.target.checked})}/> Publish immediately</label><button className={buttonClass+" mt-4 w-full"} disabled={busy}><Plus size={16}/> Save notice</button></form></div>}
        {tab==="settings" && <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-800" size={24}/><h2 className="font-bold">Administrator account</h2></div>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="border-b pb-3"><dt className="text-slate-500">Signed-in email</dt><dd className="mt-1 break-all font-semibold">{user.email}</dd></div>
              <div className="border-b pb-3"><dt className="text-slate-500">Access role</dt><dd className="mt-1 font-semibold text-emerald-800">Administrator</dd></div>
              <div><dt className="text-slate-500">Authentication</dt><dd className="mt-1 font-semibold">Supabase Auth</dd></div>
            </dl>
            <button onClick={() => void signOut()} className={buttonClass+" mt-5"}><LogOut size={16}/> Sign out</button>
          </section>
          <section className="rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-3"><Database className="text-emerald-800" size={24}/><h2 className="font-bold">Database & security</h2></div>
            <p className="mt-3 text-sm leading-6 text-slate-600">Portal projects and notices are stored in Supabase. Database policies check the administrator role before allowing changes.</p>
            <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-950"><p className="font-semibold">Supabase connection</p><p className="mt-1 text-xs leading-5">This page is available when the database is configured. Keep your secret/service-role key on the server only.</p></div>
            <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-emerald-800 underline">Open Supabase dashboard ↗</a>
          </section>
        </div>}
        <footer className="mt-10 border-t pt-5 text-xs text-slate-400">Orken AI Admin · Protected by Supabase Auth and database row-level security.</footer>
      </main>
    </div>
  );
}

function Stat({title,value,icon}:{title:string;value:number;icon:React.ReactNode}) {
  return <div className="rounded-2xl border bg-white p-5"><div className="flex items-center justify-between text-sm text-slate-500"><span>{title}</span><span className="text-emerald-800">{icon}</span></div><p className="mt-3 text-3xl font-bold">{value}</p></div>;
}
