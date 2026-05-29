/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Icon } from './Icon';

interface FooterProps {
  onViewChange: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column: Brand details and statement */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={16} />
            </div>
            <span className="font-sans font-bold text-lg tracking-wider text-slate-800">
              SkillBridge
            </span>
          </div>
          <p className="text-xs text-slate-550 leading-relaxed max-w-sm">
            Empowering the next generation to master free modern digital crafts, build projects, and unlock global remote workspaces on their own schedule.
          </p>
        </div>

        {/* Middle column: Fast links */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold tracking-widest text-cyan-600 uppercase">
            Internal Roads
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onViewChange('home')}
              className="text-left text-slate-600 hover:text-cyan-600 transition-colors focus:outline-none cursor-pointer"
            >
              Discover Skills
            </button>
            <button
              onClick={() => onViewChange('my-learning')}
              className="text-left text-slate-600 hover:text-cyan-600 transition-colors focus:outline-none cursor-pointer"
            >
              My Dashboard
            </button>
            <button
              onClick={() => onViewChange('community')}
              className="text-left text-slate-600 hover:text-cyan-600 transition-colors focus:outline-none cursor-pointer"
            >
              Community Feed
            </button>
            <a
              href="https://www.freecodecamp.org/"
              target="_blank"
              rel="noreferrer"
              className="text-left text-slate-600 hover:text-cyan-600 transition-colors"
            >
              freeCodeCamp
            </a>
          </div>
        </div>

        {/* Right column: Social contacts with icons */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold tracking-widest text-cyan-600 uppercase">
            Connect & Contact Us
          </h4>
          
          <div className="space-y-3">
            {/* Telegram handle */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700 min-w-[70px]">Telegram:</span>
              <a
                href="https://t.me/Getverse"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-600 hover:text-cyan-700 transition-colors font-mono hover:underline"
              >
                @Getverse
              </a>
            </div>

            {/* X handle */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700 min-w-[70px]">X (Twitter):</span>
              <a
                href="https://x.com/VerseEcosystem"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-600 hover:text-cyan-700 transition-colors font-mono hover:underline"
              >
                @VerseEcosystem
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Credit tag line on bottom */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-100 text-center text-[11px] font-mono text-slate-450">
        <p>© 2026 SkillBridge. Fully free resources with creative commons learning path mappings.</p>
      </div>
    </footer>
  );
};
