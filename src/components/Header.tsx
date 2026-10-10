import React from 'react';
import { TabType } from '../types';
import { PORTAL_IMAGES } from '../data/portalData';

interface HeaderProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  hasUnreadNotifications?: boolean;
}

const tabs: { id: TabType; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'development-projects', label: 'Projects' },
  { id: 'economy-and-agriculture', label: 'Economy & Agriculture' },
  { id: 'tourism-and-services', label: 'Tourism & Services' },
];

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onChangeTab,
  onOpenNotifications,
  onOpenProfile,
  hasUnreadNotifications = true,
}) => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/95 pt-safe shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={() => onChangeTab('overview')} className="flex min-w-0 items-center gap-3 text-left" aria-label="Gilgit Portal home">
          <img alt="Gilgit Portal emblem" className="h-10 w-10 shrink-0 rounded-xl object-contain" src={PORTAL_IMAGES.emblem} />
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">Gilgit Portal</span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 sm:block">Civic services · Northern Pakistan</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {tabs.map((tab) => {
            const active = currentTab === tab.id;
            return (
              <button key={tab.id} onClick={() => onChangeTab(tab.id)} aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${active ? 'bg-emerald-950 text-white shadow-sm' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-950'}`}>
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <button onClick={onOpenNotifications} aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {hasUnreadNotifications && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />}
          </button>
          <button onClick={onOpenProfile} aria-label="User profile and citizen services" className="grid h-10 w-10 place-items-center rounded-full bg-emerald-950 text-white shadow-sm transition hover:bg-emerald-800">
            <span className="material-symbols-outlined text-[21px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
