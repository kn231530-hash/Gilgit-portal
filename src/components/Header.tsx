import React from 'react';
import { TabType } from '../types';
import { PORTAL_IMAGES } from '../data/portalData';

interface HeaderProps {
  currentTab: TabType;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  hasUnreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenNotifications,
  onOpenProfile,
  hasUnreadNotifications = true
}) => {
  const getTabSubtitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Regional Dashboard';
      case 'development-projects':
        return 'Development Projects';
      case 'economy-and-agriculture':
        return 'Economy & Agriculture';
      case 'tourism-and-services':
        return 'Tourism & Citizen Services';
      default:
        return 'Regional Dashboard';
    }
  };

  const getSubTag = () => {
    switch (currentTab) {
      case 'overview':
        return '| Civic Overview';
      case 'development-projects':
        return '| ADP Schemes';
      case 'economy-and-agriculture':
        return '| Mandi & Trade';
      case 'tourism-and-services':
        return '| Citizen Desk';
      default:
        return '| Civic Overview';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-surface-container">
      <div className="h-20 px-4 max-w-2xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="Gilgit Works Emblem"
            className="h-8 w-auto object-contain shrink-0"
            src={PORTAL_IMAGES.emblem}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-md text-primary leading-tight truncate text-[17px] font-bold">
                Gilgit Portal
              </span>
              <span className="font-label-md text-on-surface-variant/70 hidden sm:inline text-[11px]">
                {getSubTag()}
              </span>
            </div>
            <span className="font-label-md text-on-surface-variant truncate text-[12px]">
              {getTabSubtitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {hasUnreadNotifications && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary animate-pulse" />
            )}
          </button>
          <button
            onClick={onOpenProfile}
            aria-label="User Profile and Citizen Services"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 hover:opacity-90 active:scale-95 transition-all text-on-primary shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
