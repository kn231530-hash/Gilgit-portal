import React, { useState } from 'react';
import { PORTAL_IMAGES } from '../data/portalData';

interface TourismScreenProps {
  onOpenGuideVerifyModal: () => void;
  onOpenEmergencyCall: (number: string, title: string) => void;
  onOpenFileComplaint: () => void;
}

export const TourismScreen: React.FC<TourismScreenProps> = ({
  onOpenGuideVerifyModal,
  onOpenEmergencyCall,
  onOpenFileComplaint
}) => {
  const [complaintCategory, setComplaintCategory] = useState<'sanitation' | 'water' | 'electricity'>('sanitation');
  const [locality, setLocality] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDetails.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `GB-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket(generatedId);
      setIsSubmitting(false);
      setLocality('');
      setIssueDetails('');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 gap-5">
      {/* Alpine Weather & Critical Route Advisory Header Card */}
      <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-tertiary via-tertiary-container to-primary-container text-on-tertiary p-4 shadow-md border border-tertiary-container">
        {/* Mountain Background Graphic Texture */}
        <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
          <svg className="text-surface-bright" fill="none" height="140" viewBox="0 0 200 120" width="220">
            <path d="M0 120L60 30L100 80L140 10L200 120H0Z" fill="currentColor" />
            <path d="M120 120L150 70L170 95L200 120H120Z" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-secondary-fixed animate-ping" />
              <span className="font-label-lg text-primary-fixed font-bold text-[12px]">
                Live Travel Status
              </span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest/15 backdrop-blur-md px-2.5 py-1 rounded-full text-on-tertiary">
              <span className="material-symbols-outlined text-[15px]">update</span>
              <span className="font-label-md text-[11px]">Updated: Today 09:30 AM</span>
            </div>
          </div>

          <div>
            <h2 className="font-headline-lg-mobile text-surface-bright font-bold text-[18px]">
              Weather & Road Clearance Status
            </h2>
            <p className="font-body-sm text-surface-container-high/90 text-[12px]">
              Gilgit-Baltistan Tourism Monitoring Cell & Route Advisory
            </p>
          </div>

          {/* Live Route Matrix */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {/* Babusar Top */}
            <div className="flex flex-col bg-surface-container-lowest/15 backdrop-blur-sm p-2 rounded-lg text-center items-center">
              <span className="material-symbols-outlined text-[20px] text-tertiary-fixed mb-0.5">
                landscape
              </span>
              <span className="font-label-md text-surface-container-high truncate w-full text-[11px] font-semibold">
                Babusar Top
              </span>
              <span className="inline-flex items-center gap-1 font-label-md text-secondary-fixed mt-1 font-bold text-[11px]">
                <span className="material-symbols-outlined text-[13px]">check_circle</span> Open
              </span>
              <span className="font-body-sm text-surface-container-high/80 mt-0.5 text-[11px]">
                4°C | Clear
              </span>
            </div>

            {/* Khunjerab Pass */}
            <div className="flex flex-col bg-surface-container-lowest/15 backdrop-blur-sm p-2 rounded-lg text-center items-center">
              <span className="material-symbols-outlined text-[20px] text-tertiary-fixed mb-0.5">
                ac_unit
              </span>
              <span className="font-label-md text-surface-container-high truncate w-full text-[11px] font-semibold">
                Khunjerab Pass
              </span>
              <span className="inline-flex items-center gap-1 font-label-md text-secondary-fixed mt-1 font-bold text-[11px]">
                <span className="material-symbols-outlined text-[13px]">check_circle</span> Normal
              </span>
              <span className="font-body-sm text-surface-container-high/80 mt-0.5 text-[11px]">
                -3°C | Snowfall
              </span>
            </div>

            {/* Gilgit Airport */}
            <div className="flex flex-col bg-surface-container-lowest/15 backdrop-blur-sm p-2 rounded-lg text-center items-center">
              <span className="material-symbols-outlined text-[20px] text-tertiary-fixed mb-0.5">
                flight_takeoff
              </span>
              <span className="font-label-md text-surface-container-high truncate w-full text-[11px] font-semibold">
                Flights (GIL)
              </span>
              <span className="inline-flex items-center gap-1 font-label-md text-primary-fixed mt-1 font-bold text-[11px]">
                <span className="material-symbols-outlined text-[13px]">schedule</span> Expected
              </span>
              <span className="font-body-sm text-surface-container-high/80 mt-0.5 text-[11px]">
                PK-605 On Time
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Emergency Access Bar */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onOpenEmergencyCall('1122', 'Rescue 1122 Emergency Services')}
          className="flex items-center justify-between p-3 bg-error-container text-on-error-container rounded-xl shadow-sm active:scale-95 transition-transform border border-error/20"
        >
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="font-headline-md leading-none font-bold text-[14px]">Rescue 1122</span>
              <span className="font-label-md opacity-80 mt-0.5 text-[11px]">Medical & Accident</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px]">call</span>
        </button>

        <button
          onClick={() => onOpenEmergencyCall('1422', 'GB Tourist Police & Helpline')}
          className="flex items-center justify-between p-3 bg-secondary-container text-on-secondary-container rounded-xl shadow-sm active:scale-95 transition-transform border border-secondary/20"
        >
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="font-headline-md leading-none font-bold text-[14px]">Tourist Helpline</span>
              <span className="font-label-md opacity-80 mt-0.5 text-[11px]">24/7 Guidance (1422)</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px]">call</span>
        </button>
      </div>

      {/* Regional Scenery & Tourism Notice Feature */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-sm bg-surface-container border border-surface-container">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${PORTAL_IMAGES.attabadLake})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent flex flex-col justify-end p-4 text-on-primary">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-secondary-fixed text-[16px]">verified</span>
            <span className="font-label-md text-secondary-fixed font-semibold text-[11px]">
              GB Tourism Department Verified Portal
            </span>
          </div>
          <h3 className="font-headline-md text-surface-bright font-bold text-[16px]">
            Safe Travel & Trusted Tourism Services
          </h3>
          <p className="font-body-sm text-surface-container-high/90 text-[12px]">
            All travel guides, hotel tariffs, and jeep services are regulated under official rates
          </p>
        </div>
      </div>

      {/* Tourism Operations Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">travel_explore</span>
            <h3 className="font-headline-md text-primary font-bold text-[16px]">
              Certified Travel Services & Registration
            </h3>
          </div>
          <span className="font-label-md text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full text-[11px]">
            Official Regulation
          </span>
        </div>

        <div className="space-y-3">
          {/* 1. Certified Mountain Expedition & Guides */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-3 border border-surface-container">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">hiking</span>
                </div>
                <div>
                  <h4 className="font-label-lg text-on-surface font-bold text-[14px]">
                    Licensed GB Trekking Guides & Porters
                  </h4>
                  <p className="font-body-sm text-on-surface-variant text-[12px]">
                    GB Tourism certified high-altitude porter registry
                  </p>
                </div>
              </div>
              <span className="bg-surface-container-low text-primary text-label-md px-2 py-1 rounded-full font-semibold text-[11px]">
                1,420 Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-surface-container-low p-2 rounded-lg text-left">
                <span className="font-label-md text-on-surface-variant text-[11px]">Fixed Daily Porter Wage</span>
                <div className="font-metric-sm text-primary mt-0.5 font-bold text-[14px]">
                  Rs. 3,800 <span className="font-body-sm text-on-surface-variant font-normal text-[11px]">/ day</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-2 rounded-lg text-left">
                <span className="font-label-md text-on-surface-variant text-[11px]">Govt Medical Insurance</span>
                <div className="font-metric-sm text-secondary mt-0.5 font-bold text-[14px]">100% Coverage</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={onOpenGuideVerifyModal}
                className="flex items-center justify-center gap-1.5 w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-lg font-semibold active:bg-primary-container transition-colors shadow-sm text-[13px]"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Verify Guide or Check Registration
              </button>
            </div>
          </div>

          {/* 2. Hotel & Homestay Quality Inspections */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-3 border border-surface-container">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">hotel</span>
                </div>
                <div>
                  <h4 className="font-label-lg text-on-surface font-bold text-[14px]">
                    Hotel & Homestay Quality Inspections
                  </h4>
                  <p className="font-body-sm text-on-surface-variant text-[12px]">
                    Regular assessment of hygiene, rates, and amenities
                  </p>
                </div>
              </div>
              <span className="bg-secondary-container text-on-secondary-container text-label-md px-2 py-1 rounded-full font-bold text-[11px]">
                Inspected
              </span>
            </div>

            <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">policy</span>
                <span className="font-body-sm text-on-surface text-[12px]">Report unauthorized overcharging immediately</span>
              </div>
              <button
                onClick={onOpenFileComplaint}
                className="text-primary font-label-md underline hover:text-secondary font-semibold text-[11px]"
              >
                File Complaint
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-surface-container-low py-1.5 px-2 rounded border border-surface-container">
                <span className="font-label-md text-on-surface-variant block text-[11px]">Hunza & Nagar</span>
                <span className="font-metric-sm text-on-surface font-bold text-[14px]">312 Hotels</span>
              </div>
              <div className="bg-surface-container-low py-1.5 px-2 rounded border border-surface-container">
                <span className="font-label-md text-on-surface-variant block text-[11px]">Gilgit City</span>
                <span className="font-metric-sm text-on-surface font-bold text-[14px]">184 Hotels</span>
              </div>
              <div className="bg-surface-container-low py-1.5 px-2 rounded border border-surface-container">
                <span className="font-label-md text-on-surface-variant block text-[11px]">Skardu & Ghanche</span>
                <span className="font-metric-sm text-on-surface font-bold text-[14px]">240 Hotels</span>
              </div>
            </div>
          </div>

          {/* 3. Fixed 4x4 Jeep Union Rate List */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-3 border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">directions_car</span>
                </div>
                <div>
                  <h4 className="font-label-lg text-on-surface font-bold text-[14px]">
                    Fixed 4x4 Jeep Union Rate List
                  </h4>
                  <p className="font-body-sm text-on-surface-variant text-[12px]">
                    District Administration approved 4x4 tariff schedule
                  </p>
                </div>
              </div>
              <span className="bg-surface-container-low text-on-surface-variant text-label-md px-2 py-0.5 rounded text-[11px] font-semibold">
                Season 2024
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg text-left border border-surface-container">
                <div>
                  <span className="font-label-lg text-on-surface block font-semibold text-[13px]">
                    Gilgit to Naltar Bala (Round Trip)
                  </span>
                  <span className="font-body-sm text-on-surface-variant text-[11px]">
                    4x4 Prado / Jeep - Full Day
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-metric-sm text-primary block font-bold text-[14px]">Rs. 11,500</span>
                  <span className="font-label-md text-secondary font-semibold text-[11px]">Fixed Rate</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg text-left border border-surface-container">
                <div>
                  <span className="font-label-lg text-on-surface block font-semibold text-[13px]">
                    Raikot Bridge to Tato (Fairy Meadows)
                  </span>
                  <span className="font-body-sm text-on-surface-variant text-[11px]">
                    Dedicated Jeep Track - One Way / Round
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-metric-sm text-primary block font-bold text-[14px]">Rs. 13,000</span>
                  <span className="font-label-md text-secondary font-semibold text-[11px]">Fixed Rate</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg text-left border border-surface-container">
                <div>
                  <span className="font-label-lg text-on-surface block font-semibold text-[13px]">
                    Gilgit to Shandur / Phander Valley
                  </span>
                  <span className="font-body-sm text-on-surface-variant text-[11px]">
                    Coaster Service Per Passenger
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-metric-sm text-primary block font-bold text-[14px]">Rs. 1,450</span>
                  <span className="font-label-md text-secondary font-semibold text-[11px]">Public Tariff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Card: GMC Sanitation & Environmental Care */}
      <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[24px]">eco</span>
          <h3 className="font-headline-md text-on-surface font-bold text-[15px]">
            Clean & Green Gilgit Campaign (GMC)
          </h3>
        </div>
        <p className="font-body-md text-on-surface-variant text-[13px] leading-relaxed">
          Help keep our valleys pristine. Dispose of plastic and litter only in designated bins. Sanitation staff is on duty round the clock.
        </p>
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 bg-surface-container-lowest p-2 rounded-lg text-center border border-surface-container">
            <span className="material-symbols-outlined text-primary text-[20px]">delete_sweep</span>
            <span className="font-label-md block text-on-surface mt-0.5 text-[11px]">Daily Waste Lifted</span>
            <span className="font-metric-sm text-primary font-bold text-[14px]">38 Tons / Day</span>
          </div>
          <div className="flex-1 bg-surface-container-lowest p-2 rounded-lg text-center border border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[20px]">recycling</span>
            <span className="font-label-md block text-on-surface mt-0.5 text-[11px]">Plastic Bags Ban</span>
            <span className="font-metric-sm text-secondary font-bold text-[14px]">100% Enforced</span>
          </div>
        </div>
      </div>

      {/* Citizen Desk & Municipal Public Complaints */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">assignment_turned_in</span>
            <h3 className="font-headline-md text-primary font-bold text-[16px]">
              Citizen Grievance Redressal Cell
            </h3>
          </div>
          <span className="font-label-md text-secondary font-semibold text-[11px]">Online Portal</span>
        </div>

        {/* Interactive Civic Complaint Form Card */}
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-3 border border-surface-container">
          <div>
            <h4 className="font-label-lg text-on-surface font-bold text-[14px]">
              Instant Citizen Complaint & Service Request
            </h4>
            <p className="font-body-sm text-on-surface-variant text-[12px]">
              Relevant departments are legally mandated to resolve issues within 24 to 48 hours
            </p>
          </div>

          {/* Quick Issue Type Selector */}
          <div className="space-y-1.5">
            <label className="font-label-md text-on-surface-variant block text-[11px]">
              Select Issue Category:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setComplaintCategory('sanitation')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                  complaintCategory === 'sanitation'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
                <span className="font-label-md mt-1 font-semibold text-[11px]">Sanitation</span>
              </button>
              <button
                type="button"
                onClick={() => setComplaintCategory('water')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                  complaintCategory === 'water'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">water_drop</span>
                <span className="font-label-md mt-1 font-semibold text-[11px]">Drinking Water</span>
              </button>
              <button
                type="button"
                onClick={() => setComplaintCategory('electricity')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                  complaintCategory === 'electricity'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
                <span className="font-label-md mt-1 font-semibold text-[11px]">Electricity Fault</span>
              </button>
            </div>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmitComplaint} className="space-y-3">
            <div>
              <label className="font-label-md text-on-surface-variant block mb-1 text-[11px]">
                Locality / Union Council / Address
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Kashrote, Jutial, Danyore, Naltar Road..."
                  className="w-full bg-surface-container-low text-on-surface font-body-md pl-3 pr-10 py-2.5 rounded-lg outline-none focus:bg-surface-container-high transition-colors text-left text-[13px] border border-surface-container"
                  required
                />
                <span className="material-symbols-outlined text-outline absolute right-3 text-[18px]">
                  location_on
                </span>
              </div>
            </div>

            <div>
              <label className="font-label-md text-on-surface-variant block mb-1 text-[11px]">
                Issue Details & Mobile Number
              </label>
              <textarea
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                placeholder="Brief description of the problem and contact number..."
                rows={2}
                className="w-full bg-surface-container-low text-on-surface font-body-md p-3 rounded-lg outline-none focus:bg-surface-container-high transition-colors text-left text-[13px] border border-surface-container"
                required
              />
            </div>

            {/* Submission Feedback */}
            {submittedTicket && (
              <div className="p-3 bg-secondary-container text-on-secondary-container rounded-lg text-left font-body-sm text-[12px] border border-secondary/20 flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">
                  task_alt
                </span>
                <div>
                  Thank you! Your grievance has been recorded. Tracking ID:{' '}
                  <span className="font-metric-sm font-bold">{submittedTicket}</span> has been dispatched to municipal ward inspectors.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-lg font-bold active:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1.5 text-[13px]"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </button>

              <button
                type="button"
                onClick={() => onOpenEmergencyCall('05811920251', 'Gilgit Municipal Corporation Desk')}
                className="flex items-center justify-center gap-1 bg-surface-container-high text-primary px-3 py-3 rounded-lg font-label-lg font-semibold active:bg-surface-variant transition-colors text-[13px]"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Direct Call
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recent Public Service Tracking Feed */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-3 border border-surface-container">
        <div className="flex items-center justify-between">
          <h4 className="font-label-lg text-on-surface font-bold text-[14px]">
            Recent Solved Issues (Live Monitor)
          </h4>
          <span className="font-label-md text-secondary font-semibold flex items-center gap-0.5 text-[11px]">
            <span className="material-symbols-outlined text-[15px]">done_all</span> 94% Resolution Rate
          </span>
        </div>

        <div className="divide-y divide-surface-container-low space-y-2">
          {/* Resolution 1 */}
          <div className="pt-2 flex items-start justify-between">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div>
                <span className="font-label-lg text-on-surface block font-semibold text-[13px]">
                  Kashrote Nullah Clearance Completed
                </span>
                <span className="font-body-sm text-on-surface-variant text-[11px]">
                  Complaint # GB-8412 • GMC team cleared debris
                </span>
              </div>
            </div>
            <span className="font-label-md text-outline text-[11px]">2h ago</span>
          </div>

          {/* Resolution 2 */}
          <div className="pt-2 flex items-start justify-between">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div>
                <span className="font-label-lg text-on-surface block font-semibold text-[13px]">
                  Chinar Bagh Streetlights Restored
                </span>
                <span className="font-body-sm text-on-surface-variant text-[11px]">
                  WAPDA Gilgit team replaced damaged cable
                </span>
              </div>
            </div>
            <span className="font-label-md text-outline text-[11px]">5h ago</span>
          </div>
        </div>
      </div>

      {/* Civic Tourism Ethics & Environmental Guidelines */}
      <div className="rounded-xl bg-surface-container-high p-4 space-y-1.5 text-on-surface border border-surface-container">
        <div className="flex items-center gap-1.5 text-primary">
          <span className="material-symbols-outlined text-[20px]">info</span>
          <span className="font-label-lg font-bold text-[13px]">Visitor & Citizen Conduct Guidelines</span>
        </div>
        <ul className="font-body-sm text-on-surface-variant space-y-1 list-disc pl-4 pt-1 text-[12px] leading-relaxed">
          <li>Respect local cultural values, indigenous traditions, and ecological sensitivity at all times.</li>
          <li>Pack out all non-biodegradable waste during treks and deposit it in municipal collection bins.</li>
          <li>In case of any emergency, overcharging, or harassment, immediately dial the Tourist Helpline at 1422.</li>
        </ul>
      </div>
    </div>
  );
};
