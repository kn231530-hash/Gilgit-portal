import React, { useState } from 'react';
import { ProjectItem, NoticeItem, GuideRecord } from '../types';
import { REGISTERED_GUIDES, NOTICES_DATA } from '../data/portalData';

// 1. Submit Proposal Modal
export const SubmitProposalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [sector, setSector] = useState('Drinking Water & Sanitation');
  const [location, setLocation] = useState('');
  const [scope, setScope] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLocation('');
      setScope('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">rate_review</span>
            <h3 className="font-headline-md text-primary font-bold text-[17px]">
              Submit Development Proposal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-on-surface-variant text-[12px] leading-relaxed">
          Your community needs and priorities are forwarded directly to the Commissioner's Office and Planning & Development Department (P&DD).
        </p>

        {submitted ? (
          <div className="p-4 bg-secondary-container text-on-secondary-container rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[26px]">check_circle</span>
            <div>
              <h4 className="font-bold text-[14px]">Proposal Received!</h4>
              <p className="text-[12px]">Your proposal ID #ADP-2025-{Math.floor(1000 + Math.random() * 9000)} has been logged into the regional citizen intake queue.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-1">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface font-semibold text-[11px]">Select Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2.5 text-body-md focus:outline-none border border-surface-container text-[13px]"
              >
                <option>Drinking Water & Sanitation</option>
                <option>Roads, Bridges & Retaining Walls</option>
                <option>Hydel & Solar Power Infrastructure</option>
                <option>Basic Health Units & Dispensaries</option>
                <option>Schools & Educational Upgrades</option>
                <option>Flood Mitigation & Protection Bunds</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface font-semibold text-[11px]">
                Location / Tehsil / Union Council
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2.5 text-body-md focus:outline-none border border-surface-container text-[13px]"
                placeholder="e.g. Jutial, Gilgit Tehsil / Danyore UC-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface font-semibold text-[11px]">
                Project Details & Estimated Scope
              </label>
              <textarea
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                required
                rows={3}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-body-md focus:outline-none border border-surface-container text-[13px]"
                placeholder="Describe the scope of work, expected beneficiaries, and community impact..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-lg font-bold mt-2 active:scale-[0.98] transition-all text-[13px] shadow-sm flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Submit Proposal
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 2. Project Details Modal
export const ProjectDetailsModal: React.FC<{
  project: ProjectItem | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-3.5 shadow-xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-surface-container pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">construction</span>
            <span className="font-label-md text-primary font-bold text-[12px] uppercase tracking-wide">
              ADP Scheme Portfolio
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface-container">
          <img className="w-full h-full object-cover" src={project.imageUrl} alt={project.imageAlt} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
            <span className="bg-secondary px-2.5 py-0.5 rounded-full font-label-md font-semibold text-[11px]">
              {project.badge}
            </span>
            <span className="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded font-label-md text-[11px]">
              {project.location}
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-headline-md text-on-surface font-bold text-[18px] leading-snug">
            {project.title}
          </h2>
          <p className="font-body-sm text-on-surface-variant text-[13px] mt-1 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-1.5 border border-surface-container">
          <div className="flex justify-between items-center text-[12px]">
            <span className="font-label-md text-outline">Physical Work Completed</span>
            <span className="font-metric-sm text-secondary font-bold">{project.progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Tabular details */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col border border-surface-container">
            <span className="font-label-md text-outline text-[11px]">Sanctioned Allocation</span>
            <span className="font-metric-sm text-primary font-bold text-[14px]">{project.costValue}</span>
          </div>
          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col border border-surface-container">
            <span className="font-label-md text-outline text-[11px]">Supervising Department</span>
            <span className="font-body-sm text-on-surface font-semibold truncate text-[12px]">{project.agency}</span>
          </div>
        </div>

        {project.detailedSpecs && (
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container flex flex-col gap-2 text-[12px]">
            <div>
              <span className="font-label-md text-outline block">Engineering Scope:</span>
              <p className="font-body-sm text-on-surface mt-0.5">{project.detailedSpecs.scope}</p>
            </div>
            <div>
              <span className="font-label-md text-outline block">Target Beneficiaries:</span>
              <p className="font-body-sm text-on-surface mt-0.5">{project.detailedSpecs.beneficiaries}</p>
            </div>
            <div>
              <span className="font-label-md text-outline block">Executing Contractor / JV:</span>
              <p className="font-body-sm text-on-surface mt-0.5 font-semibold text-primary">{project.detailedSpecs.contractor}</p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-semibold active:scale-[0.99] transition-transform text-[13px]"
        >
          Close Project Overview
        </button>
      </div>
    </div>
  );
};

// 3. Notice Detail Modal
export const NoticeDetailModal: React.FC<{
  notice: NoticeItem | null;
  onClose: () => void;
}> = ({ notice, onClose }) => {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-surface-container pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">{notice.icon}</span>
            <span className="font-label-md px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-[11px]">
              {notice.dept}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-outline text-[11px]">
          <span>Official Public Bulletin</span>
          <span>{notice.time}</span>
        </div>

        <h3 className="font-headline-md text-on-surface font-bold text-[17px] leading-snug">
          {notice.title}
        </h3>

        <div className="p-3 bg-surface-container-low rounded-xl text-[13px] leading-relaxed text-on-surface-variant border border-surface-container">
          {notice.fullText}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-semibold active:scale-[0.99] transition-all text-[13px]"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Photo Preview Modal
export const PhotoPreviewModal: React.FC<{
  photo: { title: string; subtitle: string; url: string; badge: string } | null;
  onClose: () => void;
}> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="relative w-full h-72 sm:h-80 bg-black">
          <img className="w-full h-full object-cover" src={photo.url} alt={photo.title} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <span className="absolute bottom-3 left-3 bg-primary/90 text-on-primary font-label-md px-3 py-1 rounded-md backdrop-blur-sm text-[12px] font-semibold">
            {photo.badge}
          </span>
        </div>
        <div className="p-4 flex flex-col gap-1">
          <h3 className="font-headline-md text-on-surface font-bold text-[17px]">
            {photo.title}
          </h3>
          <p className="font-body-sm text-on-surface-variant text-[13px]">
            {photo.subtitle}
          </p>
          <p className="text-[12px] text-outline mt-1">
            Ground verification imagery documented by the Gilgit-Baltistan Infrastructure Oversight Cell.
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. Verify Guide Modal
export const VerifyGuideModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<GuideRecord | null>(null);

  if (!isOpen) return null;

  const filteredGuides = REGISTERED_GUIDES.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.licenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-surface-container pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">verified_user</span>
            <h3 className="font-headline-md text-primary font-bold text-[17px]">
              Trekking Guide Verification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-on-surface-variant text-[12px]">
          Search GB Tourism Department registry by guide name, license badge number, or district.
        </p>

        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by license e.g. GB-HAP-0482 or name..."
            className="w-full bg-surface-container-low text-on-surface font-body-md pl-3 pr-10 py-2.5 rounded-lg outline-none border border-surface-container text-[13px]"
          />
          <span className="material-symbols-outlined text-outline absolute right-3 text-[18px]">
            search
          </span>
        </div>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="p-3 rounded-lg bg-surface-container-low border border-surface-container hover:border-primary transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="font-label-lg font-bold text-[13px] text-on-surface">{guide.name}</span>
                <span className="font-body-sm text-outline text-[11px]">{guide.licenseNo} • {guide.district}</span>
                <span className="text-[11px] text-primary font-medium">{guide.specialization}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-[10px] font-bold">
                {guide.status}
              </span>
            </div>
          ))}
          {filteredGuides.length === 0 && (
            <div className="text-center py-6 text-on-surface-variant text-[12px]">
              No guide record found for "{searchTerm}". Please check license spelling.
            </div>
          )}
        </div>

        {selectedGuide && (
          <div className="p-3 bg-secondary-container/40 rounded-xl border border-secondary/30 text-[12px] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Official License Verified</span>
            </div>
            <p className="text-on-surface">
              <strong>{selectedGuide.name}</strong> holds active accreditation for high altitude mountaineering with {selectedGuide.experienceYears} years field experience in {selectedGuide.district} division.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold active:scale-[0.99] transition-all text-[13px]"
        >
          Done
        </button>
      </div>
    </div>
  );
};

// 6. Producer / Artisan Registration Modal
export const ProducerRegisterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Gilgit');
  const [trade, setTrade] = useState('Cherry & Apricot Grower');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-surface-container pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">assignment</span>
            <h3 className="font-headline-md text-primary font-bold text-[17px]">
              Local Producer & Artisan Registry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-on-surface-variant text-[12px]">
          Enroll to receive direct subsidies, solar dryer equipment grants, and export packaging facility support from the GB Department of Agriculture & Industry.
        </p>

        {submitted ? (
          <div className="p-4 bg-secondary-container text-on-secondary-container rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[26px]">check_circle</span>
            <div>
              <h4 className="font-bold text-[14px]">Application Enrolled!</h4>
              <p className="text-[12px]">Registration token #GB-IND-{Math.floor(1000 + Math.random() * 9000)} sent via SMS. An officer will contact you within 3 working days.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface font-semibold text-[11px]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Ghulam Hassan"
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-body-md border border-surface-container text-[13px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface font-semibold text-[11px]">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-body-md border border-surface-container text-[13px]"
                >
                  <option>Gilgit</option>
                  <option>Hunza</option>
                  <option>Nagar</option>
                  <option>Ghizer</option>
                  <option>Skardu</option>
                  <option>Astore</option>
                  <option>Diamer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface font-semibold text-[11px]">Category / Trade</label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-body-md border border-surface-container text-[13px]"
                >
                  <option>Cherry & Apricot Grower</option>
                  <option>Trout Fish Farmer</option>
                  <option>Gemstone Lapidary Cutter</option>
                  <option>Patti Wool Weaver / Artisan</option>
                  <option>Walnut Wood Carver</option>
                  <option>Wild Mountain Honey Harvester</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface font-semibold text-[11px]">Mobile Number (SMS Enabled)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="03xx-xxxxxxx"
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-body-md border border-surface-container text-[13px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-lg font-bold mt-1 active:scale-[0.98] transition-all text-[13px] shadow-sm flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              Register Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 7. Emergency Simulated Call Modal
export const EmergencyCallModal: React.FC<{
  isOpen: boolean;
  number: string;
  title: string;
  onClose: () => void;
}> = ({ isOpen, number, title, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-xl border border-surface-container">
        <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-[32px] text-secondary">phone_in_talk</span>
        </div>
        <div>
          <h3 className="font-headline-md text-on-surface font-bold text-[18px]">{title}</h3>
          <span className="font-metric-display text-primary text-[24px] font-bold block mt-1">{number}</span>
          <p className="font-body-sm text-on-surface-variant text-[12px] mt-2">
            Gilgit Control Dispatch is active 24/7. An operator is ready to assist your mountain emergency or complaint.
          </p>
        </div>
        <div className="flex gap-2 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-surface-container text-on-surface font-semibold text-[13px]"
          >
            Cancel
          </button>
          <a
            href={`tel:${number}`}
            className="flex-1 py-2.5 rounded-lg bg-secondary text-on-secondary font-bold text-[13px] flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            Dial Now
          </a>
        </div>
      </div>
    </div>
  );
};

// 8. Notifications Drawer
export const NotificationsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectNotice: (n: NoticeItem) => void;
}> = ({ isOpen, onClose, onSelectNotice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-surface-container pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">notifications_active</span>
            <h3 className="font-headline-md text-primary font-bold text-[17px]">
              Civic Bulletins & Live Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {NOTICES_DATA.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onSelectNotice(n);
                onClose();
              }}
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer border border-surface-container flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-md px-2 py-0.5 rounded bg-surface-container text-primary font-bold text-[10px]">
                  {n.dept}
                </span>
                <span className="font-label-md text-outline text-[11px]">{n.time}</span>
              </div>
              <h4 className="font-bold text-[13px] text-on-surface">{n.title}</h4>
              <p className="text-[12px] text-on-surface-variant line-clamp-2">{n.summary}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold text-[13px]"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};

// 9. Profile & Civic Desk Directory
export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-surface-container pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">account_balance</span>
            <h3 className="font-headline-md text-primary font-bold text-[17px]">
              Civic Desk Directory
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[18px]">
            GB
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[14px] text-on-surface">Gilgit-Baltistan Administration</h4>
            <span className="text-[12px] text-on-surface-variant">District Secretariat & Chief Court Road</span>
            <span className="text-[11px] text-secondary font-semibold">Active Citizen Session</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[12px]">
          <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between">
            <span className="text-outline">Commissioner Gilgit Office:</span>
            <span className="font-semibold text-on-surface">+92 5811 920200</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between">
            <span className="text-outline">Works & Communication (C&W):</span>
            <span className="font-semibold text-on-surface">+92 5811 920241</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between">
            <span className="text-outline">Tourism Department Helpline:</span>
            <span className="font-semibold text-secondary">1422 (Toll Free)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between">
            <span className="text-outline">Disaster Management (GBDMA):</span>
            <span className="font-semibold text-error">05811 920874</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold text-[13px]"
        >
          Close
        </button>
      </div>
    </div>
  );
};
