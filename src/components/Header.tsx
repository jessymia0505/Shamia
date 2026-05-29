/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  onMenuToggle: () => void;
  onViewChange: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkCount: number;
  ongoingCount: number;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  onViewChange,
  searchQuery,
  setSearchQuery,
  bookmarkCount,
  ongoingCount,
  completedCount
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3.5 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Top Left: Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            id="header-menu-btn"
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-slate-100 transition-all outline-none cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Icon name="Menu" size={22} />
          </button>
        </div>

        {/* Center: Brand Identity Logo */}
        <div className="flex items-center">
          <button
            onClick={() => onViewChange('home')}
            id="header-logo-btn"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-sans group-hover:from-cyan-500 group-hover:to-blue-500 transition-all">
              SkillBridge
            </span>
          </button>
        </div>

        {/* Top Right: Search Button & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Inline search or toggleable input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="absolute right-0 flex items-center bg-slate-100/95 border border-slate-200 rounded-full px-3 py-1.5 w-48 md:w-64 backdrop-blur-md animate-fade-in shadow-sm">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-slate-500 hover:text-cyan-600 focus:outline-none cursor-pointer"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSearchInput(true);
                  onViewChange('home'); // Go home to search
                }}
                id="header-search-btn"
                className="p-2 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-slate-100 transition-all outline-none cursor-pointer"
                title="Search learning paths"
              >
                <Icon name="Search" size={18} />
              </button>
            )}
          </div>

          {/* User profile with dropdown stats */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              id="header-profile-btn"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border border-slate-200 flex items-center justify-center text-white hover:border-slate-400 transition-all cursor-pointer focus:outline-none relative"
            >
              <Icon name="User" size={15} />
              {completedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                  {completedCount}
                </span>
              )}
            </button>

            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowProfile(false)}
                />
                <div className="absolute right-0 mt-3 w-72 bg-white border border-slate-200 rounded-2xl p-5 shadow-xl z-50 animate-slide-down">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-base">
                      S
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-slate-800 text-sm">Skill Builder</h4>
                      <p className="text-[10px] font-mono text-cyan-600">Level 1 Explorer</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Icon name="Bookmark" size={13} className="text-cyan-600" /> Bookmarks:
                      </span>
                      <span className="font-mono text-cyan-700 font-bold">{bookmarkCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Icon name="Clock" size={13} className="text-cyan-600" /> In Progress:
                      </span>
                      <span className="font-mono text-amber-600 font-bold">{ongoingCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Icon name="CheckCircle" size={13} className="text-emerald-500" /> Mastered Paths:
                      </span>
                      <span className="font-mono text-emerald-600 font-bold">{completedCount}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <button
                      onClick={() => {
                        onViewChange('my-learning');
                        setShowProfile(false);
                      }}
                      className="w-full text-center py-2 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      View Dashboard
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
