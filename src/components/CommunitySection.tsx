/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CommunityTip } from '../types';
import { Icon } from './Icon';
import { AdSlot } from './AdSlot';

interface CommunitySectionProps {
  tips: CommunityTip[];
  onSubmitTip: (author: string, category: string, content: string) => void;
  onUpvote: (tipId: string) => void;
  categoriesList: string[];
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  tips,
  onSubmitTip,
  onUpvote,
  categoriesList
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showForm, setShowForm] = useState(false);
  
  // Form elements state
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(categoriesList[0] || 'General');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Apply filtering
  const filteredTips = tips.filter((tip) => {
    return selectedFilter === 'All' || tip.category === selectedFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!author.trim()) {
      setErrorMsg('Please specify an author nickname.');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Please write your tip or advice content.');
      return;
    }
    if (content.length < 15) {
      setErrorMsg('Tips must be informative. Please write at least 15 characters.');
      return;
    }

    onSubmitTip(author.trim(), category, content.trim());
    
    // Clear state
    setAuthor('');
    setContent('');
    setSuccessMsg('Your tip has been published successfully!');
    
    setTimeout(() => {
      setSuccessMsg('');
      setShowForm(false);
    }, 2500);
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Community Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 mb-2">
            <Icon name="MessageSquare" size={12} />
            <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
              SkillBridge Collective
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Community Tips Feed
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Exchange learning strategies, avoid initial pitfalls, and level up with fellow peers.
          </p>
        </div>

        {/* Action Button: Post Tip */}
        <button
          onClick={() => setShowForm(!showForm)}
          id="toggle-tip-form-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer focus:outline-none"
        >
          <Icon name={showForm ? 'X' : 'PlusCircle'} size={15} />
          <span>{showForm ? 'Close Posting Unit' : 'Post Learning Tip'}</span>
        </button>
      </div>

      {/* Tip Creation Form Expandable card */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 animate-slide-down"
        >
          <h3 className="font-sans font-bold text-base text-slate-800 font-sans">Share Your Wisdom</h3>
          <p className="text-xs text-slate-550 -mt-2">
            Help other young learners by detailing real resources, warnings, or habits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">
                Your Professional Nickname
              </label>
              <input
                type="text"
                placeholder="e.g. Samuel K., FigmaQueen"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-400 text-slate-800 text-xs outline-none transition-colors"
                maxLength={30}
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">
                Associated Skill Domain
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-400 text-slate-800 text-xs outline-none transition-colors"
              >
                {categoriesList.map((catName) => (
                  <option key={catName} value={catName} className="bg-white text-slate-800 text-xs">
                    {catName}
                  </option>
                ))}
                <option value="General" className="bg-white text-slate-800 text-xs">General / Career Opportunities</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">
              Your Advice / Insight
            </label>
            <textarea
              placeholder="What should beginners verify first? What mistakes did you commit? Write something helpful..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-24 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-400 text-slate-800 text-xs outline-none transition-colors resize-none"
              maxLength={300}
            />
            <div className="flex justify-between mt-1 text-[10px] font-mono text-slate-400">
              <span>Write at least 15 characters</span>
              <span>{content.length}/300 limit</span>
            </div>
          </div>

          {/* Validation indicators */}
          {errorMsg && <div className="text-red-600 text-xs font-mono font-bold">⚠️ {errorMsg}</div>}
          {successMsg && <div className="text-emerald-600 text-xs font-mono font-bold">✓ {successMsg}</div>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Icon name="Send" size={13} />
              <span>Broadcast Tip</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setSelectedFilter('All')}
          className={`px-4.5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
            selectedFilter === 'All'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-150'
          }`}
        >
          All Advice
        </button>
        {categoriesList.map((catName) => (
          <button
            key={catName}
            onClick={() => setSelectedFilter(catName)}
            className={`px-4.5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              selectedFilter === catName
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-150'
            }`}
          >
            {catName}
          </button>
        ))}
      </div>

      {/* Feed listing */}
      <div className="space-y-4">
        {filteredTips.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-white border border-slate-200 max-w-md mx-auto shadow-xs">
            <p className="text-xs text-slate-500">No community tips available for {selectedFilter}.</p>
            <p className="text-[10px] text-slate-400 mt-1">Be the first player to broadcast a learning tip!</p>
          </div>
        ) : (
          filteredTips.map((tip, index) => (
            <React.Fragment key={tip.id}>
              {index === 1 && (
                <AdSlot placement="community-feed" className="my-2" />
              )}
              <div
                className="p-5 md:p-6 rounded-3xl bg-white border border-slate-200/95 hover:border-cyan-300 hover:shadow-[0_8px_30px_rgba(6,182,212,0.06)] transition-all flex flex-col md:flex-row items-start justify-between gap-6 shadow-xs"
              >
                {/* Tip Content Column */}
                <div className="space-y-3 flex-grow">
                  {/* Meta details header line */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-sans font-bold text-xs text-slate-800">
                      {tip.author}
                    </span>
                    <span className="text-slate-350 text-xs select-none">•</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-100 uppercase tracking-widest font-bold">
                      {tip.category}
                    </span>
                    <span className="text-slate-350 text-xs hidden sm:inline select-none">•</span>
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      {tip.timestamp}
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed md:text-sm">
                    "{tip.content}"
                  </p>
                </div>

                {/* Upvote score action */}
                <div className="flex-shrink-0 self-end md:self-start">
                  <button
                    onClick={() => onUpvote(tip.id)}
                    id={`upvote-${tip.id}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-200 text-slate-500 hover:text-cyan-700 transition-all cursor-pointer focus:outline-none"
                    title="Upvote this collective tip"
                  >
                    <Icon name="ThumbsUp" size={13} className="text-cyan-600" />
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {tip.upvotes}
                    </span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};
