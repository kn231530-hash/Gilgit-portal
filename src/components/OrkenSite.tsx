import React, { useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Bot, BrainCircuit, Check,
  ChevronDown, CirclePlay, Code2, Cpu, Database, Gauge, Headphones,
  Layers3, Menu, MessageSquare, Network, PhoneCall, Radio, ShieldCheck,
  Sparkles, Workflow, X, Zap,
} from 'lucide-react';

type Page = 'home' | 'solutions' | 'process' | 'pricing' | 'about' | 'contact';

const navItems: { label: string; href: string; page: Page }[] = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'Solutions', href: '/solutions', page: 'solutions' },
  { label: 'Our Process', href: '/process', page: 'process' },
  { label: 'Pricing', href: '/pricing', page: 'pricing' },
  { label: 'About', href: '/about', page: 'about' },
];

const process = [
  { n: '01', title: 'Discover', text: 'We map your workflow, current tools, constraints, and the KPI that matters.' },
  { n: '02', title: 'Design & build', text: 'We choose the right model, connect your systems, and build the agent around real tasks.' },
  { n: '03', title: 'Test in shadow mode', text: 'We evaluate outputs against representative cases, monitor edge cases, and tune guardrails.' },
  { n: '04', title: 'Launch & improve', text: 'Roll out with monitoring, usage visibility, and a plan for continuous improvement.' },
];

const tech = ['Claude', 'GPT-4o', 'Llama', 'n8n', 'Make', 'Pinecone', 'Vapi', 'Langfuse', 'HubSpot', 'Slack', 'Zendesk', 'Supabase'];

function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ${secondary ? 'border border-white/15 bg-white/[0.04] text-white hover:bg-white/10' : 'bg-lime-300 text-slate-950 hover:bg-lime-200'}`}>{children}</a>;
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080b12]/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <a href="/" className="flex items-center gap-2.5" aria-label="Gilgit Portal home">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime-300 text-slate-950"><Sparkles size={22} strokeWidth={2.5}/></span>
        <span><span className="block text-lg font-extrabold tracking-tight text-white">Gilgit <span className="text-lime-300">Portal</span></span><span className="hidden text-[9px] font-bold uppercase tracking-[.22em] text-slate-500 sm:block">Your digital gateway to Gilgit</span></span>
      </a>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        {navItems.map(item => <a key={item.page} href={item.href} className={`rounded-full px-3.5 py-2.5 text-sm font-medium transition ${page === item.page ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'}`}>{item.label}</a>)}
      </nav>
      <div className="hidden lg:block"><ButtonLink href="/contact">Book a free call <ArrowUpRight size={16}/></ButtonLink></div>
      <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </div>
    {open && <nav className="border-t border-white/10 bg-[#080b12] px-4 py-3 lg:hidden">{navItems.map(item => <a onClick={() => setOpen(false)} key={item.page} href={item.href} className={`block rounded-xl px-4 py-3 text-sm ${page === item.page ? 'bg-white/10 text-lime-300' : 'text-slate-300'}`}>{item.label}</a>)}<a href="/contact" className="mt-2 block rounded-xl bg-lime-300 px-4 py-3 text-center text-sm font-bold text-slate-950">Book a free call <ArrowUpRight className="ml-1 inline" size={16}/></a></nav>}
  </header>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.07] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-lime-200"><span className="h-1.5 w-1.5 rounded-full bg-lime-300"/>{children}</div>;
}

function ProcessSection() {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{process.map((p,i)=><article key={p.n} className="relative rounded-3xl border border-white/10 bg-white/[0.025] p-6"><div className="mb-7 flex items-center justify-between"><span className="text-3xl font-light tracking-tight text-lime-200">{p.n}</span>{i<3&&<ArrowDownRight className="hidden text-slate-700 xl:block" size={22}/>}</div><h3 className="text-lg font-bold text-white">{p.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{p.text}</p></article>)}</div>;
}

function ContactCTA() {
  return <section className="px-4 pb-20 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-7 overflow-hidden rounded-[32px] border border-lime-200/20 bg-gradient-to-br from-lime-300/[0.13] via-[#101a19] to-[#10131d] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14"><div className="max-w-2xl"><Eyebrow>Have a workflow in mind?</Eyebrow><h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Let’s put your AI to work.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">Tell us what slows your team down. We’ll help you identify the right agent, integrations, and next step.</p></div><div className="flex flex-wrap gap-3"><ButtonLink href="/contact">Discuss your project <ArrowUpRight size={16}/></ButtonLink></div></div></section>;
}

function HomePage() {
  return <>
    <section className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-lime-300/[0.055] blur-[100px]"/>
      <div className="relative mx-auto max-w-7xl">
        <Eyebrow>Gilgit-Baltistan · Local information</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-.045em] text-white sm:text-5xl lg:text-6xl xl:text-[68px]">Welcome to <span className="text-lime-300">Gilgit Portal.</span></h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">Your digital gateway to local information, public updates, tourism, and services across Gilgit-Baltistan.</p>
        <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact">Contact us <ArrowUpRight size={17}/></ButtonLink><ButtonLink href="/about" secondary>About Gilgit Portal <ArrowRight size={16}/></ButtonLink></div>
      </div>
    </section>
    <section className="border-y border-white/[0.07] bg-white/[0.018] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[{title:'Local information',text:'Find useful information and updates for Gilgit-Baltistan.'},{title:'Tourism & places',text:'Discover the region, its communities, and places to visit.'},{title:'Public updates',text:'Keep up with notices, announcements, and local developments.'}].map(item=><article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"><h2 className="text-lg font-bold text-white">{item.title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p></article>)}
      </div>
    </section>
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl"><Eyebrow>About the portal</Eyebrow><h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">One place to explore Gilgit-Baltistan.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Gilgit Portal brings local information, community updates, tourism, and public resources together in a clear, accessible experience.</p></div>
    </section>
    <ContactCTA/>
  </>;
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="relative overflow-hidden border-b border-white/[0.07] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"><div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-lime-300/[0.06] blur-[100px]"/><div className="relative mx-auto max-w-7xl"><Eyebrow>{eyebrow}</Eyebrow><h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-[-.04em] text-white sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{text}</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact">Talk to our team <ArrowUpRight size={16}/></ButtonLink><ButtonLink href="/" secondary>Back to home <ArrowRight size={16}/></ButtonLink></div></div></section>;
}

function SolutionsPage() {
  const solutions=[{icon:MessageSquare,title:'Customer experience',text:'Automate repetitive questions, triage requests, and route complex cases with context.'},{icon:Zap,title:'Sales & lead operations',text:'Qualify inbound leads, research prospects, prepare follow-ups, and update CRM records.'},{icon:Workflow,title:'Back-office workflows',text:'Move data between systems, summarize incoming work, and coordinate multi-step processes.'},{icon:Code2,title:'Internal knowledge',text:'Give employees a grounded assistant for company documents, procedures, and technical knowledge.'},{icon:Gauge,title:'Reporting & analysis',text:'Turn recurring reporting tasks into workflows that gather information and surface exceptions.'},{icon:Network,title:'Multi-agent systems',text:'Coordinate specialized agents with explicit roles, handoffs, and review steps.'}];
  return <><PageHero eyebrow="Solutions" title="Automate the busywork. Keep people in control." text="We map the friction in your business and connect AI to the workflow, data, and systems that already run it."/><section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-3">{solutions.map(s=><article key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"><s.icon className="text-lime-200" size={24}/><h2 className="mt-5 text-xl font-bold text-white">{s.title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{s.text}</p></article>)}</div></section><ContactCTA/></>;
}

function ProcessPage() {
  return <><PageHero eyebrow="Our process" title="From idea to working AI." text="We start with a real workflow, test the system against realistic cases, and plan for monitoring and ownership before launch."/><section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><ProcessSection/><div className="mt-8 grid gap-4 md:grid-cols-3">{[{title:'Evaluation first',text:'Define what a correct result looks like and test it before release.'},{title:'Integrations included',text:'Connect the tools, data sources, and handoffs the workflow depends on.'},{title:'Visible operations',text:'Track behavior, exceptions, latency, and usage so issues can be acted on.'}].map(x=><div key={x.title} className="rounded-2xl border border-white/10 p-5"><h3 className="font-bold text-white">{x.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{x.text}</p></div>)}</div></div></section><ContactCTA/></>;
}

function PricingPage() {
  const plans=[{name:'Starter Agent',desc:'For one focused, well-defined workflow.',price:'Let’s scope it',features:['One primary agent workflow','Core system integrations','Basic evaluation and guardrails','Launch guidance']},{name:'Business Automation',desc:'For teams connecting several tools and tasks.',price:'Custom scope',features:['Multi-step workflows','CRM or helpdesk integrations','Monitoring and exception handling','Evaluation suite and handover']},{name:'AI Systems',desc:'For advanced knowledge or multi-agent systems.',price:'Custom scope',features:['RAG or multi-agent architecture','Multiple data sources and tools','Detailed evaluation and observability','Deployment and ownership planning']}];
  return <><PageHero eyebrow="Pricing" title="The right scope for the work." text="AI project costs depend on integrations, data readiness, risk, and workflow complexity. Start with the job to be done and we’ll help define a sensible scope."/><section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">{plans.map((p,i)=><article key={p.name} className={`rounded-3xl border p-7 ${i===1?'border-lime-300/40 bg-lime-300/[0.055]':'border-white/10 bg-white/[0.025]'}`}><span className="text-xs font-bold uppercase tracking-[.16em] text-lime-200">{p.name}</span><p className="mt-4 text-sm leading-6 text-slate-400">{p.desc}</p><h2 className="mt-6 text-2xl font-extrabold text-white">{p.price}</h2><a href="/contact" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-lime-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-lime-200">Discuss this scope <ArrowUpRight size={16}/></a><div className="mt-7 space-y-3">{p.features.map(f=><div key={f} className="flex gap-2.5 text-sm text-slate-300"><Check size={16} className="mt-0.5 shrink-0 text-lime-200"/>{f}</div>)}</div></article>)}</div><p className="mx-auto mt-6 max-w-7xl text-xs leading-6 text-slate-500">Plans above are scoping guides, not a binding quote. Final pricing is confirmed after reviewing your workflow and integration requirements.</p></section><ContactCTA/></>;
}

function AboutPage() {
  return <><PageHero eyebrow="About Orken AI" title="We build AI software that does the work, not just describes it." text="Orken AI focuses on practical agents and automations: systems that connect to your tools, work within clear guardrails, and are evaluated against the outcomes they are meant to improve."/><section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">{[{icon:Zap,title:'Ship useful systems',text:'Focus on a real task and deliver a working system rather than a slide deck.'},{icon:ShieldCheck,title:'Measure and observe',text:'Build evaluation, logging, and fallback behavior into the delivery plan.'},{icon:Layers3,title:'Keep ownership clear',text:'Use understandable tools and documented integrations that teams can maintain.'}].map(x=><article key={x.title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"><x.icon size={24} className="text-lime-200"/><h2 className="mt-5 text-xl font-bold text-white">{x.title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{x.text}</p></article>)}</div><div className="mx-auto mt-8 max-w-7xl rounded-3xl border border-white/10 bg-[#0d121d] p-7 sm:p-10"><h2 className="text-2xl font-extrabold text-white">The stack is a means, not the product.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">We work with language models, workflow tools, retrieval systems, voice infrastructure, and business applications. The right combination depends on your data, security needs, expected traffic, and what success means to your team.</p><div className="mt-6 flex flex-wrap gap-2">{tech.map(t=><span key={t} className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300">{t}</span>)}</div></div></section><ContactCTA/></>;
}

function ContactPage() {
  return <><PageHero eyebrow="Contact" title="Let’s find the right workflow to automate." text="Tell us what your team does manually today, what tools you use, and what you would like to improve. We’ll use that context to shape the next step."/><section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="text-2xl font-bold text-white">Start with the problem.</h2><p className="mt-4 text-sm leading-7 text-slate-400">A useful first conversation covers the task, current process, systems involved, and the result you want. You don’t need a fully formed AI specification.</p><div className="mt-7 space-y-4">{['Which task is repetitive or slow?','What software or data does it use?','What should improve: speed, quality, cost, or coverage?'].map(x=><div key={x} className="flex gap-3 text-sm text-slate-300"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime-300/10 text-lime-200"><Check size={14}/></span>{x}</div>)}</div></div><div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9"><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 p-5"><MessageSquare className="text-lime-200" size={22}/><h3 className="mt-4 font-bold text-white">Talk through your workflow</h3><p className="mt-2 text-sm leading-6 text-slate-400">Share the business problem and explore possible approaches.</p><a href="https://orken.us/" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime-200">Visit Orken AI <ArrowUpRight size={15}/></a></div></div><p className="mt-5 text-xs leading-6 text-slate-500">This contact page is ready for your preferred form provider or CRM connection. No enquiry is stored or sent until a backend is connected.</p></div></div></section><ContactCTA/></>;
}

function Footer() {
  return <footer className="border-t border-white/[0.08] bg-[#07090f] px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"><div><a href="/" className="inline-flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-300 text-slate-950"><Sparkles size={19}/></span><span className="text-lg font-extrabold text-white">Gilgit <span className="text-lime-300">Portal</span></span></a><p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">Your digital gateway to local information, services, and updates from Gilgit.</p></div><div><h3 className="text-xs font-bold uppercase tracking-[.16em] text-slate-300">Explore</h3><div className="mt-4 space-y-3">{navItems.slice(1,4).map(n=><a key={n.page} href={n.href} className="block text-sm text-slate-500 hover:text-white">{n.label}</a>)}</div></div><div><h3 className="text-xs font-bold uppercase tracking-[.16em] text-slate-300">Solutions</h3><div className="mt-4 space-y-3"><a href="/solutions" className="block text-sm text-slate-500 hover:text-white">Business automation</a><a href="/pricing" className="block text-sm text-slate-500 hover:text-white">Pricing & scope</a></div></div><div><h3 className="text-xs font-bold uppercase tracking-[.16em] text-slate-300">Get started</h3><p className="mt-4 text-sm leading-6 text-slate-500">Have a workflow in mind? Start by defining the task and desired outcome.</p><a href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-lime-200">Contact Orken AI <ArrowRight size={15}/></a></div></div><div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Orken AI. All rights reserved.</span><span>Built for real workflows. Designed for clarity.</span></div></div></footer>;
}

export default function OrkenSite() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const page: Page = path === '/solutions' ? 'solutions' : path === '/process' ? 'process' : path === '/pricing' ? 'pricing' : path === '/about' ? 'about' : path === '/contact' ? 'contact' : 'home';
  const titles: Record<Page, string> = { home: 'Orken AI | Production AI Agents & Workflow Automation', solutions: 'AI Automation Solutions | Orken AI', process: 'Our Process | Orken AI', pricing: 'Pricing & Scope | Orken AI', about: 'About Orken AI', contact: 'Contact Orken AI' };
  document.title = titles[page];
  const descriptions: Record<Page, string> = { home: 'Build production AI agents and end-to-end workflow automation for sales, support, and operations.', solutions: 'Practical AI automation for customer experience, sales, operations, knowledge, reporting, and multi-agent systems.', process: 'Discover how Orken AI scopes, builds, evaluates, launches, and improves production AI agents.', pricing: 'AI automation project scoping for focused agents, business workflows, and advanced AI systems.', about: 'Orken AI builds useful, observable, production-minded AI agents and workflow automation.', contact: 'Discuss your business workflow and explore the right AI automation approach with Orken AI.' };
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', descriptions[page]);
  return <div className="min-h-screen bg-[#080b12] text-white selection:bg-lime-300 selection:text-slate-950"><Header page={page}/><main>{page === 'home' ? <HomePage/> : page === 'solutions' ? <SolutionsPage/> : page === 'process' ? <ProcessPage/> : page === 'pricing' ? <PricingPage/> : page === 'about' ? <AboutPage/> : <ContactPage/>}</main><Footer/></div>;
}
