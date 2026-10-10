import React from 'react';
import { PORTAL_IMAGES, NOTICES_DATA } from '../data/portalData';
import { TabType, NoticeItem } from '../types';

interface OverviewScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenProjectDetails: (projectId: string) => void;
  onOpenNotice: (notice: NoticeItem) => void;
  onOpenComplaintModal: () => void;
  onOpenPhotoModal: (image: { title: string; subtitle: string; url: string; badge: string }) => void;
  onOpenPassStatusModal: () => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onNavigateTab,
  onOpenProjectDetails,
  onOpenNotice,
  onOpenComplaintModal,
  onOpenPhotoModal,
  onOpenPassStatusModal
}) => {
  const photoCards = [
    {
      title: 'Gilgit City Corridor Expansion',
      subtitle: 'Karakoram Highway Link 3',
      badge: 'Bypass Work',
      url: PORTAL_IMAGES.bypassWork,
      alt: 'Infrastructure construction crew widening the mountain road along the Gilgit river canyon'
    },
    {
      title: '18 MW Grid Commissioning',
      subtitle: 'GB Power Department',
      badge: 'Naltar Hydropower',
      url: PORTAL_IMAGES.naltarHydro,
      alt: 'Hydroelectric water turbines and reservoir dam situated inside pine forest valley of Naltar'
    },
    {
      title: 'Export Agricultural Processing',
      subtitle: 'Growers Support Initiative',
      badge: 'Apricot & Cherry Orchards',
      url: PORTAL_IMAGES.orchardsHarvest,
      alt: 'Local Gilgit farmers harvesting ripe red cherries and apricots in Hunza and Gilgit orchards'
    }
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-1 pb-10 sm:px-2">
      {/* Alpine Karakoram Hero Greeting & Regional Vitality Strip */}
      <section className="relative w-full px-3 pb-3 pt-2 sm:px-5 lg:px-8">
        <div className="relative w-full overflow-hidden rounded-2xl border border-emerald-900 bg-emerald-950 text-white shadow-xl sm:rounded-3xl">
          {/* Atmospheric Backdrop Image */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${PORTAL_IMAGES.heroBackdrop})` }}
          />

          {/* Scrim overlay for contrast */}
          <div className="relative z-10 flex min-h-[300px] flex-col justify-center gap-6 p-6 sm:min-h-[360px] sm:p-10 lg:p-14">
            {/* Top Status Bar: Karakoram Weather & Highway Live State */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <button
                onClick={onOpenPassStatusModal}
                className="flex items-center gap-1.5 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-md px-3 py-1 rounded-full text-on-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-primary-fixed">cloud</span>
                <span className="font-metric-sm font-semibold tracking-tight text-white">14°C</span>
                <span className="font-label-md opacity-90 text-[11px]">Gilgit City</span>
              </button>

              <button
                onClick={onOpenPassStatusModal}
                className="flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping shrink-0" />
                <span className="material-symbols-outlined text-[16px] text-secondary">alt_route</span>
                <span className="font-label-md font-bold text-[11px]">Karakoram Hwy (KKH) Open</span>
              </button>
            </div>

            {/* Greeting & Regional Motto */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-primary-fixed tracking-wider uppercase text-[11px] font-semibold">
                  Roof of the World • Gilgit-Baltistan Civic Desk
                </span>
              </div>
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome to Gilgit Portal
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-emerald-50/90 sm:text-base">
                Comprehensive transparency platform for northern infrastructure development, road networks, clean water, and economic growth.
              </p>
            </div>

            {/* Highway & Pass Rapid Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              <button
                onClick={onOpenPassStatusModal}
                className="flex items-center gap-1 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-sm px-2.5 py-1 rounded-lg shrink-0 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />
                <span className="font-label-md text-on-primary text-[11px]">Babusar Pass: Restored</span>
              </button>
              <button
                onClick={onOpenPassStatusModal}
                className="flex items-center gap-1 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-sm px-2.5 py-1 rounded-lg shrink-0 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />
                <span className="font-label-md text-on-primary text-[11px]">Skardu Road: Open</span>
              </button>
              <button
                onClick={onOpenPassStatusModal}
                className="flex items-center gap-1 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-sm px-2.5 py-1 rounded-lg shrink-0 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
                <span className="font-label-md text-on-primary text-[11px]">Khunjerab Pass: Active</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Regional Metrics (2x2 Compact Grid) */}
      <section className="w-full px-3 py-3 sm:px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
          {/* Metric 1: Active Projects */}
          <div
            onClick={() => onNavigateTab('development-projects')}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-700 hover:shadow-md active:scale-[0.98] sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">construction</span>
              </div>
              <span className="font-label-md px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-[11px]">
                +18% this year
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-metric-display text-primary text-[28px] font-bold">142</span>
              <span className="font-label-md text-on-surface-variant font-medium text-[11px]">Schemes</span>
            </div>
            <span className="font-body-sm text-on-surface font-semibold truncate text-[13px]">
              Active Public Schemes
            </span>
            <span className="font-label-md text-outline truncate text-[11px]">
              Civic Infrastructure
            </span>
          </div>

          {/* Metric 2: Hydro Power Generation */}
          <div
            onClick={() => onNavigateTab('development-projects')}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-700 hover:shadow-md active:scale-[0.98] sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <span className="font-label-md px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-semibold text-[11px]">
                Sustainable
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-metric-display text-tertiary text-[28px] font-bold">+350</span>
              <span className="font-label-md text-on-surface-variant font-medium text-[11px]">MW</span>
            </div>
            <span className="font-body-sm text-on-surface font-semibold truncate text-[13px]">
              Clean Mountain Energy
            </span>
            <span className="font-label-md text-outline truncate text-[11px]">
              Hydro Generation
            </span>
          </div>

          {/* Metric 3: Annual Tourism */}
          <div
            onClick={() => onNavigateTab('tourism-and-services')}
            className="flex flex-col p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container hover:border-secondary transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[20px]">flight_takeoff</span>
              </div>
              <span className="font-label-md px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-[11px]">
                Record
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-metric-display text-secondary text-[28px] font-bold">1.2M</span>
              <span className="font-label-md text-on-surface-variant font-medium text-[11px]">Visitors</span>
            </div>
            <span className="font-body-sm text-on-surface font-semibold truncate text-[13px]">
              Tourism Influx
            </span>
            <span className="font-label-md text-outline truncate text-[11px]">
              Trekkers & Tourists
            </span>
          </div>

          {/* Metric 4: Agriculture & Farm Subsidy */}
          <div
            onClick={() => onNavigateTab('economy-and-agriculture')}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-700 hover:shadow-md active:scale-[0.98] sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[20px]">agriculture</span>
              </div>
              <span className="font-label-md px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-semibold text-[11px]">
                Agri Grant
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-metric-display text-primary-container text-[28px] font-bold">+12K</span>
              <span className="font-label-md text-on-surface-variant font-medium text-[11px]">Farmers</span>
            </div>
            <span className="font-body-sm text-on-surface font-semibold truncate text-[13px]">
              Agri-tech Support
            </span>
            <span className="font-label-md text-outline truncate text-[11px]">
              Orchards & Livestock
            </span>
          </div>
        </div>
      </section>

      {/* Live Highlighted Project Tracker Card */}
      <section className="w-full px-4 py-2">
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span className="font-label-md text-secondary font-bold tracking-wide text-[11px]">
                Featured Priority Project
              </span>
            </div>
            <span className="bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-label-md font-semibold text-[11px]">
              In Progress
            </span>
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <h2 className="font-headline-md text-on-surface font-bold text-[17px] leading-snug">
              Gilgit Bypass Dualization & Jaglot Connection
            </h2>
            <p className="font-body-sm text-on-surface-variant text-[12px]">
              Gilgit Bypass Dualization & Jaglot Connection • Package No. 4
            </p>
          </div>

          {/* Progress Bar & Split Statistics */}
          <div className="flex flex-col gap-1.5 mb-3">
            <div className="flex justify-between items-center text-on-surface text-[12px]">
              <span className="font-label-md text-outline">Physical Progress</span>
              <span className="font-metric-sm text-primary font-bold">82%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-700"
                style={{ width: '82%' }}
              />
            </div>
          </div>

          {/* Tabular Budget Metrics Pill Group */}
          <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-surface-container-low mb-2">
            <div className="flex flex-col">
              <span className="font-label-md text-outline text-[11px]">Approved Budget</span>
              <span className="font-metric-sm text-on-surface font-semibold text-[15px]">4.85B PKR</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-outline text-[11px]">Total Expenditure</span>
              <span className="font-metric-sm text-secondary font-semibold text-[15px]">3.97B PKR</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-on-surface-variant text-[12px]">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-label-md text-[11px]">Oversight: Works & Communications (C&W)</span>
            </div>
            <button
              onClick={() => onOpenProjectDetails('proj-3')}
              className="flex items-center gap-1 text-primary hover:text-secondary transition-colors font-label-lg font-semibold text-[13px] active:scale-95"
            >
              <span>Details</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Sectors Grid: Key Sectors & Public Services */}
      <section className="w-full px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <h2 className="font-headline-md text-on-surface font-bold text-[17px]">
              Key Sectors & Public Services
            </h2>
            <span className="font-body-sm text-outline text-[12px]">Gilgit Pillars of Progress</span>
          </div>
          <span className="font-label-md text-primary bg-surface-container-high px-2.5 py-1 rounded-full font-semibold text-[11px]">
            6 Key Sectors
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Sector 1 */}
          <div
            onClick={() => onNavigateTab('development-projects')}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-700 hover:shadow-md active:scale-[0.99]"
          >
            <div className="w-13 h-13 shrink-0 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">add_road</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-headline-md text-on-surface truncate font-semibold text-[15px]">
                  Roads & Bridges
                </span>
                <span className="font-label-md px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold shrink-0 text-[11px]">
                  46 Schemes
                </span>
              </div>
              <span className="font-body-sm text-primary font-medium text-[12px]">
                Connectivity & Highways
              </span>
              <p className="font-body-sm text-on-surface-variant truncate text-[12px]">
                Karakoram Highway, Skardu Expressway, Danyore Suspension Bridge
              </p>
            </div>
          </div>

          {/* Sector 2 */}
          <div
            onClick={() => onNavigateTab('development-projects')}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <div className="w-13 h-13 shrink-0 rounded-xl bg-tertiary-container text-on-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">water_drop</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-headline-md text-on-surface truncate font-semibold text-[15px]">
                  Clean Mountain Power
                </span>
                <span className="font-label-md px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold shrink-0 text-[11px]">
                  28 Stations
                </span>
              </div>
              <span className="font-body-sm text-tertiary font-medium text-[12px]">
                Hydropower & Energy
              </span>
              <p className="font-body-sm text-on-surface-variant truncate text-[12px]">
                Naltar Hydro Power Plant, Harpo Dam, Regional Solar Power Grid
              </p>
            </div>
          </div>

          {/* Sector 3 */}
          <div
            onClick={() => onNavigateTab('economy-and-agriculture')}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <div className="w-13 h-13 shrink-0 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">eco</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-headline-md text-on-surface truncate font-semibold text-[15px]">
                  Orchards & Fisheries
                </span>
                <span className="font-label-md px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold shrink-0 text-[11px]">
                  Export Ready
                </span>
              </div>
              <span className="font-body-sm text-secondary font-medium text-[12px]">
                Agriculture & Livestock
              </span>
              <p className="font-body-sm text-on-surface-variant truncate text-[12px]">
                Cherry, apricot, and almond processing with regional trout hatcheries
              </p>
            </div>
          </div>

          {/* Sector 4 */}
          <div
            onClick={() => onNavigateTab('tourism-and-services')}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <div className="w-13 h-13 shrink-0 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">hiking</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-headline-md text-on-surface truncate font-semibold text-[15px]">
                  Tourism & Hospitality
                </span>
                <span className="font-label-md px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-semibold shrink-0 text-[11px]">
                  Travel Guide
                </span>
              </div>
              <span className="font-body-sm text-primary font-medium text-[12px]">
                Culture & Expeditions
              </span>
              <p className="font-body-sm text-on-surface-variant truncate text-[12px]">
                Rakaposhi Basecamp, Shangrila, hotel registrations & Tourist Police
              </p>
            </div>
          </div>

          {/* Sector 5 */}
          <div
            onClick={() => onNavigateTab('economy-and-agriculture')}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <div className="w-13 h-13 shrink-0 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">diamond</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-headline-md text-on-surface truncate font-semibold text-[15px]">
                  Gems & Crafts
                </span>
                <span className="font-label-md px-2 py-0.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant font-semibold shrink-0 text-[11px]">
                  Northern Markets
                </span>
              </div>
              <span className="font-body-sm text-primary font-medium text-[12px]">
                Minerals & Artisans
              </span>
              <p className="font-body-sm text-on-surface-variant truncate text-[12px]">
                Ruby, peridot extraction, traditional woolen Patti weaving centers
              </p>
            </div>
          </div>

          {/* Sector 6 */}
          <div
            onClick={() => onNavigateTab('development-projects')}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <div className="w-13 h-13 shrink-0 rounded-xl bg-surface-container text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">school</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-headline-md text-on-surface truncate font-semibold text-[15px]">
                  KIU & DHQ Care
                </span>
                <span className="font-label-md px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-semibold shrink-0 text-[11px]">
                  Civil Facilities
                </span>
              </div>
              <span className="font-body-sm text-on-surface-variant font-medium text-[12px]">
                Education & Healthcare
              </span>
              <p className="font-body-sm text-on-surface-variant truncate text-[12px]">
                Karakoram International University, DHQ Teaching Hospital Gilgit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ground Snapshots & Alpine Terrain */}
      <section className="w-full px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <h2 className="font-headline-md text-on-surface font-bold text-[17px]">
              Ground Snapshots & Alpine Terrain
            </h2>
            <span className="font-body-sm text-outline text-[12px]">
              Field operations and regional scenery
            </span>
          </div>
          <span className="font-label-md text-secondary font-semibold text-[11px]">
            Latest Photos
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {photoCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => onOpenPhotoModal(card)}
              className="flex flex-col shrink-0 w-64 rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm border border-surface-container hover:border-primary transition-all cursor-pointer active:scale-95"
            >
              <div className="relative w-full h-32">
                <img
                  className="w-full h-full object-cover"
                  src={card.url}
                  alt={card.alt}
                />
                <span className="absolute bottom-2 left-2 bg-primary/90 text-on-primary font-label-md px-2 py-0.5 rounded-md backdrop-blur-sm text-[11px]">
                  {card.badge}
                </span>
              </div>
              <div className="p-2.5 flex flex-col">
                <span className="font-label-lg text-on-surface font-semibold truncate text-[13px]">
                  {card.title}
                </span>
                <span className="font-body-sm text-on-surface-variant text-[12px]">
                  {card.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Public Bulletins & Road Advisories */}
      <section className="w-full px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <h2 className="font-headline-md text-on-surface font-bold text-[17px]">
              Public Bulletins & Road Advisories
            </h2>
            <span className="font-body-sm text-outline text-[12px]">
              Official notifications & travel updates
            </span>
          </div>
          <button
            onClick={() => onOpenNotice(NOTICES_DATA[0])}
            className="font-label-lg text-primary font-semibold hover:underline text-[13px]"
          >
            View All
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {NOTICES_DATA.map((notice) => (
            <div
              key={notice.id}
              onClick={() => onOpenNotice(notice)}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container hover:border-primary transition-all cursor-pointer active:scale-[0.99]"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">{notice.icon}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-[11px]">
                    {notice.dept}
                  </span>
                  <span className="font-label-md text-outline text-[11px]">{notice.time}</span>
                </div>
                <h3 className="font-body-md text-on-surface font-semibold mt-0.5 leading-snug text-[13px]">
                  {notice.title}
                </h3>
                <p className="font-body-sm text-on-surface-variant line-clamp-1 text-[12px]">
                  {notice.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Civic Feedback Quick Bar */}
      <section className="w-full px-4 pb-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary text-on-primary shadow-md border border-primary-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg font-bold text-[14px]">Civic Complaint or Suggestion?</span>
              <span className="font-body-sm text-primary-fixed-dim text-[12px]">
                Submit a ticket directly to the district desk
              </span>
            </div>
          </div>
          <button
            onClick={onOpenComplaintModal}
            className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-label-lg font-semibold hover:bg-secondary/90 active:scale-95 transition-all shrink-0 text-[13px]"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};
