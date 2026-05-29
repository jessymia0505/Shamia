/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { CategoryList } from './components/CategoryList';
import { CategoryDetailView } from './components/CategoryDetailView';
import { BookmarksView } from './components/BookmarksView';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { categoriesData, initialCommunityTips } from './data';
import { SkillCategory, CommunityTip } from './types';
import { Icon } from './components/Icon';
import { AdSlot } from './components/AdSlot';

export default function App() {
  // Navigation stack
  const [activeView, setActiveView] = useState<string>('home'); // 'home' | 'my-learning' | 'community'
  const [previousView, setPreviousView] = useState<string>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBottomAdVisible, setIsBottomAdVisible] = useState(true);

  // Search parameters
  const [searchQuery, setSearchQuery] = useState('');

  // Local Storage states with safe initialization
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Category status track state: 'not-started' | 'started' | 'completed'
  const [ongoingAndCompletedStates, setOngoingAndCompletedStates] = useState<Record<string, 'not-started' | 'started' | 'completed'>>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_states');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Completed steps tracker: Record<categoryId, stepNumber[]>
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_completed_steps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Community tips state
  const [communityTips, setCommunityTips] = useState<CommunityTip[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_tips');
      return saved ? JSON.parse(saved) : initialCommunityTips;
    } catch {
      return initialCommunityTips;
    }
  });

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('skillbridge_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('skillbridge_recently_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem('skillbridge_states', JSON.stringify(ongoingAndCompletedStates));
  }, [ongoingAndCompletedStates]);

  useEffect(() => {
    localStorage.setItem('skillbridge_completed_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem('skillbridge_tips', JSON.stringify(communityTips));
  }, [communityTips]);

  // Utility Actions
  const handleSelectCategory = (id: string) => {
    setPreviousView(activeView);
    setSelectedCategoryId(id);

    // Track recently viewed
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 5); // Cache only top 5 recent views
    });
  };

  const handleReturnToGrid = () => {
    setSelectedCategoryId(null);
    setActiveView(previousView);
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering open card click details
    }
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleStep = (categoryId: string, stepNumber: number) => {
    // 1. Toggled step update
    setCompletedSteps((prev) => {
      const stepsList = prev[categoryId] || [];
      const updatedSteps = stepsList.includes(stepNumber)
        ? stepsList.filter((n) => n !== stepNumber)
        : [...stepsList, stepNumber];

      const newCompletes = { ...prev, [categoryId]: updatedSteps };

      // 2. Auto update active state if steps are checkmarked
      const targetCat = categoriesData.find((c) => c.id === categoryId);
      if (targetCat) {
        setOngoingAndCompletedStates((currentStates) => {
          const currentState = currentStates[categoryId] || 'not-started';
          let nextState: 'not-started' | 'started' | 'completed' = currentState;

          if (updatedSteps.length === targetCat.roadmapSteps.length) {
            nextState = 'completed';
          } else if (updatedSteps.length > 0) {
            nextState = 'started';
          } else {
            nextState = 'not-started';
          }

          return { ...currentStates, [categoryId]: nextState };
        });
      }

      return newCompletes;
    });
  };

  const handleToggleProgressState = (categoryId: string) => {
    const currentState = ongoingAndCompletedStates[categoryId] || 'not-started';
    const targetCat = categoriesData.find((c) => c.id === categoryId);
    if (!targetCat) return;

    setOngoingAndCompletedStates((prev) => {
      let nextState: 'not-started' | 'started' | 'completed';
      
      if (currentState === 'not-started') {
        nextState = 'started';
      } else if (currentState === 'started') {
        nextState = 'completed';
        // Auto checkmark all steps
        setCompletedSteps((prevDone) => ({
          ...prevDone,
          [categoryId]: targetCat.roadmapSteps.map((s) => s.step)
        }));
      } else {
        nextState = 'not-started';
        // Auto reset checkmarked steps
        setCompletedSteps((prevDone) => ({
          ...prevDone,
          [categoryId]: []
        }));
      }

      return { ...prev, [categoryId]: nextState };
    });
  };

  const handleUpvoteTip = (tipId: string) => {
    setCommunityTips((prev) =>
      prev.map((tip) =>
        tip.id === tipId ? { ...tip, upvotes: tip.upvotes + 1 } : tip
      )
    );
  };

  const handleAddCommunityTip = (authorNickname: string, catName: string, text: string) => {
    const newTip: CommunityTip = {
      id: `tip-${Date.now()}`,
      author: authorNickname,
      category: catName,
      content: text,
      upvotes: 1,
      timestamp: 'Just now'
    };
    setCommunityTips((prev) => [newTip, ...prev]);
  };

  // Derived metrics for profile stats
  const totalCompletedCount = Object.values(ongoingAndCompletedStates).filter(
    (s) => s === 'completed'
  ).length;

  const totalOngoingCount = Object.values(ongoingAndCompletedStates).filter(
    (s) => s === 'started'
  ).length;

  // Resolve Category element
  const currentSelectedCategory = selectedCategoryId
    ? categoriesData.find((cat) => cat.id === selectedCategoryId)
    : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col selection:bg-cyan-500/30 selection:text-slate-900 relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12)_0%,_transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.1)_0%,_transparent_55%)] z-0" />

      {/* Universal Sticky Header */}
      <Header
        onMenuToggle={() => setIsSidebarOpen(true)}
        onViewChange={(viewId) => {
          setActiveView(viewId);
          setSelectedCategoryId(null); // Clear active detail view
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarkCount={bookmarkedIds.length}
        ongoingCount={totalOngoingCount}
        completedCount={totalCompletedCount}
      />

      {/* Slideout Sidebar Drawer on phone & desktop */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={selectedCategoryId ? 'detail' : activeView}
        onViewChange={(viewId) => {
          setActiveView(viewId);
          setSelectedCategoryId(null);
        }}
        bookmarkCount={bookmarkedIds.length}
      />

      {/* Main app block */}
      <main className="flex-grow relative z-10">
        {selectedCategoryId && currentSelectedCategory ? (
          // 1. Detailed Category view
          <CategoryDetailView
            category={currentSelectedCategory}
            onBack={handleReturnToGrid}
            isSaved={bookmarkedIds.includes(currentSelectedCategory.id)}
            onToggleBookmark={() => toggleBookmark(currentSelectedCategory.id)}
            completedStepsForCategory={completedSteps[currentSelectedCategory.id] || []}
            onToggleStep={(stepNum) => handleToggleStep(currentSelectedCategory.id, stepNum)}
            pathProgressState={ongoingAndCompletedStates[currentSelectedCategory.id] || 'not-started'}
            onToggleProgressState={() => handleToggleProgressState(currentSelectedCategory.id)}
          />
        ) : activeView === 'my-learning' ? (
          // 2. Bookmarked and tracking Dashboard
          <BookmarksView
            categories={categoriesData}
            bookmarkedIds={bookmarkedIds}
            recentlyViewedIds={recentlyViewedIds}
            ongoingAndCompletedStates={ongoingAndCompletedStates}
            completedSteps={completedSteps}
            onSelectCategory={handleSelectCategory}
            onRemoveBookmark={toggleBookmark}
            onDiscoverClick={() => setActiveView('home')}
          />
        ) : activeView === 'community' ? (
          // 3. Community section tips feed
          <CommunitySection
            tips={communityTips}
            onSubmitTip={handleAddCommunityTip}
            onUpvote={handleUpvoteTip}
            categoriesList={categoriesData.map((cat) => cat.name)}
          />
        ) : (
          // 4. Bento Grid Homepage View with Hero details and Community widgets in top row
          <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              
              {/* Bento Box 1: Hero Block (col-span-8) */}
              <section className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-500" />
                
                {/* Floating dynamic accent indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-full text-[9px] font-mono text-cyan-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Interactive Ecosystem</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
                  Learn Digital Skills &<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-sans italic">Grow Online</span>
                </h1>

                <p className="text-slate-600 text-xs sm:text-sm max-w-lg mb-6 leading-relaxed">
                  Discover free tools, beginner roadmaps, and micro-credentials that can change your future in the modern digital economy. Zero cost, infinite growth.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleSelectCategory('web-dev')}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-8 rounded-full shadow transition-all transform hover:scale-[1.01] cursor-pointer"
                  >
                    Start Learning
                  </button>
                  <button
                    onClick={() => setActiveView('my-learning')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full border border-slate-200 transition-all cursor-pointer"
                  >
                    My Dashboard
                  </button>
                </div>
              </section>

              {/* Bento Box 2: Community Widget (col-span-4) */}
              <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between group hover:border-cyan-500/30 transition-colors duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#0891b2]">
                      Community Tips
                    </h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-ping" />
                  </div>

                  <div className="space-y-4">
                    {communityTips.slice(0, 2).map((tip) => (
                      <div key={tip.id} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <div className="w-7 h-7 shrink-0 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[10px] text-cyan-700 font-extrabold">
                          {tip.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                            "{tip.content}"
                          </p>
                          <span className="text-[9px] font-mono text-cyan-600 mt-1 block font-semibold">
                            — @{tip.author}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveView('community')}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold hover:underline transition-all mt-6 text-left flex items-center gap-1 focus:outline-none cursor-pointer"
                >
                  <span>View All Discussions</span>
                  <Icon name="ArrowRight" size={12} />
                </button>
              </div>

            </div>

            {/* Home page banner ad */}
            <AdSlot placement="home-banner" className="pt-2" />

            {/* Featured Category Bento Grids */}
            <CategoryList
              categories={categoriesData}
              onSelectCategory={handleSelectCategory}
              searchQuery={searchQuery}
              bookmarkedIds={bookmarkedIds}
              toggleBookmark={toggleBookmark}
            />
          </div>
        )}
      </main>

      {/* Universal Footerconnect details */}
      <Footer
        onViewChange={(viewId) => {
          setActiveView(viewId);
          setSelectedCategoryId(null);
        }}
      />

      {/* Sticky Bottom Ad Overlay (Fully closable and optimized for mobile screens) */}
      {isBottomAdVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center pb-6 md:pb-4">
          <div className="w-full max-w-6xl pointer-events-auto shadow-lg backdrop-blur-md bg-white/95 rounded-3xl border border-slate-200">
            <AdSlot 
              placement="floating-bottom" 
              onAdClose={() => setIsBottomAdVisible(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
