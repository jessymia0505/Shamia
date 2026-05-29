/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SkillCategory } from '../types';
import { Icon } from './Icon';

interface BookmarksViewProps {
  categories: SkillCategory[];
  bookmarkedIds: string[];
  recentlyViewedIds: string[];
  ongoingAndCompletedStates: Record<string, 'not-started' | 'started' | 'completed'>;
  completedSteps: Record<string, number[]>;
  onSelectCategory: (id: string) => void;
  onRemoveBookmark: (id: string, e: React.MouseEvent) => void;
  onDiscoverClick: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  categories,
  bookmarkedIds,
  recentlyViewedIds,
  ongoingAndCompletedStates,
  completedSteps,
  onSelectCategory,
  onRemoveBookmark,
  onDiscoverClick
}) => {
  // Resolve relevant Categories
  const bookmarkedCategories = categories.filter((cat) => bookmarkedIds.includes(cat.id));

  const recentlyViewedCategories = categories.filter((cat) =>
    recentlyViewedIds.includes(cat.id)
  );

  const ongoingCategories = categories.filter(
    (cat) => ongoingAndCompletedStates[cat.id] === 'started'
  );

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      {/* View Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Learning Dashboard
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Monitor your ongoing courses, saved materials, and recently explored resources in one unified hub.
        </p>
      </div>

      {/* 1. Continue Learning (In Progress Paths) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" className="text-amber-600" />
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Active Learning Roads</h2>
        </div>

        {ongoingCategories.length === 0 ? (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div>
              <p className="text-xs text-slate-600 font-semibold">
                You haven't initialized any digital learning paths yet.
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Start dynamic roads or tick steps completed inside a category to lock your daily streak.
              </p>
            </div>
            <button
              onClick={onDiscoverClick}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all shadow-sm cursor-pointer"
            >
              Explore Free Paths
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ongoingCategories.map((cat) => {
              const doneSteps = completedSteps[cat.id]?.length || 0;
              const totalSteps = cat.roadmapSteps.length;
              const percent = Math.round((doneSteps / totalSteps) * 100);

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-[0_8px_30px_rgba(6,182,212,0.06)] transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-xs"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                          <Icon name={cat.iconName} size={15} />
                        </div>
                        <h3 className="font-sans font-bold text-sm text-slate-800 group-hover:text-cyan-600 transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded uppercase">
                        Active
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed line-clamp-1">
                      {cat.shortDesc}
                    </p>
                  </div>

                  {/* Progress Line */}
                  <div className="mt-5">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1.5">
                      <span>{doneSteps} of {totalSteps} Milestone Steps</span>
                      <span className="text-cyan-600 font-bold">{percent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Bookmarked resources */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="Bookmark" className="text-cyan-600" />
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Bookmarked Libraries</h2>
        </div>

        {bookmarkedCategories.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <Icon name="Bookmark" className="text-slate-350 mx-auto mb-3" size={28} />
            <p className="text-xs text-slate-600 font-semibold">No resources saved to your bookmark library yet.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Tap the ribbon icon on category cards to bookmark for rapid access.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookmarkedCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 transition-all cursor-pointer flex justify-between items-center group relative shadow-xs hover:shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-55 text-[#0891b2] flex items-center justify-center border border-slate-200 hover:bg-cyan-50 transition-all">
                    <Icon name={cat.iconName} size={16} />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-slate-800 group-hover:text-cyan-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide">
                      {cat.difficulty} • {cat.duration}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => onRemoveBookmark(cat.id, e)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all focus:outline-none cursor-pointer"
                  title="Remove bookmark"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Recently Viewed */}
      {recentlyViewedCategories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="BookOpen" className="text-slate-600" />
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Recently Visited Roads</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {recentlyViewedCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="px-4 py-2.5 rounded-full bg-white border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/20 text-slate-700 hover:text-cyan-700 text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-2 focus:outline-none"
              >
                <Icon name={cat.iconName} size={13} className="text-cyan-600" />
                <span>{cat.name}</span>
                <Icon name="ChevronRight" size={10} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
