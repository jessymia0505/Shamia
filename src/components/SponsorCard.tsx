/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

interface SponsorCampaign {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  link: string;
  badge: string;
  iconName: string;
  themeColor: string;
  bgGradient: string;
}

// Highly polished, super normal consumer & household brand partners
// All of these match the clean theme of the app and link to normal, family-friendly destinations
// while letting the background script intercept clicks to pop up normal ads.
const PREMIUM_CAMPAIGNS: Record<string, SponsorCampaign> = {
  'banner-main': {
    id: 'camp-samsung',
    title: 'Samsung Galaxy Ultra Series',
    subtitle: 'SAMSUNG • SPECIAL PRE-ORDER DEALS',
    description: 'Experience the next level of mobile productivity and photography. Pre-order now to claim $200 in instant credits and free double storage.',
    ctaText: 'Pre-Order Galaxy Now',
    link: 'https://www.samsung.com/',
    badge: 'FEATURED BRAND SPONSOR',
    iconName: 'Smartphone',
    themeColor: 'text-blue-600 border-blue-200 bg-blue-50/50',
    bgGradient: 'from-blue-50/70 via-white to-cyan-50/40 border-blue-100'
  },
  'sidebar-box': {
    id: 'camp-nike',
    title: 'Nike Air Max Running Deals',
    subtitle: 'NIKE SPORT • 25% OFF',
    description: 'Step into light speed comfort. Select premium athletics model running gears now 25% off for members.',
    ctaText: 'Shop Nike Sale',
    link: 'https://www.nike.com/',
    badge: 'ATHLETIC GEAR',
    iconName: 'Activity',
    themeColor: 'text-amber-600 border-amber-200 bg-amber-50/50',
    bgGradient: 'from-amber-50/60 to-slate-50 border-amber-100'
  },
  'bottom-drawer': {
    id: 'camp-netflix',
    title: 'Netflix Premium Family Stream Pass',
    subtitle: 'NETFLIX • MOVIE NIGHTS',
    description: 'Unlimited blockbuster releases, original television shows, and live events on any smartphone, tablet, or home screen.',
    ctaText: 'Start Watching Now',
    link: 'https://www.netflix.com/',
    badge: 'PREMIUM ENTERTAINMENT',
    iconName: 'Tv',
    themeColor: 'text-rose-600 border-rose-200 bg-rose-50/50',
    bgGradient: 'from-rose-50 via-white to-orange-50/50 border-rose-200'
  },
  'grid-box': {
    id: 'camp-playstation',
    title: 'Sony PlayStation 5 Console Bundle',
    subtitle: 'SONY • LIMITLESS GAMING',
    description: 'Experience lightning-fast loading speeds on an ultra-high speed SSD, deeper sensory immersion with haptic feedback, and all-new extraordinary games.',
    ctaText: 'Check PS5 Stock',
    link: 'https://www.playstation.com/',
    badge: 'GAMING SYSTEMS',
    iconName: 'Gamepad2',
    themeColor: 'text-indigo-600 border-indigo-200 bg-indigo-50/50',
    bgGradient: 'from-indigo-50/60 via-white to-pink-50/40 border-indigo-150'
  },
  'detail-lead': {
    id: 'camp-expedia',
    title: 'Expedia Luxury Travel Getaways',
    subtitle: 'EXPEDIA TRAVEL • VACATION OFFERS',
    description: 'Save up to $350 on exclusive flight + ocean hotel luxury packages to Hawaii, Maldives, or Paris. Secure winter bookings safely today.',
    ctaText: 'Book Vacation Offer',
    link: 'https://www.expedia.com/',
    badge: 'LUXURY ESCAPES',
    iconName: 'Compass',
    themeColor: 'text-teal-700 border-teal-200 bg-teal-50/60',
    bgGradient: 'from-teal-50 via-white to-blue-50 border-teal-200'
  },
  'dash-mid': {
    id: 'camp-amazon',
    title: 'Amazon Prime Weekly Savings Hub',
    subtitle: 'AMAZON • OUTLET FINDS',
    description: 'Get free hyper-fast deliveries, exclusive video streaming subscription benefits, and unlimited audio tracks. Start 30-day trial today.',
    ctaText: 'Explore Prime Deals',
    link: 'https://www.amazon.com/',
    badge: 'PRIME EXCLUSIVE',
    iconName: 'ShoppingBag',
    themeColor: 'text-amber-500 border-amber-200 bg-amber-50/40',
    bgGradient: 'from-amber-50/50 via-white to-slate-50 border-amber-200/60'
  },
  'community-tile': {
    id: 'camp-starbucks',
    title: 'Starbucks Coffee Rewards Program',
    subtitle: 'STARBUCKS • CAFE MATCH',
    description: 'Join Starbucks Rewards. Order delicious beverages ahead, pay with your card, and earn free drinks, bakery fresh treats, or custom mugs.',
    ctaText: 'Join Starbucks Rewards',
    link: 'https://www.starbucks.com/',
    badge: 'COFFEE CLUB',
    iconName: 'CupSoda',
    themeColor: 'text-emerald-600 border-emerald-200 bg-emerald-50/50',
    bgGradient: 'from-emerald-50/40 via-white to-indigo-50/40 border-emerald-150'
  }
};

interface SponsorCardProps {
  zone: 'banner-main' | 'sidebar-box' | 'bottom-drawer' | 'grid-box' | 'detail-lead' | 'dash-mid' | 'community-tile';
  className?: string;
  onDismiss?: () => void;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ zone, className = '', onDismiss }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const campaign = PREMIUM_CAMPAIGNS[zone];

  // Quick lazy load delay to prevent layout shifts & reduce startup lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // Open CPM monetized target safely in a new tab, keeping current app open
    window.open(campaign.link, '_blank', 'noopener,noreferrer');
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible || !campaign) {
    return null;
  }

  // Animation variants
  const entranceVariants = {
    hidden: { opacity: 0, scale: 0.98, y: zone === 'bottom-drawer' ? 40 : 5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      scale: 0.97,
      y: zone === 'bottom-drawer' ? 30 : -5, 
      transition: { duration: 0.18 } 
    }
  };

  const isWideBanner = zone === 'banner-main' || zone === 'detail-lead' || zone === 'dash-mid';
  const isTileView = zone === 'grid-box' || zone === 'community-tile';

  return (
    <AnimatePresence>
      <div className={`w-full ${className}`} id={`partner-block-${zone}`}>
        {!isLoaded ? (
          <div 
            className={`w-full bg-slate-50 border border-slate-100 rounded-3xl animate-pulse ${
              isWideBanner ? 'h-[140px] md:h-[110px]' :
              zone === 'sidebar-box' ? 'h-[148px]' :
              zone === 'bottom-drawer' ? 'h-[85px]' :
              'h-[240px]'
            }`}
          />
        ) : (
          <motion.div
            variants={entranceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCardClick}
            className={`group relative rounded-3xl border shadow-xs transition-all duration-300 hover:shadow-md hover:border-cyan-400 cursor-pointer overflow-hidden bg-gradient-to-br ${campaign.bgGradient}`}
          >
            {/* Ambient overlay sparkle */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.03)_0%,_transparent_55%)]" />

            {/* Banner Layout (Main Header, Detail Head, Dashboard Mid) */}
            {isWideBanner && (
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-left">
                <div className="space-y-1.5 flex-grow max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-cyan-100 text-cyan-800 font-mono text-[9px] px-2 py-0.5 rounded-full border border-cyan-200 font-bold tracking-wide uppercase">
                      {campaign.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Recommended Partner Resource</span>
                  </div>
                  <h4 className="font-sans font-bold text-slate-900 group-hover:text-cyan-600 transition-colors text-sm sm:text-base leading-snug">
                    {campaign.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-1">
                    {campaign.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3 self-end md:self-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-900 group-hover:bg-cyan-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                    {campaign.ctaText}
                    <Icon name="ExternalLink" size={13} className="text-white" />
                  </span>
                </div>
              </div>
            )}

            {/* Sidebar View Container */}
            {zone === 'sidebar-box' && (
              <div className="p-4 flex flex-col justify-between gap-3 relative z-10 h-full min-h-[148px] text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="bg-blue-100 text-blue-700 font-mono text-[8.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
                      {campaign.badge}
                    </span>
                    <span className="text-[9px] text-slate-450 font-mono">Sponsor</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors mt-1">
                    {campaign.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                    {campaign.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 mt-1">
                  <span>{campaign.ctaText}</span>
                  <Icon name="ArrowRight" size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            )}

            {/* Floating Bottom Drawer Layout (Optimized, Responsive, Closable) */}
            {zone === 'bottom-drawer' && (
              <div className="relative z-10 p-3 sm:px-6 sm:py-3.5 flex items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3 flex-grow max-w-4xl min-w-0">
                  <div className={`hidden sm:flex w-10 h-10 rounded-xl items-center justify-center border shrink-0 ${campaign.themeColor}`}>
                    <Icon name={campaign.iconName} size={18} />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 font-mono text-[8px] px-2 py-0.5 rounded border border-amber-200 font-bold">
                        {campaign.badge}
                      </span>
                      <span className="text-[9.5px] text-slate-400 font-mono">Premium Partner</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-cyan-600 transition-colors truncate">
                      {campaign.title}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-none hidden md:block truncate">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-900 group-hover:bg-cyan-600 text-white text-[11px] font-bold shadow-xs transition-colors whitespace-nowrap">
                    {campaign.ctaText}
                  </span>
                  <button
                    onClick={handleClose}
                    className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-all cursor-pointer animate-none"
                    title="Dismiss Partner recommended box"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* In-content Card and Community Tile Views (Grid layout integration) */}
            {isTileView && (
              <div className="p-6 flex flex-col justify-between h-full min-h-[224px] relative z-10 text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200 uppercase font-bold tracking-wide">
                      {campaign.badge}
                    </span>
                    <span className="text-[9px] text-[#0891b2] font-semibold bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-full">
                      VERIFIED PARTNER
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-base text-slate-800 mb-1.5 group-hover:text-cyan-600 transition-colors line-clamp-2">
                      {campaign.title}
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 group-hover:text-cyan-600 transition-colors">
                  <span className="text-[10px] bg-slate-50 border border-slate-100 px-2 rounded text-slate-550 font-mono">Verified Sponsor</span>
                  <div className="flex items-center gap-1 font-semibold text-cyan-600">
                    <span>{campaign.ctaText}</span>
                    <Icon name="ExternalLink" size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
