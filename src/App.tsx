import { useState, useEffect } from 'react';
import { TabType, ProjectItem, NoticeItem } from './types';
import { PROJECTS_DATA, NOTICES_DATA } from './data/portalData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AdminPanel } from './components/AdminPanel';
import { OverviewScreen } from './components/OverviewScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { EconomyScreen } from './components/EconomyScreen';
import { TourismScreen } from './components/TourismScreen';
import {
  SubmitProposalModal,
  ProjectDetailsModal,
  NoticeDetailModal,
  PhotoPreviewModal,
  VerifyGuideModal,
  ProducerRegisterModal,
  EmergencyCallModal,
  NotificationsModal,
  ProfileModal,
} from './components/Modals';

function PortalApp() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    title: string;
    subtitle: string;
    url: string;
    badge: string;
  } | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isGuideVerifyModalOpen, setIsGuideVerifyModalOpen] = useState(false);
  const [isRegisterProducerModalOpen, setIsRegisterProducerModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [emergencyCall, setEmergencyCall] = useState<{ number: string; title: string } | null>(null);
  const [directoryInfo, setDirectoryInfo] = useState<{ title: string; desc: string } | null>(null);
  const [passStatusOpen, setPassStatusOpen] = useState(false);

  // Sync document title with current tab
  useEffect(() => {
    switch (currentTab) {
      case 'overview':
        document.title = 'Gilgit Portal | Civic Desk';
        break;
      case 'development-projects':
        document.title = 'Gilgit Portal | Development Projects';
        break;
      case 'economy-and-agriculture':
        document.title = 'Gilgit Portal | Economy & Agriculture';
        break;
      case 'tourism-and-services':
        document.title = 'Gilgit Portal | Tourism & Citizen Services';
        break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleOpenProjectDetails = (projectId: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  const handleOpenDirectory = (type: string) => {
    if (type === 'apricots') {
      setDirectoryInfo({
        title: 'Central Cooperative Packaging Units',
        desc: 'Cherry & Apricot packaging centers situated at Jutial Industrial Estate, Danyore Fruit Hub, and Aliabad Hunza. Contact: +92 5811 920431. Daily dispatch handling: 150 metric tons.'
      });
    } else if (type === 'gems') {
      setDirectoryInfo({
        title: 'Gems & Minerals Testing Centre Gilgit',
        desc: 'Certified Gemological Laboratory & Faceting Center under PMDC & GB Mineral Dept. Offers spectrophotometer testing, origin certificates for Aquamarine and Tourmaline, and certified hallmarking.'
      });
    } else if (type === 'saffron') {
      setDirectoryInfo({
        title: 'High-Altitude Saffron & Shilajit Registry',
        desc: 'Government subsidy program supplying certified Crocus sativus corms to Gilgit, Nagar, and Astore farmers with 50% seed price support and cold-chain dehydration training.'
      });
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Fixed Header */}
      <Header
        currentTab={currentTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-20 bg-surface min-h-screen">
        {currentTab === 'overview' && (
          <OverviewScreen
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenProjectDetails={handleOpenProjectDetails}
            onOpenNotice={(notice) => setSelectedNotice(notice)}
            onOpenComplaintModal={() => setCurrentTab('tourism-and-services')}
            onOpenPhotoModal={(photo) => setSelectedPhoto(photo)}
            onOpenPassStatusModal={() => setPassStatusOpen(true)}
          />
        )}

        {currentTab === 'development-projects' && (
          <ProjectsScreen
            onOpenProjectDetails={handleOpenProjectDetails}
            onOpenProposalModal={() => setIsProposalModalOpen(true)}
          />
        )}

        {currentTab === 'economy-and-agriculture' && (
          <EconomyScreen
            onOpenRegisterModal={() => setIsRegisterProducerModalOpen(true)}
            onOpenDirectoryModal={handleOpenDirectory}
            onOpenSamplesModal={() =>
              setDirectoryInfo({
                title: 'Walnut Wood Relief Carvings & Artisan Guild',
                desc: 'Heritage joinery centers at Kashrote, Konodas, and Chilas. Authentic walnut boxes, Qur’an rehal stands, and floral panels crafted from naturally aged dried northern walnut timber.'
              })
            }
          />
        )}

        {currentTab === 'tourism-and-services' && (
          <TourismScreen
            onOpenGuideVerifyModal={() => setIsGuideVerifyModalOpen(true)}
            onOpenEmergencyCall={(number, title) => setEmergencyCall({ number, title })}
            onOpenFileComplaint={() => {
              const el = document.getElementById('complaint-form-anchor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onChangeTab={(tab) => setCurrentTab(tab)}
      />

      {/* Interactive Modals */}
      <SubmitProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
      />

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      <PhotoPreviewModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      <VerifyGuideModal
        isOpen={isGuideVerifyModalOpen}
        onClose={() => setIsGuideVerifyModalOpen(false)}
      />

      <ProducerRegisterModal
        isOpen={isRegisterProducerModalOpen}
        onClose={() => setIsRegisterProducerModalOpen(false)}
      />

      <EmergencyCallModal
        isOpen={!!emergencyCall}
        number={emergencyCall?.number || ''}
        title={emergencyCall?.title || ''}
        onClose={() => setEmergencyCall(null)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectNotice={(notice) => setSelectedNotice(notice)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Pass Status Modal */}
      {passStatusOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-5 flex flex-col gap-3 shadow-xl border border-surface-container">
            <div className="flex items-center justify-between border-b border-surface-container pb-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[20px]">alt_route</span>
                <span>Mountain Pass Advisory</span>
              </div>
              <button
                onClick={() => setPassStatusOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[12px]">
              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <span className="font-bold text-on-surface block">Karakoram Highway (KKH)</span>
                  <span className="text-outline text-[11px]">Hassanabdal - Khunjerab</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">
                  All Traffic Open
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <span className="font-bold text-on-surface block">Babusar Pass (4,173m)</span>
                  <span className="text-outline text-[11px]">Chilas - Naran Link</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">
                  Light Vehicles Only
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <span className="font-bold text-on-surface block">Skardu - Jaglot Expressway</span>
                  <span className="text-outline text-[11px]">S-1 Highway</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">
                  Normal Traffic
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <span className="font-bold text-on-surface block">Khunjerab Border Pass</span>
                  <span className="text-outline text-[11px]">Pak-China Border Protocol</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">
                  Customs Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setPassStatusOpen(false)}
              className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold text-[13px]"
            >
              Close Advisory
            </button>
          </div>
        </div>
      )}

      {/* Directory Quick Info Modal */}
      {directoryInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-5 flex flex-col gap-3 shadow-xl border border-surface-container">
            <div className="flex items-center justify-between border-b border-surface-container pb-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[20px]">info</span>
                <span className="text-[14px]">{directoryInfo.title}</span>
              </div>
              <button
                onClick={() => setDirectoryInfo(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-body-sm text-on-surface text-[13px] leading-relaxed">
              {directoryInfo.desc}
            </p>
            <button
              onClick={() => setDirectoryInfo(null)}
              className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold text-[13px]"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default function App() {
  if (window.location.pathname.replace(/\\/+$/, '') === '/admin') {
    return <AdminPanel />;
  }
  return <PortalApp />;
}
