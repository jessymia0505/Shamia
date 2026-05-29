/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Icon } from './Icon';
import { AdSlot } from './AdSlot';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  bookmarkCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeView,
  onViewChange,
  bookmarkCount
}) => {
  const menuItems = [
    { id: 'home', label: 'Discover Roads', icon: 'BookOpen' },
    { id: 'my-learning', label: 'My Saved Learning', icon: 'Bookmark', badge: bookmarkCount > 0 ? bookmarkCount : undefined },
    { id: 'community', label: 'Community Tips', icon: 'MessageSquare' }
  ];

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-80 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 md:duration-200 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Scrollable Upper Body */}
        <div className="flex flex-col flex-grow overflow-y-auto">
          {/* Header inside Sidebar */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Icon name="Sparkles" className="text-white" size={16} />
              </div>
              <span className="font-sans font-bold text-lg tracking-wider text-slate-800">
                SkillBridge Nav
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-xl text-slate-500 hover:text-cyan-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close sidebar"
            >
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Navigation Items list */}
          <nav className="p-4 space-y-2">
            <p className="text-[10px] font-mono tracking-widest text-[#0891b2] pl-3 pb-2 uppercase select-none font-bold">
              Learning Portal
            </p>

            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/60 shadow-[0_2px_8px_rgba(6,182,212,0.1)]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        name={item.icon}
                        className={isActive ? 'text-cyan-600' : 'text-slate-500'}
                        size={18}
                      />
                      <span className="font-sans font-medium text-sm">{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className="bg-cyan-100 text-cyan-800 font-mono text-[10px] px-2 py-0.5 rounded-full border border-cyan-200 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Pinned Bottom Footer Area (Sponsor Ad + Micro card) */}
        <div className="p-4 space-y-3 bg-white border-t border-slate-100 shrink-0">
          <AdSlot placement="sidebar" />
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Icon name="Flame" size={16} />
              <span className="text-xs font-mono font-bold tracking-wide uppercase">Keep Growing</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Every step towards digital expertise opens new doors. Build daily roadmap habits.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
