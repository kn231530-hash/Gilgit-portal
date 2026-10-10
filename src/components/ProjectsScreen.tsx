import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portalData';
import { ProjectItem } from '../types';

interface ProjectsScreenProps {
  onOpenProjectDetails: (projectId: string) => void;
  onOpenProposalModal: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onOpenProjectDetails,
  onOpenProposalModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'roads' | 'hydro' | 'health'>('all');

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 gap-4">
      {/* Civic Overview & Progress Pulse Banner */}
      <div className="w-full bg-surface-container-low rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-2 border border-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                analytics
              </span>
            </span>
            <span className="font-headline-md text-primary font-bold text-[16px]">
              Annual Development Program (ADP)
            </span>
          </div>
          <span className="font-label-md bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
            FY 2024-25
          </span>
        </div>
        <p className="font-body-sm text-on-surface-variant leading-relaxed text-[12px]">
          Transparent progress tracking of public works and development initiatives supervised by the Gilgit-Baltistan Works Department.
        </p>

        {/* Visual Mini KPIs */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-surface-container-lowest rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-sm border border-surface-container">
            <span className="font-metric-display text-primary leading-tight text-[24px] font-bold">48</span>
            <span className="font-label-md text-on-surface-variant mt-0.5 text-[11px]">Key Schemes</span>
          </div>
          <div className="bg-surface-container-lowest rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-sm border border-surface-container">
            <span className="font-metric-display text-secondary leading-tight text-[24px] font-bold">76%</span>
            <span className="font-label-md text-on-surface-variant mt-0.5 text-[11px]">Avg Progress</span>
          </div>
          <div className="bg-surface-container-lowest rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-sm border border-surface-container">
            <span className="font-metric-display text-tertiary leading-tight text-[24px] font-bold">142B</span>
            <span className="font-label-md text-on-surface-variant mt-0.5 text-[11px]">PKR Allocated</span>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-lg transition-all shadow-sm active:scale-95 text-[12px] ${
            selectedCategory === 'all'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          All Schemes ({PROJECTS_DATA.length})
        </button>
        <button
          onClick={() => setSelectedCategory('roads')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-lg transition-all shadow-sm active:scale-95 text-[12px] ${
            selectedCategory === 'roads'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Roads & Bridges
        </button>
        <button
          onClick={() => setSelectedCategory('hydro')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-lg transition-all shadow-sm active:scale-95 text-[12px] ${
            selectedCategory === 'hydro'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Power & Water
        </button>
        <button
          onClick={() => setSelectedCategory('health')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-lg transition-all shadow-sm active:scale-95 text-[12px] ${
            selectedCategory === 'health'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Health & Education
        </button>
      </div>

      {/* Project Cards List */}
      <div className="flex flex-col gap-4 w-full">
        {filteredProjects.map((project: ProjectItem) => (
          <article
            key={project.id}
            onClick={() => onOpenProjectDetails(project.id)}
            className="project-card bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container transition-all active:scale-[0.99] flex flex-col gap-2 hover:border-primary/50 cursor-pointer"
          >
            <div className="relative w-full h-36 rounded-lg overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                src={project.imageUrl}
                alt={project.imageAlt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-[11px] font-semibold">
                  {project.progressPercent === 100 ? (
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  )}
                  {project.badge}
                </span>
                <span className="font-label-md text-white bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm text-[11px]">
                  {project.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline-md text-on-surface leading-snug font-bold text-[16px]">
                  {project.title}
                </h2>
                <span className="material-symbols-outlined text-secondary shrink-0 text-[20px]">
                  {project.category === 'hydro' ? 'water_drop' : project.category === 'roads' ? 'add_road' : 'school'}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed text-[12px]">
                {project.description}
              </p>
            </div>

            {/* Progress Track */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center justify-between font-label-md text-[11px]">
                <span className="text-on-surface-variant">Physical Progress</span>
                <span className="font-metric-sm text-secondary font-bold">
                  {project.progressPercent}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-700"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Tabular Specs Split */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-surface-container-low rounded-lg p-2 flex flex-col">
                <span className="font-label-md text-on-surface-variant text-[11px]">
                  {project.costLabel}
                </span>
                <span className="font-metric-sm text-primary font-bold text-[13px]">
                  {project.costValue}
                </span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-2 flex flex-col">
                <span className="font-label-md text-on-surface-variant text-[11px]">
                  {project.agencyLabel}
                </span>
                <span className="font-body-sm text-on-surface font-semibold truncate text-[12px]">
                  {project.agency}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Civic Feedback Floating Action Bar / Callout */}
      <div className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl p-4 shadow-md flex items-center justify-between gap-2 mt-1 border border-primary-container">
        <div className="flex flex-col min-w-0">
          <span className="font-headline-md text-white leading-tight font-bold text-[15px]">
            Public Feedback & Participation
          </span>
          <span className="font-body-sm text-on-primary-container truncate text-[12px]">
            Propose a development project in your area
          </span>
        </div>
        <button
          onClick={onOpenProposalModal}
          className="shrink-0 inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-3.5 py-2.5 rounded-lg font-label-lg font-bold active:scale-95 transition-all shadow-sm text-[12px]"
        >
          <span className="material-symbols-outlined text-[18px]">add_comment</span>
          <span>Submit Proposal</span>
        </button>
      </div>
    </div>
  );
};
