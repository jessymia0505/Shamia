/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Code,
  Palette,
  Video,
  Sparkles,
  Coins,
  Briefcase,
  Tv,
  Layers,
  Search,
  Menu,
  X,
  Bookmark,
  BookmarkCheck,
  Award,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Send,
  PlusCircle,
  ThumbsUp,
  User,
  CheckCircle,
  Flame,
  ArrowRight,
  BookOpen,
  Filter,
  Check,
  ChevronLeft
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 20 }) => {
  switch (name) {
    case 'Code':
      return <Code className={className} size={size} />;
    case 'Palette':
      return <Palette className={className} size={size} />;
    case 'Video':
      return <Video className={className} size={size} />;
    case 'Sparkles':
      return <Sparkles className={className} size={size} />;
    case 'Coins':
      return <Coins className={className} size={size} />;
    case 'Briefcase':
      return <Briefcase className={className} size={size} />;
    case 'Tv':
      return <Tv className={className} size={size} />;
    case 'Layers':
      return <Layers className={className} size={size} />;
    case 'Search':
      return <Search className={className} size={size} />;
    case 'Menu':
      return <Menu className={className} size={size} />;
    case 'X':
      return <X className={className} size={size} />;
    case 'Bookmark':
      return <Bookmark className={className} size={size} />;
    case 'BookmarkCheck':
      return <BookmarkCheck className={className} size={size} />;
    case 'Award':
      return <Award className={className} size={size} />;
    case 'Clock':
      return <Clock className={className} size={size} />;
    case 'ExternalLink':
      return <ExternalLink className={className} size={size} />;
    case 'ChevronRight':
      return <ChevronRight className={className} size={size} />;
    case 'ChevronLeft':
      return <ChevronLeft className={className} size={size} />;
    case 'TrendingUp':
      return <TrendingUp className={className} size={size} />;
    case 'MessageSquare':
      return <MessageSquare className={className} size={size} />;
    case 'Send':
      return <Send className={className} size={size} />;
    case 'PlusCircle':
      return <PlusCircle className={className} size={size} />;
    case 'ThumbsUp':
      return <ThumbsUp className={className} size={size} />;
    case 'User':
      return <User className={className} size={size} />;
    case 'CheckCircle':
      return <CheckCircle className={className} size={size} />;
    case 'Flame':
      return <Flame className={className} size={size} />;
    case 'ArrowRight':
      return <ArrowRight className={className} size={size} />;
    case 'BookOpen':
      return <BookOpen className={className} size={size} />;
    case 'Filter':
      return <Filter className={className} size={size} />;
    case 'Check':
      return <Check className={className} size={size} />;
    default:
      return <Code className={className} size={size} />;
  }
};
