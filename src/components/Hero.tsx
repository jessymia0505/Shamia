/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Icon } from './Icon';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#070b1a] to-[#040814] border-b border-cyan-500/10">
      {/* Absolute glow sources */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Futuristic announcement badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] mb-6 animate-pulse">
          <Icon name="Award" size={14} />
          <span className="text-[11px] font-mono tracking-wider font-extrabold uppercase">
            100% Free Open Education Ecosystem
          </span>
        </div>

        {/* Large Heading */}
        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6">
          Learn Digital Skills &{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            Grow Online
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed mb-10">
          Discover free tools, skills, and opportunities that can change your future. Zero costs, high quality resources, in-depth career paths.
        </p>

        {/* Action Button & Stats Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:scale-[1.03] transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none"
          >
            <span>Start Learning</span>
            <Icon name="ArrowRight" size={18} />
          </button>

          <a
            href="https://www.freecodecamp.org/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white border border-cyan-500/10 hover:border-cyan-500/30 font-medium tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <span>Official freeCodeCamp</span>
            <Icon name="ExternalLink" size={15} />
          </a>
        </div>

        {/* Interactive Stats Panel with Glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { metric: '8 Paths', label: 'Premium Roadmaps' },
            { metric: '30+ Tools', label: 'Recommended Toolkits' },
            { metric: 'Real Links', label: 'Direct Platform Connections' },
            { metric: 'Self-Paced', label: 'Fits Your Daily Cycle' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#091122]/40 backdrop-blur-md border border-cyan-500/5 hover:border-cyan-500/20 transition-all text-center group"
            >
              <div className="font-mono text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                {stat.metric}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 uppercase font-medium tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
