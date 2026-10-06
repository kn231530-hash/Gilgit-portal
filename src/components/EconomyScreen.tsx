import React, { useState } from 'react';
import { PORTAL_IMAGES, MANDI_RATES_DATA } from '../data/portalData';

interface EconomyScreenProps {
  onOpenRegisterModal: () => void;
  onOpenDirectoryModal: (type: string) => void;
  onOpenSamplesModal: () => void;
}

export const EconomyScreen: React.FC<EconomyScreenProps> = ({
  onOpenRegisterModal,
  onOpenDirectoryModal,
  onOpenSamplesModal
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'agri' | 'gems' | 'crafts'>('all');

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 pb-12 gap-5">
      {/* Interactive Live Ticker Strip: Mandi Wholesale Rates */}
      <section className="w-full bg-surface-container-high rounded-xl p-3 flex flex-col gap-2 shadow-sm border border-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-headline-md text-primary font-bold text-[15px]">
              Live Mandi Wholesale Rates
            </span>
            <span className="font-label-md text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full text-[10px]">
              Live Market
            </span>
          </div>
          <span className="font-label-md text-on-surface-variant text-[11px]">
            Today's Session
          </span>
        </div>

        {/* Scrolling horizontal metric pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {MANDI_RATES_DATA.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-lg shrink-0 shadow-sm border border-surface-container"
            >
              <span className="material-symbols-outlined text-secondary text-[18px]">
                {item.icon}
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-on-surface-variant text-[10px]">
                  {item.commodity}
                </span>
                <span className="font-metric-sm text-primary font-bold text-[13px]">
                  {item.rate} <span className="font-body-sm text-on-surface-variant text-[11px] font-normal">{item.unit}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full font-label-lg shrink-0 transition-transform active:scale-95 text-[12px] ${
            selectedFilter === 'all'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          All Sectors
        </button>
        <button
          onClick={() => setSelectedFilter('agri')}
          className={`px-4 py-2 rounded-full font-label-lg shrink-0 transition-transform active:scale-95 text-[12px] ${
            selectedFilter === 'agri'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Agriculture & Livestock
        </button>
        <button
          onClick={() => setSelectedFilter('gems')}
          className={`px-4 py-2 rounded-full font-label-lg shrink-0 transition-transform active:scale-95 text-[12px] ${
            selectedFilter === 'gems'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Gems & Minerals
        </button>
        <button
          onClick={() => setSelectedFilter('crafts')}
          className={`px-4 py-2 rounded-full font-label-lg shrink-0 transition-transform active:scale-95 text-[12px] ${
            selectedFilter === 'crafts'
              ? 'bg-primary text-on-primary font-semibold'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Handicrafts & Skills
        </button>
      </div>

      {/* Regional Economic Impact Banner */}
      <div className="relative overflow-hidden bg-primary-container text-on-primary rounded-xl p-4 shadow-md border border-primary-container">
        <div className="absolute -right-6 -bottom-8 w-32 h-32 rounded-full bg-secondary-container/20 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-label-md bg-secondary-fixed text-on-secondary-fixed px-2.5 py-0.5 rounded-full font-bold text-[11px]">
              Local Economy Pulse
            </span>
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
              trending_up
            </span>
          </div>
          <h2 className="font-headline-lg-mobile leading-tight text-on-primary font-bold text-[18px]">
            Gilgit Artisans, Farmers & Natural Resources
          </h2>
          <p className="font-body-sm text-on-primary-container max-w-sm text-[12px] text-white/90">
            Export-grade agricultural produce, brilliant gemstones, and centuries-old wood craftsmanship form the economic backbone of Gilgit-Baltistan.
          </p>
          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-on-primary-container/20">
            <div className="flex flex-col">
              <span className="font-metric-sm text-surface-bright font-bold text-[15px]">72%</span>
              <span className="font-label-md text-on-primary-container text-[11px]">Agri Workforce</span>
            </div>
            <div className="flex flex-col">
              <span className="font-metric-sm text-surface-bright font-bold text-[15px]">$14M+</span>
              <span className="font-label-md text-on-primary-container text-[11px]">Annual Exports</span>
            </div>
            <div className="flex flex-col">
              <span className="font-metric-sm text-surface-bright font-bold text-[15px]">+18,500</span>
              <span className="font-label-md text-on-primary-container text-[11px]">Registered Artisans</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Agriculture & Orchards */}
      {(selectedFilter === 'all' || selectedFilter === 'agri') && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[20px]">agriculture</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-primary font-bold text-[16px]">
                  Agriculture, Orchards & Farming
                </h3>
                <span className="font-label-md text-on-surface-variant text-[11px]">
                  Agriculture & Organic Produce
                </span>
              </div>
            </div>
            <span className="font-label-md text-secondary font-semibold bg-surface-container-low px-2 py-1 rounded-md text-[11px]">
              3 Major Industries
            </span>
          </div>

          {/* Card 1: Cherries & Dry Apricot Packing Units */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-surface-container">
            <div
              className="relative h-44 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${PORTAL_IMAGES.cherryApricot})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap">
                <span className="bg-secondary text-on-secondary font-label-md px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Export Quality
                </span>
                <span className="bg-surface-bright/90 backdrop-blur-sm text-primary font-label-md px-2 py-0.5 rounded-full text-[11px] font-semibold">
                  Gilgit & Nagar
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                <div>
                  <h4 className="font-headline-md text-white font-bold drop-shadow text-[16px]">
                    Gilgit Cherry & Dry Apricot Units
                  </h4>
                  <span className="font-body-sm text-surface-container-low text-[12px]">
                    Fresh Cherries & Sun-dried Apricot Packaging
                  </span>
                </div>
                <span className="font-metric-sm text-secondary-fixed font-bold text-[15px]">8,200 Tons</span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <p className="font-body-md text-on-surface text-[13px] leading-relaxed">
                Gilgit and Hunza's celebrated fresh cherries alongside sun-dried, naturally sulfur-free apricots. Highly demanded across the Middle East and Europe.
              </p>
              <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">storefront</span>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-on-surface font-semibold text-[13px]">
                      Cherry Season Market, Jutial Gilgit
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-[11px]">
                      Central Cooperative Packaging Units
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenDirectoryModal('apricots')}
                  className="px-3 py-1.5 rounded-md bg-secondary text-on-secondary font-label-md font-semibold hover:opacity-90 active:scale-95 transition-all text-[11px]"
                >
                  Directory
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Trout Fish Hatcheries */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-surface-container">
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-xl bg-tertiary-fixed flex items-center justify-center shrink-0 text-tertiary">
                  <span className="material-symbols-outlined text-[30px]">phishing</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-headline-md text-primary font-bold text-[15px]">
                      Coldwater Trout Hatcheries (River Gilgit & Ghizer)
                    </h4>
                    <span className="bg-tertiary-container text-on-tertiary font-label-md px-2 py-0.5 rounded-full text-[10px]">
                      Glacial Waters
                    </span>
                  </div>
                  <span className="font-body-sm text-on-surface-variant text-[12px]">
                    Rainbow & Brown Trout Farming
                  </span>
                </div>
              </div>
            </div>
            <p className="font-body-md text-on-surface text-[13px] leading-relaxed">
              Naturally farmed Rainbow and Brown Trout bred in the crystal-clear, icy streams of the Gilgit and Ghizer rivers. A top choice for tourists and fine dining restaurants.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-surface-container p-2 rounded-lg flex flex-col">
                <span className="font-label-md text-on-surface-variant text-[11px]">Farm Gate Rate</span>
                <span className="font-metric-sm text-primary font-bold text-[14px]">
                  Rs. 2,200 <span className="font-body-sm text-on-surface-variant font-normal text-[11px]">/kg</span>
                </span>
              </div>
              <div className="bg-surface-container p-2 rounded-lg flex flex-col">
                <span className="font-label-md text-on-surface-variant text-[11px]">Active Registered Units</span>
                <span className="font-metric-sm text-primary font-bold text-[14px]">48 Hatcheries</span>
              </div>
            </div>
          </div>

          {/* Card 3: Saffron & Organic Herbal Farming */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">spa</span>
                <h4 className="font-headline-md text-primary font-bold text-[15px]">
                  Saffron & Rare Organic Herbs (Shilajit)
                </h4>
              </div>
              <span className="font-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-semibold text-[10px]">
                High-Altitude Cultivation
              </span>
            </div>
            <p className="font-body-md text-on-surface text-[13px] leading-relaxed">
              Organic high-altitude saffron cultivation, raw mineral shilajit resin harvesting, and indigenous Timur (wild mountain pepper) processing and supply chains.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="font-label-md text-on-surface-variant text-[12px]">
                Farmer Support Package: <strong className="text-primary font-bold">50% Seed Subsidy</strong>
              </span>
              <button
                onClick={() => onOpenDirectoryModal('saffron')}
                className="text-secondary font-label-lg flex items-center gap-1 hover:underline text-[12px] font-semibold"
              >
                <span>View Details</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: Gems & Minerals Trading */}
      {(selectedFilter === 'all' || selectedFilter === 'gems') && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary">
                <span className="material-symbols-outlined text-[20px]">diamond</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-primary font-bold text-[16px]">
                  Gilgit Gemstones & Lapidary Workshops
                </h3>
                <span className="font-label-md text-on-surface-variant text-[11px]">
                  Aquamarine, Tourmaline, Ruby
                </span>
              </div>
            </div>
            <span className="font-label-md text-on-tertiary-fixed-variant bg-tertiary-fixed px-2 py-1 rounded-md font-semibold text-[11px]">
              Global Demand
            </span>
          </div>

          {/* Gem Market Showcase Card */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-surface-container">
            <div
              className="relative h-44 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${PORTAL_IMAGES.gemMarket})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-primary text-on-primary font-label-md px-2.5 py-1 rounded-full shadow-sm font-semibold text-[11px]">
                  KKH Gemstones Center
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="font-headline-md font-bold text-[16px]">
                  Gilgit Gemstone Market & Cutting Centers
                </h4>
                <span className="font-body-sm text-surface-container-low text-[12px]">
                  Aquamarine, Tourmaline, Ruby Faceting
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <p className="font-body-md text-on-surface text-[13px] leading-relaxed">
                Extracted from Haramosh, Shigar, and Hunza, rough gemstones such as aquamarine, tourmaline, topaz, and emeralds are faceted and polished in modern & traditional workshops.
              </p>
              {/* Gem varieties chips */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container">
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface font-semibold text-[12px]">Aquamarine</span>
                    <span className="font-body-sm text-on-surface-variant text-[11px]">Haramosh & Astore</span>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim" />
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container">
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface font-semibold text-[12px]">Tourmaline & Ruby</span>
                    <span className="font-body-sm text-on-surface-variant text-[11px]">Pink, Green & Crimson</span>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="flex items-center justify-between bg-surface-container p-2.5 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-label-md text-on-surface-variant text-[10px]">
                    Government Certification Lab
                  </span>
                  <span className="font-label-lg text-primary font-semibold text-[12px]">
                    Gems & Minerals Testing Centre Gilgit
                  </span>
                </div>
                <button
                  onClick={() => onOpenDirectoryModal('gems')}
                  className="px-3 py-1.5 rounded-md bg-primary text-on-primary font-label-md font-semibold active:scale-95 transition-all text-[11px]"
                >
                  Market Guide
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: Heritage Handicrafts & Cottage Industries */}
      {(selectedFilter === 'all' || selectedFilter === 'crafts') && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[20px]">palette</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-primary font-bold text-[16px]">
                  Heritage Handicrafts & Cottage Craft
                </h3>
                <span className="font-label-md text-on-surface-variant text-[11px]">
                  Traditional Artistry & Culture
                </span>
              </div>
            </div>
            <span className="font-label-md text-secondary font-semibold bg-surface-container-low px-2 py-1 rounded-md text-[11px]">
              Cultural Heritage
            </span>
          </div>

          {/* Craft 1: Gilgiti Cap & Patti Weaving */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-surface-container">
            <div
              className="relative h-44 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${PORTAL_IMAGES.gilgitiCap})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-secondary-container text-on-secondary-container font-label-md px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                  100% Pure Wool
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="font-headline-md font-bold text-[16px]">
                  Gilgiti Cap with Peacock Feather & Wool Weaving
                </h4>
                <span className="font-body-sm text-surface-container-low text-[12px]">
                  Pattu Wool Weaving & Traditional Headwear
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <p className="font-body-md text-on-surface text-[13px] leading-relaxed">
                Locally woven sheep wool crafted on ancestral looms into durable warm fabric (Pattu), alongside iconic Gilgiti woolen caps adorned with handcrafted peacock plumes.
              </p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-md text-on-surface-variant text-[11px]">Artisan Union Rates</span>
                  <span className="font-metric-sm text-primary font-bold text-[14px]">
                    Rs. 1,800 – 4,500
                  </span>
                </div>
                <span className="font-label-md bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant text-[11px]">
                  Hunar Gah, Kashrote Gilgit
                </span>
              </div>
            </div>
          </div>

          {/* Craft 2: Walnut Wood Carving */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-surface-container">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-13 h-13 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[28px]">carpenter</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-headline-md text-primary font-bold text-[15px]">
                    Walnut Wood Relief Carving & Furniture
                  </h4>
                  <span className="font-body-sm text-on-surface-variant text-[12px]">
                    Artisanal Joinery & Relief Masterpieces
                  </span>
                </div>
              </div>
            </div>
            <p className="font-body-md text-on-surface text-[13px] leading-relaxed">
              Intricate hand-carved floral, geometric, and calligraphic motifs in seasoned walnut timber. Handcrafted jewelry chests, book stands, and relief doors.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="font-label-md text-secondary font-semibold text-[12px]">
                Artisan Training Fund Active
              </span>
              <button
                onClick={onOpenSamplesModal}
                className="px-3 py-1.5 rounded-md bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors active:scale-95 text-[11px] font-medium"
              >
                View Samples
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: Producer Support & Government Subsidy Schemes */}
      <section className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">policy</span>
            <h3 className="font-headline-md text-primary font-bold text-[15px]">
              Farmer & Artisan Support Grants
            </h3>
          </div>
          <span className="font-label-md bg-secondary text-on-secondary px-2 py-0.5 rounded-full text-[10px] font-semibold">
            Dept of Agri & Industry
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {/* Scheme 1 */}
          <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between shadow-sm border border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">solar_power</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-primary font-bold text-[13px]">
                  Solar Dryer Grant for Dried Fruits
                </span>
                <span className="font-body-sm text-on-surface-variant text-[11px]">
                  70% Equipment Subsidy for Apricot & Cherry Growers
                </span>
              </div>
            </div>
            <span className="font-label-md bg-surface-container px-2 py-1 rounded text-secondary font-semibold shrink-0 text-[11px]">
              Applications Open
            </span>
          </div>

          {/* Scheme 2 */}
          <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between shadow-sm border border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-primary font-bold text-[13px]">
                  Gemstone Lapidary & Faceting Internship
                </span>
                <span className="font-body-sm text-on-surface-variant text-[11px]">
                  Rs. 15,000 monthly youth stipend
                </span>
              </div>
            </div>
            <span className="font-label-md bg-surface-container px-2 py-1 rounded text-primary font-semibold shrink-0 text-[11px]">
              120 Seats
            </span>
          </div>
        </div>

        <button
          onClick={onOpenRegisterModal}
          className="w-full mt-1 py-3 rounded-lg bg-primary text-on-primary font-label-lg font-bold flex items-center justify-center gap-2 active:scale-[0.99] transition-transform shadow-sm text-[13px]"
        >
          <span className="material-symbols-outlined text-[18px]">assignment</span>
          <span>Register as Local Producer / Artisan</span>
        </button>
      </section>
    </div>
  );
};
