/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

interface AdCampaign {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  link: string;
  badge: string;
  iconName: string;
  themeColor: string; // Tailwind class name or custom hex
  bgGradient: string;
}

// A list of highly relevant, professional, and high-CPM-inspired sponsored platforms
const SPONSORED_CAMPAIGNS: Record<string, AdCampaign> = {
  'home-banner': {
    id: 'camp-upwork',
    title: 'Upwork Remote Freelance Accelerator',
    subtitle: 'SPONSORED EDUCATION • GLOBAL CAREERS',
    description: 'Master in-demand digital services like Web Development, Video Editing, or Figma Designing and start bidding on high-paying global remote jobs today. Double your side hustle earnings in just 30 days.',
    ctaText: 'Claim Your Free Talent Seat',
    link: 'https://www.upwork.com/signup',
    badge: 'FREELANCE OPPORTUNITY',
    iconName: 'TrendingUp',
    themeColor: 'text-emerald-600 border-emerald-200 bg-emerald-50/50',
    bgGradient: 'from-emerald-50/70 via-white to-cyan-50/40 border-emerald-100'
  },
  'sidebar': {
    id: 'camp-cloud',
    title: 'Host Your Web Systems for Free',
    subtitle: 'SPONSORED CLOUD PROMO',
    description: 'Get $200 in free development credits to spin up database nodes, microservices, or frontend containers.',
    ctaText: 'Claim Cloud Credits',
    link: 'https://www.digitalocean.com/',
    badge: 'SPONSORED NODE',
    iconName: 'Server',
    themeColor: 'text-blue-600 border-blue-200 bg-blue-50/50',
    bgGradient: 'from-blue-50/60 to-slate-50 border-blue-100'
  },
  'floating-bottom': {
    id: 'camp-pro',
    title: 'Unlock Lifetime SkillBridge Pro Certification Mappings',
    subtitle: 'RECOMMENDED RESOURCE',
    description: 'Gain instant access to 45+ premium developer maps, editable templates, code repositories, and our exclusive Discord channel for young digital creators.',
    ctaText: 'Upgrade for Free',
    link: 'https://www.freecodecamp.org/',
    badge: 'LIMITED PREMIUM PASS',
    iconName: 'Sparkles',
    themeColor: 'text-amber-700 border-amber-200 bg-amber-50/60',
    bgGradient: 'from-amber-50 via-white to-orange-50/50 border-amber-200'
  },
  'in-content': {
    id: 'camp-canva',
    title: 'Canva Pro Designer Toolkit',
    subtitle: 'SPONSORED GRAPHICS ROADMAP',
    description: 'Unlock 85M+ vector assets, sleek layout mockups, and premium font pairings. Perfect for branding, digital creation, and rapid social media styling.',
    ctaText: 'Start Design Path',
    link: 'https://www.canva.com/',
    badge: 'CREATIVE BLUEPRINT',
    iconName: 'Layers',
    themeColor: 'text-violet-600 border-violet-200 bg-violet-50/50',
    bgGradient: 'from-violet-50/60 via-white to-pink-50/40 border-violet-150'
  },
  'detail-top': {
    id: 'camp-coursera',
    title: 'Coursera Plus Unlimited Roadmap Learning Pass',
    subtitle: 'SPONSORED ROADMAP PARTNER',
    description: 'Gain official certificates from Google, Meta, and IBM. Deploy professional micro-credentials in Python, AI Prompt engineering, and cloud workflows. 7-day free trial.',
    ctaText: 'Start Free Trial Path',
    link: 'https://www.coursera.org/',
    badge: 'UNIVERSITY CREDENTIALS',
    iconName: 'Award',
    themeColor: 'text-cyan-700 border-cyan-200 bg-cyan-50/60',
    bgGradient: 'from-cyan-50 via-white to-blue-55/35 border-cyan-200'
  },
  'dashboard-middle': {
    id: 'camp-aws',
    title: 'AWS Official Cloud Certification Fast-Track',
    subtitle: 'SPONSORED COGNITIVE CLOUD',
    description: 'Complete hands-on serverless computing micro-tasks and unlock a validated exam voucher. Master EC2, serverless Lambdas, and secure DevOps pipelines.',
    ctaText: 'Claim Cloud Voucher',
    link: 'https://aws.amazon.com/free/',
    badge: 'OFFICIAL CLOUD TRACK',
    iconName: 'Server',
    themeColor: 'text-amber-600 border-amber-200 bg-amber-55/40',
    bgGradient: 'from-amber-50/50 via-white to-slate-50 border-amber-200/60'
  },
  'community-feed': {
    id: 'camp-replit',
    title: 'Replit Collaborative Multi-player Coding Space',
    subtitle: 'VERIFIED RESOURCE SPONSOR',
    description: 'Write, debug, and prototype code instantly with AI agents. Build templates, invite co-creators, and host full-stack apps in seconds. Zero environment setup.',
    ctaText: 'Launch Code Workspace',
    link: 'https://replit.com/',
    badge: 'INTEGRATED IDE WORKSPACE',
    iconName: 'Monitor',
    themeColor: 'text-rose-600 border-rose-200 bg-rose-50/50',
    bgGradient: 'from-rose-50/40 via-white to-indigo-50/40 border-rose-150'
  }
};

interface AdSlotProps {
  placement: 'home-banner' | 'sidebar' | 'floating-bottom' | 'in-content' | 'detail-top' | 'dashboard-middle' | 'community-feed';
  className?: string;
  onAdClose?: () => void;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '', onAdClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const campaign = SPONSORED_CAMPAIGNS[placement];

  useEffect(() => {
    // Simulate lightweight lazy-loading with a small timeout to avoid initial thread congestion
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleAdClick = (e: React.MouseEvent) => {
    // CPM networks usually hook window/element clicks.
    // We execute the click-through safely, remaining open in active window.
    window.open(campaign.link, '_blank', 'noopener,noreferrer');
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    if (onAdClose) {
      onAdClose();
    }
  };

  if (!isVisible || !campaign) {
    return null;
  }

  // Animation variants
  const entranceVariants = {
    hidden: { opacity: 0, y: placement === 'floating-bottom' ? 100 : 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: placement === 'floating-bottom' ? 80 : -15, 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <AnimatePresence>
      <div className={`w-full ${className}`} id={`ad-wrapper-${placement}`}>
        {/* Ad Placeholder to prevent layout shifting before mount */}
        {!isLoaded ? (
          <div 
            className={`w-full bg-slate-50 border border-slate-100 rounded-3xl animate-pulse ${
              (placement === 'home-banner' || placement === 'detail-top' || placement === 'dashboard-middle') ? 'h-[160px] md:h-[130px]' :
              placement === 'sidebar' ? 'h-[148px]' :
              placement === 'floating-bottom' ? 'h-[90px]' :
              'h-[240px]'
            }`}
          />
        ) : (
          <motion.div
            variants={entranceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleAdClick}
            className={`group relative rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-md hover:border-cyan-400 cursor-pointer overflow-hidden bg-gradient-to-br ${campaign.bgGradient}`}
          >
            {/* CPM Network Script integration click listener */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.02)_0%,_transparent_45%)]" />

            {/* Banner Ad Layout */}
            {(placement === 'home-banner' || placement === 'detail-top' || placement === 'dashboard-middle') && (
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5 flex-grow max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-100 text-cyan-800 font-mono text-[9px] px-2 py-0.5 rounded-full border border-cyan-200 font-bold tracking-wide">
                      {campaign.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Ads by SkillBridge network</span>
                  </div>
                  <h4 className="font-sans font-bold text-slate-900 group-hover:text-cyan-600 transition-colors text-sm sm:text-base">
                    {campaign.title}
                  </h4>
                  <p className="text-xs text-slate-550 leading-relaxed line-clamp-2 md:line-clamp-1">
                    {campaign.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3 self-end md:self-center">
                  <span className="text-xs font-bold text-cyan-600 group-hover:underline flex items-center gap-1">
                    <span>{campaign.ctaText}</span>
                    <Icon name="ExternalLink" size={13} />
                  </span>
                </div>
              </div>
            )}

            {/* Sidebar Ad Layout */}
            {placement === 'sidebar' && (
              <div className="p-4 flex flex-col justify-between gap-3 relative z-10 h-full min-h-[148px]">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-700 font-mono text-[8px] px-1.5 py-0.5 rounded border border-blue-200 font-bold">
                      {campaign.badge}
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono">Sponsored</span>
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

            {/* Bottom Floating Ad Layout */}
            {placement === 'floating-bottom' && (
              <div className="relative z-10 p-3 sm:px-6 sm:py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-grow max-w-4xl">
                  {/* Icon */}
                  <div className={`hidden sm:flex w-10 h-10 rounded-xl items-center justify-center border ${campaign.themeColor}`}>
                    <Icon name={campaign.iconName} size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 font-mono text-[8px] px-2 py-0.5 rounded border border-amber-200 font-bold">
                        {campaign.badge}
                      </span>
                      <span className="text-[9px] text-slate-400 hidden md:inline">Premium Recommended Partner</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-cyan-600 transition-colors">
                      {campaign.title}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-none hidden md:block">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-bold shadow-sm group-hover:bg-slate-800 transition-colors">
                    {campaign.ctaText}
                  </span>
                  {/* Close circular button */}
                  <button
                    onClick={handleClose}
                    className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-all cursor-pointer"
                    title="Dismiss ad"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* In-content card ad Layout */}
            {(placement === 'in-content' || placement === 'community-feed') && (
              <div className="p-6 flex flex-col justify-between h-full min-h-[224px] relative z-10">
                <div className="space-y-4">
                  {/* Header badges */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200 uppercase font-bold tracking-wide">
                      {campaign.badge}
                    </span>
                    <span className="text-[9px] text-[#0891b2] font-semibold bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-full">
                      SPONSORED COGNITIVE
                    </span>
                  </div>

                  {/* Title and descriptions */}
                  <div>
                    <h5 className="font-bold text-base text-slate-800 mb-1.5 group-hover:text-cyan-600 transition-colors">
                      {campaign.title}
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                {/* Footer and CTA */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 group-hover:text-cyan-600 transition-colors">
                  <span className="text-[10px] bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded text-slate-600 font-medium">Verified Ad Sponsor</span>
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
