import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'overview' as TabType,
      label: 'Overview',
      icon: 'dashboard',
    },
    {
      id: 'development-projects' as TabType,
      label: 'Projects',
      icon: 'construction',
    },
    {
      id: 'economy-and-agriculture' as TabType,
      label: 'Economy',
      icon: 'agriculture',
    },
    {
      id: 'tourism-and-services' as TabType,
      label: 'Tourism',
      icon: 'explore',
    },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,67,40,0.06)] border-t border-surface-container"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex justify-around items-center h-16 px-1 max-w-2xl mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-18 h-12 transition-all active:scale-95 ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className={`font-label-md text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-[-2px]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
