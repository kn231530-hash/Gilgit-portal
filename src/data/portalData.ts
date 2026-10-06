import { ProjectItem, NoticeItem, MandiRate, GuideRecord } from '../types';

export const PORTAL_IMAGES = {
  emblem: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu3s0kB_ajyKpTyFGB9RAJdgE8euU89L97cnOZIr-QoIOC7cal0tuzWZLqvV117aNTwgC4vu2aZ6u72-3SkMMnpb6inRRdir6ajup9t3NVo8oB1sn2Hljd0OaXPGozJgKUxU_X4C-ES3lz7PDediY07_QcQcamnv2xqSr1KW-yzIpZob13sTg4oAAcGtmhwl3fXJXa0dW8LN_u28lLBRPKDBV4X0kr4vYPOxfsiY86',
  heroBackdrop: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA93gunJHknmsPpC9-WEy5hfeuFvGlNZELO2475NC8DvLofTV7F670apnsV69WKMuy_vvW8NpvlYgMoW4B4xwHBsDH3wc0F6wW4Fa2rSbKGuOATAenwVQ_XVxSEWNdyJZXtMDnCBoZikaIllOjzDqmMvt9HoMTXfJx0XUork6HpEPfuHfcb9woYMeZpka1F7Fm7vLgCNEg3kJ0-WicJYN7JvdsaN9GbeYh8m0rhU4Oz',
  bypassWork: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIRQt-7zJI4vt4KNnyxI-ANc5bzYUtfQ2mA2TKNOUC_otiklDg9RsWkuu3Ttzz0_RtHmSBSVbN6SBcQzoY0wHJNnnaUpoeX33Sm1bYsd6Uqy4dco94RSNDKvqVHm1vO2Dbqy06r5dWWaM1RxXyCVy7-lW5KVxIVkgNMLpVMkOqbBoW70-hTY-ixv3vj53V36oYcHQr7YejITEftYBAYgg4pG54gqqnAU__SU5MWDKH',
  naltarHydro: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8_o5ysPN30sOGP3eMqrvtGWU_gGm_gcXlU9-CeDKm6s2tTCoVCJ9Nb-M_D7a3mB71UBBkytmdbEJOzxLoCCjpnuJIbjivlaErDGGyL7KEzPC0fqIAznJhfZHeM8NSeZDQ62kDfVvayXq37bZLDfPPvwlvncUHdqEPMMDv96NkngEGYc2z2qxbYwNIachvE9odCY0jhO1uA-S8Y8TjqxGZK2MC-cgDRHDt2BIO-Ft8',
  orchardsHarvest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhgThiOWNR57yOdgyYtA4U6lFZwUsz_9jHE2DE6mcsAjrHvWZY1IDFGxozRMzWEmyx1Pqri98MUrB9xR7d9MQ9XYNjb6Ny_grF4AiDozlpHk-oSZLt9DmVhx-O19HvgimxFMDrPvb9nGKEdjwXJP7FWe3NgfoQvHObwFoqf0kq1lTb1UXdya06GmT8c7JS0k292BhbmgmE8CJJjnu2QoVkMKqIkmvbWVG3Lg4gpn8J',
  waterSupply: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj6xnxdLMPJvgG9Ug_esOyFJSDZB43aalmoZyK1DmJnIWuIRKvO1CRO2qccZzUrtJoL_BuI3vGMEDRZOWMPDzDYkDc0r7IfX3kH-LjG7tsEUW7XfHDiKK4Msy4nfvy3_tejUHNRRPC6hOSVO2rCrgqWHQ5j-qSz_47tF3wNUu_v_9Ztb2ujyse6W9qZUrDnCA3yYY6zclSylJ5oK8OGUVHeQCLiwxkNF08CH9x-Dmn',
  naltarHydroProject: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpMbj3Eb_KRqf71OaLekxM3ba4g6JAD4HBG-TbanHaZNXaOt8wEHR1vCQ-ISSasTM4OHpB39XNi-APbRGDU3XV-Xn-3vpQaxNBhA8t-YhpczYXDAKqdvL5m7VmHTp7yDeHFPClsZP6Wt-B6BPbcaL3B940kpeYK4uYESXkv1cKE4hGW-_imzTvmXCWQ7YILbGdc5qC2mt6w8DSYtEVpzX1Sr8RQXZMzssEXISaNnFC',
  shandurExpressway: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtDFRWk2DjUa6__kisYj3_GBvhxbZxrMN-ilC2ojNBt1FRRL9P1rTSbO8fIh3Uyy-TUMmLurrSmLHVYuuzHCIP_FU75p_KuXRGanr1K4-NMMCIEc65C6kuAr0KMX5pDFWwJ4ZuPMwJ-ckC9XOgqtRWTKyk4XrjR9Z0xuQkA1q6zew7iD6Io0ioCM2hzTJhs6R0Pwuee-rWTtBX79MxGreOvHb9eVLcXJkat3rw4zcu',
  kiuScienceBlock: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3M1xz130DjLJdDlRKb-7g8qNYPzqGAlQ434m9FlhNQff4_nFLHgohygu2YIIg0p4r308OVbcCZrKeJAYJSyX_tgEU5wOZWX8HVo8AiBaW8Wti5Aps-CA2VExLULTYSmQfVivxP6kIfgL4eBoU0rzXIBXI4cCzOrmGHXrRE4Wbb5Wroie9vZT_0z40BzqmTnbftkomZnlaFEnst5_aZnN29tGsFjLbOMOu6hpdxJy0',
  dhqHospital: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJRrmyn3_-YoH2pSHiRwigeOXEcV3ESlc-ZqCCFKgd_qBtZ3E2xdsoV92ZFXZd-g-hHF9Q2u0kE2H37Hxs-jkgU1DH4KqtiR7OCvolzYbu_XIWs243XrI-nVywrkZUGznu8yUOYNN5DkLqrCWhR_UGeO-d587OWtZvEMCX0vwpvb0lgYPgLQ7HtV-MNeqdj0Lb7A1UB6Ofc7dMsDpCtCr0jdBhZh8mHO3CN5fxJ3G',
  cherryApricot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACtQSolVKSRELr25dMbCb-NKTYimBQdoqMZMWbwwEp5M-xUMQ3eiTPlPrvJFKMjsdf32DQtM7Cy8xYD4W2KA92TEpb0JLvYZ-YqtCNZZJqltouukcyNeXeDZVfM5ZDSruVDcGtktTyMu6YTl6Fgx2Dbf2U5yiJ5ndHWtJu3mE-NTKnziGe9NGtUEgR-wTi-44GWv1ldsPx9lebLnzbXiert2Cr-MCUjRy13a18wI0p',
  gemMarket: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUMvdb8XS6GyV83JSwWw3amY6__pF_cyFa0fRH1bYYQI48USxKnC29gMFYBNPupgh8StOSrIXOmry6Qw0ffByq_C80koY7n4E1UFHTCJLkDN9H9c8URrVW6YV31vgRWFfuqR8H9my6ve38jdf8yu8CcQvVLWx6m2J0AlxNc3dEVIwWCzPBYtwAQJXIYVJ-VhJFvAhx9_p7jY3EbTJXztr6TGmGlhS0KVkiItkBLhGk',
  gilgitiCap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFSmk92aIEuguroenhDKC7VKW43BXSyzaEtdI0Uq8WGl81KcEojfD8d1tJbtB1rdQJ7f-efo3eX3TKen7IyTkVyHj0QC-5dvxvDdL9VXQrKbhk3-9xJ-paACeZIrymzKxvtRk4Pxc6sC4nDP6YVHBxJD1oV7Yng8LBFxIVjfUhewFi4RXZVnG3RvKhKK_v86kLpi-TnPB1ud-AB3xbkkTFe6kHx3PpU5pkkVVGmFIB',
  attabadLake: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAJGlFJJsqGU5x3rLgrOG1bMrWYthECu7jZSPM5MB7O523d63T7X_CDd8ASTkXCWBRb-K_gLBncpMY3m9dzkLwtbA2DVAVGZNBotaaXOKipXYaB4o_T-FeB3wFy1c_D5tZIVi_MoJGvNPW4cREYgZYUJ0Zq1muKHFk4YT9fI3CFRirsuLah3vM1SRGv9gewcBbvd1MUGJUJzSNAtRVg4USU5xlF6vX1u6XQ4CLlYJF',
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Greater Gilgit Water Supply Scheme',
    category: 'hydro',
    categoryLabel: 'Drinking Water & Sanitation',
    badge: '95% Complete',
    badgeType: 'complete',
    location: 'Gilgit District',
    description: 'Clean potable water transmission network covering a population of 250,000 including Domiyal, Danyore, and Konodas.',
    progressPercent: 95,
    costLabel: 'Sanctioned Budget',
    costValue: 'PKR 18.5 Billion',
    agencyLabel: 'Supervising Agency',
    agency: 'Public Health Dept GB',
    imageUrl: PORTAL_IMAGES.waterSupply,
    imageAlt: 'Modern water filtration and reservoir facility surrounded by rugged Karakoram mountains in Gilgit',
    detailedSpecs: {
      scope: 'Dual 32-inch high-density polyethylene transmission line from Kargah Nullah with gravity sand sedimentation tanks and automated chlorination units.',
      beneficiaries: '250,000 residents across 9 Union Councils.',
      targetCompletion: 'December 2024 (Testing Phase)',
      contractor: 'China Gezhouba Group & GB Public Health Engineering JV'
    }
  },
  {
    id: 'proj-2',
    title: 'Naltar Hydropower Project (Phase 2 - 16 MW)',
    category: 'hydro',
    categoryLabel: 'Energy & Power',
    badge: '78% Complete',
    badgeType: 'progress',
    location: 'Naltar Valley',
    description: 'Clean uninterrupted eco-friendly hydroelectricity for Gilgit city; transmission line installation in final phases.',
    progressPercent: 78,
    costLabel: 'Total Cost',
    costValue: 'PKR 24.2 Billion',
    agencyLabel: 'Supervising Agency',
    agency: 'Water & Power Dept GB',
    imageUrl: PORTAL_IMAGES.naltarHydroProject,
    imageAlt: 'Naltar hydro power project water turbines and powerhouse under construction in a pine valley',
    detailedSpecs: {
      scope: 'Run-of-river hydel generation station with 3 Pelton turbine sets, 33kV switchyard, and 28km grid link to Danyore Central Substation.',
      beneficiaries: 'Gilgit Municipal Grid Feeder 1 & 2 (80,000 domestic connections).',
      targetCompletion: 'April 2025',
      contractor: 'Voith Hydro GmbH & GB Power Works'
    }
  },
  {
    id: 'proj-3',
    title: 'Gilgit - Shandur Expressway (Section 1)',
    category: 'roads',
    categoryLabel: 'Highway Infrastructure',
    badge: '64% In Progress',
    badgeType: 'progress',
    location: 'Ghizer Road Section',
    description: 'Asphalt carpeting, retaining walls, and RCC bridge construction establishing all-weather connectivity with Chitral and KP.',
    progressPercent: 64,
    costLabel: 'Allocated Funds',
    costValue: 'PKR 49.8 Billion',
    agencyLabel: 'Supervising Agency',
    agency: 'National Highway Authority (NHA)',
    imageUrl: PORTAL_IMAGES.shandurExpressway,
    imageAlt: 'Wide asphalt highway cutting along deep gorge and turquoise river between mountains towards Shandur pass',
    detailedSpecs: {
      scope: 'Widening to 36ft two-lane mountain highway standard with rockfall barriers, 14 box culverts, and 3 pre-stressed girder bridges.',
      beneficiaries: 'Regional transit trade connecting Gilgit to Chitral, Swat, and national CPEC western routes.',
      targetCompletion: 'October 2025',
      contractor: 'Frontier Works Organisation (FWO) & NHA'
    }
  },
  {
    id: 'proj-4',
    title: 'Karakoram International University Science Block',
    category: 'health',
    categoryLabel: 'Higher Education',
    badge: '100% Completed & Active',
    badgeType: 'complete',
    location: 'KIU Campus',
    description: 'State-of-the-art glaciology and environmental research lab, 14 international standard lecture halls, and a digital library.',
    progressPercent: 100,
    costLabel: 'Total Cost',
    costValue: 'PKR 6.1 Billion',
    agencyLabel: 'Supervising Agency',
    agency: 'HEC / GBWD',
    imageUrl: PORTAL_IMAGES.kiuScienceBlock,
    imageAlt: 'Modern university science laboratory building at Karakoram International University Gilgit with snow peaks',
    detailedSpecs: {
      scope: '4-story seismically isolated academic facility with Cryosphere & Glaciology GIS mapping wing, seismic sensor network, and solar backup array.',
      beneficiaries: '4,500 undergraduate and graduate researchers across GB.',
      targetCompletion: 'Commissioned & Active',
      contractor: 'GB Building Division & HEC Infrastructure Cell'
    }
  },
  {
    id: 'proj-5',
    title: 'Regional Headquarter (DHQ) Hospital Cardiology Ward Expansion',
    category: 'health',
    categoryLabel: 'Healthcare Facilities',
    badge: '82% Progress',
    badgeType: 'progress',
    location: 'Gilgit City',
    description: '120-bed advanced cardiovascular ward, angiography lab unit, and modernized emergency trauma response center.',
    progressPercent: 82,
    costLabel: 'Estimated Budget',
    costValue: 'PKR 9.4 Billion',
    agencyLabel: 'Supervising Agency',
    agency: 'Health Department Gilgit-Baltistan',
    imageUrl: PORTAL_IMAGES.dhqHospital,
    imageAlt: 'DHQ Hospital Gilgit cardiology ward modern medical center with ambulance bay and mountain backdrop',
    detailedSpecs: {
      scope: 'Cath-lab installation, coronary care unit (CCU), dedicated oxygen generator plant, and telemedicine consultation suites connected to NICVD Karachi.',
      beneficiaries: 'Over 600,000 residents across Gilgit, Diamer, and Ghizer divisions.',
      targetCompletion: 'January 2025',
      contractor: 'National Construction Consortium & GB Health Engineering'
    }
  }
];

export const NOTICES_DATA: NoticeItem[] = [
  {
    id: 'notice-1',
    dept: 'Food Department',
    time: 'Today, 10:30 AM',
    title: 'Digital Wheat Quota Distribution System Rolled Out Across Gilgit District',
    summary: 'Citizens can renew and verify their ration cards at the nearest Civil Supply Depot.',
    fullText: 'The Food Department Gilgit-Baltistan has transitioned 100% of municipal flour and wheat grain subsidies to the digital NADRA-linked quota system. Citizens are advised to verify their biometric family registration at their local Civil Supply Depot before the 25th of the month. Subsidized flour rates remain capped at Rs. 2,000 per 40kg bag.',
    icon: 'campaign',
    category: 'food'
  },
  {
    id: 'notice-2',
    dept: 'Tourism & Culture',
    time: 'Yesterday Evening',
    title: 'Tourist Guide & High Altitude Porter Registration Opens for Season 2025',
    summary: 'Specialized mountain safety SOPs and emergency training sessions conducted by Tourist Police.',
    fullText: 'GB Tourism Department invites all local guides, high-altitude porters (HAPs), and tour operators to register or renew their accreditation. Compulsory crevasse rescue and Wilderness First Aid certifications will be conducted in coordination with the Alpine Club of Pakistan and Rescue 1122 starting next Monday.',
    icon: 'hotel_class',
    category: 'tourism'
  },
  {
    id: 'notice-3',
    dept: 'Power & Energy',
    time: '2 Days Ago',
    title: 'Danyore Substation Transformer Overhaul & Additional Line Installation',
    summary: 'Major progress achieved to permanently stabilize voltage fluctuations on municipal grid feeders.',
    fullText: 'The Water and Power Department successfully energized a new 20 MVA step-down transformer at the Danyore Substation. This upgrade effectively mitigates load-shedding during peak winter morning hours and stabilizes voltage drops across Konodas, Jutial, and Airport Road circuits.',
    icon: 'build',
    category: 'power'
  }
];

export const MANDI_RATES_DATA: MandiRate[] = [
  { id: 'rate-1', commodity: 'Dried Apricots (Grade A)', rate: 'Rs. 1,250', unit: '/kg', icon: 'nutrition', trend: 'up' },
  { id: 'rate-2', commodity: 'Wild Mountain Honey', rate: 'Rs. 2,800', unit: '/kg', icon: 'hive', trend: 'stable' },
  { id: 'rate-3', commodity: 'Thin-shell Almonds (Wholesale)', rate: 'Rs. 1,600', unit: '/kg', icon: 'grain', trend: 'up' },
  { id: 'rate-4', commodity: 'Raw Aquamarine (Gem Mandi)', rate: 'Rs. 4,500', unit: '/ct', icon: 'diamond', trend: 'up' },
  { id: 'rate-5', commodity: 'Organic Kagzi Walnuts', rate: 'Rs. 950', unit: '/kg', icon: 'spa', trend: 'stable' },
  { id: 'rate-6', commodity: 'Fresh Rainbow Trout (Farm Gate)', rate: 'Rs. 2,200', unit: '/kg', icon: 'phishing', trend: 'stable' },
];

export const REGISTERED_GUIDES: GuideRecord[] = [
  { id: 'g-1', name: 'Sher Khan', licenseNo: 'GB-HAP-0482', district: 'Gilgit', specialization: 'K2 & Broad Peak High Altitude Guide', status: 'Verified', experienceYears: 14 },
  { id: 'g-2', name: 'Muhammad Ali Baig', licenseNo: 'GB-TG-1109', district: 'Hunza', specialization: 'Rakaposhi Basecamp & Rush Lake Trek', status: 'Active', experienceYears: 9 },
  { id: 'g-3', name: 'Ghulam Abbas', licenseNo: 'GB-HAP-0891', district: 'Nagar', specialization: 'Spantik & Golden Peak Expedition Guide', status: 'Verified', experienceYears: 12 },
  { id: 'g-4', name: 'Zeeshan Karim', licenseNo: 'GB-TG-1422', district: 'Ghizer', specialization: 'Shandur Pass & Phander Valley Eco-guide', status: 'Active', experienceYears: 6 },
];
