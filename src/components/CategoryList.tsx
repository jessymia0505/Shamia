/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SkillCategory } from '../types';
import { Icon } from './Icon';

interface CategoryListProps {
  categories: SkillCategory[];
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  bookmarkedIds: string[];
  toggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelectCategory,
  searchQuery,
  bookmarkedIds,
  toggleBookmark
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Beginner' | 'Intermediate'>('all');

  const getBentoStyles = (id: string) => {
    switch (id) {
      case 'web-dev':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-[0_8px_30px_rgba(6,182,212,0.1)]',
          iconBgText: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
          provider: 'FreeCodeCamp'
        };
      case 'graphic-design':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]',
          iconBgText: 'bg-blue-50 text-blue-600 border border-blue-100',
          provider: 'Canva'
        };
      case 'video-editing':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-purple-400 hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)]',
          iconBgText: 'bg-purple-50 text-purple-600 border border-purple-100',
          provider: 'CapCut'
        };
      case 'ai-tools':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]',
          iconBgText: 'bg-amber-50 text-amber-600 border border-amber-100',
          provider: 'OpenAI'
        };
      case 'crypto-web3':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]',
          iconBgText: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
          provider: 'Beginner Path'
        };
      case 'online-freelancing':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-pink-400 hover:shadow-[0_8px_30px_rgba(236,72,153,0.1)]',
          iconBgText: 'bg-pink-50 text-pink-600 border border-pink-100',
          provider: 'Upwork'
        };
      case 'content-creation':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]',
          iconBgText: 'bg-orange-50 text-orange-600 border border-orange-100',
          provider: 'Modern Creator'
        };
      case 'ui-ux-design':
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)]',
          iconBgText: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
          provider: 'Figma'
        };
      default:
        return {
          hoverBgBorder: 'hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-xs',
          iconBgText: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
          provider: 'SkillBridge'
        };
    }
  };

  // Filter categories by both search query & tab filter
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' || cat.difficulty === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-6 max-w-7xl mx-auto">
      {/* Category Header Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 mb-2 tracking-tight">
            Featured Categories
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Click any career domain to unlock detailed maps, tools, and courses.
          </p>
        </div>

        {/* Filter Tab controls */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1.5 rounded-2xl self-start shadow-xs">
          {(['all', 'Beginner', 'Intermediate'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize cursor-pointer focus:outline-none ${
                activeFilter === filter
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {filter === 'all' ? 'All Skills' : `${filter}`}
            </button>
          ))}
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-white border border-slate-200 max-w-lg mx-auto shadow-xs">
          <Icon name="Search" size={36} className="text-slate-300 mx-auto mb-4" />
          <h3 className="font-sans font-semibold text-slate-800 mb-1">No skills found</h3>
          <p className="text-xs text-slate-500 px-4">
            We couldn't find matches for "{searchQuery}". Give typing other skills like "Web" or "Edit" a try.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => {
            const isSaved = bookmarkedIds.includes(cat.id);
            const bstyles = getBentoStyles(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-3xl bg-white border border-slate-200/90 ${bstyles.hoverBgBorder} transition-all duration-300 p-6 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xs`}
              >
                <div>
                  {/* Top line: Icon & Bookmark */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold tracking-tight transition-all border ${bstyles.iconBgText}`}>
                      <Icon name={cat.iconName} size={18} />
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(cat.id, e)}
                      id={`bookmark-${cat.id}`}
                      className="p-2 rounded-xl text-slate-400 hover:text-cyan-600 hover:bg-slate-50 transition-all focus:outline-none cursor-pointer"
                      title={isSaved ? 'Remove from Bookmarks' : 'Save to Bookmarks'}
                    >
                      <Icon name={isSaved ? 'BookmarkCheck' : 'Bookmark'} size={16} className={isSaved ? 'text-cyan-600' : ''} />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase font-bold tracking-wide">
                      {cat.difficulty}
                    </span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 uppercase font-bold tracking-wide">
                      {bstyles.provider}
                    </span>
                  </div>

                  {/* Title & short description */}
                  <h4 className="font-bold text-base text-slate-800 mb-1 group-hover:text-cyan-600 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {cat.shortDesc}
                  </p>
                </div>

                {/* Footer action arrow */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 group-hover:text-cyan-600 transition-colors">
                  <span className="text-[10px] bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded text-slate-600 font-medium">{bstyles.provider}</span>
                  <Icon name="ChevronRight" size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
