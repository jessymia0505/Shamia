/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkillCategory, CommunityTip } from './types';

export const categoriesData: SkillCategory[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    iconName: 'Code',
    shortDesc: 'Build clean, high-performance websites and applications from scratch.',
    description: 'Learn the underlying architecture of the internet. From building simple landing pages to deploying complex full-stack web applications, this learning path will equip you with the practical engineering skills highly demanded by tech startups worldwide.',
    difficulty: 'Beginner',
    duration: '3 - 6 Months',
    roadmapSteps: [
      { step: 1, title: 'HTML5 & CSS3 Essentials', desc: 'Master the building blocks of the web, visual styling, semantic markup, layout design, and mobile-responsive styles.' },
      { step: 2, title: 'Modern JavaScript (ES6+)', desc: 'Understand variables, objects, array structures, DOM manipulation, asynchronous programming, and raw API integrations.' },
      { step: 3, title: 'Tailwind CSS & Component Kits', desc: 'Accelerate your style workflow using utility-first classes, layout configurations, and component designing.' },
      { step: 4, title: 'React.js & State Management', desc: 'Build reactive, reusable web components, manage hooks, handle routing, and state synchronizations.' },
      { step: 5, title: 'Version Control & Deployment', desc: 'Learn Git commands, push code to GitHub repositories, and host live servers via Netlify, Vercel, or GitHub Pages.' }
    ],
    courses: [
      { title: 'Responsive Web Design Certification', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', rating: 4.9, isFree: true },
      { title: 'JavaScript Algorithms & Structures', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', rating: 4.8, isFree: true },
      { title: 'Full Stack Open', provider: 'University of Helsinki', url: 'https://fullstackopen.com/en/', rating: 4.9, isFree: true }
    ],
    tools: [
      { name: 'VS Code', purpose: 'Industry standard source-code editor with powerful extensions.', url: 'https://code.visualstudio.com/' },
      { name: 'GitHub', purpose: 'Hosting service for version control and software collaboration.', url: 'https://github.com/' },
      { name: 'Chrome DevTools', purpose: 'Inspect HTML elements, debug Javascript errors, and profile responsiveness.', url: 'https://developer.chrome.com/docs/devtools/' }
    ],
    opportunities: [
      { title: 'Junior Frontend Developer', platform: 'Remote Startups', earnings: '$35 - $60 / hour' },
      { title: 'Landing Page Contractor', platform: 'Fiverr / Upwork', earnings: '$150 - $450 per project' },
      { title: 'Web Maintenance Specialist', platform: 'Local Businesses', earnings: '$400 - $900 / month retainer' }
    ]
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    iconName: 'Palette',
    shortDesc: 'Craft powerful brand identities, logos, and captivating marketing assets.',
    description: 'Transform abstract concepts into polished visual designs. Study core layout guidelines, professional typography pairings, color theory psychology, and digital vector illustration techniques that brands rely on to win customer trust.',
    difficulty: 'Beginner',
    duration: '1 - 3 Months',
    roadmapSteps: [
      { step: 1, title: 'Fundamentals of Design', desc: 'Study layout balance, white space discipline, visual hierarchy, contrast patterns, and typeface psychology.' },
      { step: 2, title: 'Mastering Vector Art', desc: 'Learn to manipulate anchor points, bezier curves, scale grids, and coordinate custom emblem assets.' },
      { step: 3, title: 'Editorial & Brand Assets', desc: 'Design professional marketing material, corporate flyers, business layouts, and printable mockups.' },
      { step: 4, title: 'Design Assets & Exports', desc: 'Configure optimal exports for social platforms, high-resolution prints, color matching models (RGB vs. CMYK).' }
    ],
    courses: [
      { title: 'Graphic Design Basics & Projects', provider: 'Canva Design School', url: 'https://www.canva.com/', rating: 4.8, isFree: true },
      { title: 'Vector Illustration Workshops', provider: 'Inkscape Academy', url: 'https://inkscape.org/learn/', rating: 4.6, isFree: true }
    ],
    tools: [
      { name: 'Canva', purpose: 'Collaborative cloud-based graphic creator for publishing assets fast.', url: 'https://www.canva.com/' },
      { name: 'Figma', purpose: 'Vector artwork editor perfect for building dynamic graphic compositions.', url: 'https://www.figma.com/' },
      { name: 'Inkscape', purpose: 'Free and open-source professional editing suite for vector design.', url: 'https://inkscape.org/' }
    ],
    opportunities: [
      { title: 'Logo Designer', platform: '99Designs / Fiverr', earnings: '$100 - $600 per logo' },
      { title: 'Marketing Content Creator', platform: 'Social Media Agencies', earnings: '$20 - $35 / hour' },
      { title: 'Brand Identity Consultant', platform: 'Upwork', earnings: '$800 - $2,000 package' }
    ]
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    iconName: 'Video',
    shortDesc: 'Assemble high-retention short reels, visual transitions, and stories.',
    description: 'Produce high-engagement video assets optimized for TikTok, YouTube, and corporate ads. Learn the pacing, pacing soundscapes, frame color grading, audio leveling, and dynamic transitions that hold viewers eyes for maximum duration.',
    difficulty: 'Beginner',
    duration: '1 - 2 Months',
    roadmapSteps: [
      { step: 1, title: 'Timeline & Cut Basics', desc: 'Understand standard frames-per-second, structural imports, multi-track timelines, trim actions, and raw layouts.' },
      { step: 2, title: 'Sound Design & Layering', desc: 'Integrate non-copyright audio background, equalize sound cues, extract vocal tracks, and apply ducking effects.' },
      { step: 3, title: 'Color Grading & Lighting', desc: 'Adjust clip temperature, adjust contrast ratios, utilize LUT filters, and balance background luminescence.' },
      { step: 4, title: 'Dynamic Captions & FX', desc: 'Animate subtitles, design visual trigger animations, utilize keyframes, and optimize responsive social formats.' }
    ],
    courses: [
      { title: 'CapCut Video Editing Guide & Workflows', provider: 'CapCut Learning Centre', url: 'https://www.capcut.com/', rating: 4.7, isFree: true },
      { title: 'Cinematic Storytelling & Editing', provider: 'YouTube Creator Suite', url: 'https://www.youtube.com/creators/', rating: 4.8, isFree: true }
    ],
    tools: [
      { name: 'CapCut', purpose: 'Intuitive modern workflow editor with direct template resources and AI transcription.', url: 'https://www.capcut.com/' },
      { name: 'DaVinci Resolve', purpose: 'Free professional-grade color workspace and timeline editing powerhouse.', url: 'https://www.blackmagicdesign.com/products/davinciresolve' },
      { name: 'Audacity', purpose: 'High performance audio toolkit to edit micro cuts and clean up background hums.', url: 'https://www.audacityteam.org/' }
    ],
    opportunities: [
      { title: 'TikTok / YouTube Shorts Editor', platform: 'Content Creators', earnings: '$25 - $50 per short reel' },
      { title: 'Promotional Video Creator', platform: 'E-commerce Brands', earnings: '$300 - $800 per video' },
      { title: 'Corporate Video Contractor', platform: 'Upwork', earnings: '$40 - $75 / hour' }
    ]
  },
  {
    id: 'ai-tools',
    name: 'AI Tools & Prompting',
    iconName: 'Sparkles',
    shortDesc: 'Harness powerful Gemini models and conversational AI pipelines.',
    description: 'Master conversational intelligence, prompt engineering, and automated workflow pipelines. Learn how to write structured context instructions, orchestrate multi-step automated tasks, and integrate AI to complete creative tasks in half the time.',
    difficulty: 'Beginner',
    duration: '2 - 4 Weeks',
    roadmapSteps: [
      { step: 1, title: 'Prompting Foundations', desc: 'Understand zero-shot, few-shot, and Chain-of-Thought frameworks to dramatically improve AI responses.' },
      { step: 2, title: 'Retrieval & Structuring', desc: 'Learn to pass custom files, define outputs in markdown, format tables, and extract actionable summaries.' },
      { step: 3, title: 'Automation Pipelines', desc: 'Leverage Zapier or Make to connect AI text generators with daily workspaces, calendar, and spreadsheets.' },
      { step: 4, title: 'Ethics & Accuracy Guardrails', desc: 'Identify AI hallucinations, execute facts checking, and maintain data confidentiality constraints.' }
    ],
    courses: [
      { title: 'ChatGPT & Prompting Mastery', provider: 'OpenAI Guides', url: 'https://chat.openai.com/', rating: 4.9, isFree: true },
      { title: 'Google Gemini API Training', provider: 'Google Cloud Skills', url: 'https://ai.google.dev/', rating: 4.8, isFree: true }
    ],
    tools: [
      { name: 'ChatGPT', purpose: 'Powerful text automation client to map thoughts to complex digital layouts.', url: 'https://chat.openai.com/' },
      { name: 'Claude AI', purpose: 'Advanced long-context models specialized in structural analysis and writing tasks.', url: 'https://claude.ai/' },
      { name: 'Make.com', purpose: 'No-code pipeline workflow to trigger AI APIs on daily spreadsheets and files.', url: 'https://www.make.com/' }
    ],
    opportunities: [
      { title: 'AI Automation Consultant', platform: 'SMEs & agencies', earnings: '$50 - $100 / hour' },
      { title: 'Prompt Engineer Specialist', platform: 'Contract Markets', earnings: '$400 - $1,500 project' }
    ]
  },
  {
    id: 'crypto-web3',
    name: 'Crypto & Web3 Blockchain',
    iconName: 'Coins',
    shortDesc: 'Deconstruct decentralised technology, minting, and block security layers.',
    description: 'Gain a solid, non-hype understanding of decentralized ledger systems, digital tokens, ledger layers, smart contract logic, and the mechanics supporting the sovereign internet ecosystem.',
    difficulty: 'Intermediate',
    duration: '2 - 4 Months',
    roadmapSteps: [
      { step: 1, title: 'Sovereign Ledger Concept', desc: 'Understand cryptography mechanisms, decentralised architecture, consensus networks (Proof of Work vs. Stake).' },
      { step: 2, title: 'Smart Contract Overview', desc: 'Learn structural logic concepts behind smart protocols, state storage, gas, and programmatic safety foundations.' },
      { step: 3, title: 'Interacting with Wallets', desc: 'Master public/private key mechanics, browser extensions, gas estimation, secure storage, and transaction execution.' },
      { step: 4, title: 'dApp Frontend Integrations', desc: 'Connect modern React web clients to public blockchain networks, query token storage, and trigger signers.' }
    ],
    courses: [
      { title: 'Crypto Basics & Ethereum Guide', provider: 'Ethereum Foundation', url: 'https://ethereum.org/', rating: 4.8, isFree: true },
      { title: 'CryptoZombies Smart Code Guides', provider: 'CryptoZombies Interactive', url: 'https://cryptozombies.io/', rating: 4.9, isFree: true }
    ],
    tools: [
      { name: 'MetaMask', purpose: 'Cryptographic browser interface to communicate with decentralised networks.', url: 'https://metamask.io/' },
      { name: 'Etherscan', purpose: 'Comprehensive ecosystem scanner to inspect block ledgers, balances, and gas indexes.', url: 'https://etherscan.io/' },
      { name: 'Alchemy', purpose: 'API developer gateway to stream live blockchain events to custom user clients.', url: 'https://www.alchemy.com/' }
    ],
    opportunities: [
      { title: 'Web3 Technical Writer', platform: 'DeFi Ecosystems', earnings: '$45 - $80 / hour' },
      { title: 'Junior Smart Contract Auditor', platform: 'Web3 Security Houses', earnings: '$50k - $110k base remote' },
      { title: 'Community Lead', platform: 'DAO Communities', earnings: '$1,200 - $3,500 / month' }
    ]
  },
  {
    id: 'online-freelancing',
    name: 'Online Freelancing',
    iconName: 'Briefcase',
    shortDesc: 'Package digital assets, write proposals, and get paid globally.',
    description: 'Learn the business side of digital skills. Understand how to package what you know into premium services, pitch yourself persuasively, build stellar relationship networks, and secure remote foreign payment flows effortlessly.',
    difficulty: 'Beginner',
    duration: '3 - 6 Weeks',
    roadmapSteps: [
      { step: 1, title: 'Pricing & Offer Packaging', desc: 'Convert simple talent into productized assets. Formulate value-based contracts over raw time models.' },
      { step: 2, title: 'Stellar Portfolio Curation', desc: 'Display high-impact project studies, realistic mock tasks, clear outcome logs, and visual testimonials.' },
      { step: 3, title: 'Writing Premium Proposals', desc: 'Draft hyper-targeted project solutions that speak to client issues, skipping boring generic statements.' },
      { step: 4, title: 'Contracts & Foreign Transfers', desc: 'Integrate global billing tools, handle escrow protections, sign remote SLAs, and save invoices.' }
    ],
    courses: [
      { title: 'Upwork Academy Training', provider: 'Upwork', url: 'https://www.upwork.com/', rating: 4.7, isFree: true },
      { title: 'The Freelancing Playbook', provider: 'SkillShare Free Track', url: 'https://www.upwork.com/resources', rating: 4.6, isFree: true }
    ],
    tools: [
      { name: 'Upwork', purpose: 'Premium remote workspace marketplace connecting remote talent to business accounts.', url: 'https://www.upwork.com/' },
      { name: 'Fiverr Workspace', purpose: 'Invoicing, active proposal manager, task trackers, and receipt logger.', url: 'https://www.fiverr.com/' },
      { name: 'Loom', purpose: 'Record short response videos to walk clients through visual proposals and prototypes.', url: 'https://www.loom.com/' }
    ],
    opportunities: [
      { title: 'Digital Contractor', platform: 'Upwork & Freelancer', earnings: '$1,500 - $5,000 / month average' },
      { title: 'Virtual Strategy Advisor', platform: 'E-commerce Brands', earnings: '$30 - $65 / hour' }
    ]
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    iconName: 'Tv',
    shortDesc: 'Build personal digital channels across YouTube, Newsletter and X streams.',
    description: 'Gain a solid command over internet storytelling and organic brand marketing. Learn modern algorithmic mechanics, content scripting hooks, distribution hacks, and monetization streams.',
    difficulty: 'Beginner',
    duration: '2 - 3 Months',
    roadmapSteps: [
      { step: 1, title: 'Identify Niche & Avatar', desc: 'Pinpoint specific topics where interest overlaps market viability, and outline your target customer.' },
      { step: 2, title: 'Algorithmic Retention Hooking', desc: 'Craft high-retention video intros, text threads, titles, and thumbnails that spark immediate clicks.' },
      { step: 3, title: 'Batching & Visual Pipelines', desc: 'Set up systematic scriptwriting templates, schedule queues, shoot content in cycles, and manage edits.' },
      { step: 4, title: 'Sponsorship Monetizations', desc: 'Structure media kits, negotiate affiliate programs, set up custom digital stores, and secure ads.' }
    ],
    courses: [
      { title: 'YouTube Strategy & Analytics Program', provider: 'YouTube Creators Hub', url: 'https://youtube.com/creators/', rating: 4.8, isFree: true },
      { title: 'Social Copywriting & Growth Essentials', provider: 'Verse Academy', url: 'https://twitter.com/', rating: 4.5, isFree: true }
    ],
    tools: [
      { name: 'Substack', purpose: 'Publish beautiful independent newsletters directly with dynamic monetization filters.', url: 'https://substack.com/' },
      { name: 'Buffer', purpose: 'Schedule marketing posts across Twitter, LinkedIn, Instagram automatically.', url: 'https://buffer.com/' },
      { name: 'Notion', purpose: 'Content databases, editorial calendar managers, and script brainstorm templates.', url: 'https://www.notion.so/' }
    ],
    opportunities: [
      { title: 'YouTube Content Director', platform: 'Business Brands', earnings: '$1k - $4k monthly base' },
      { title: 'Ghostwriter & Copy Specialist', platform: 'X Founder Pages', earnings: '$150 - $400 per asset thread' },
      { title: 'Sponsorship Partner', platform: 'Independent Sponsorships', earnings: '$500 - $3,000 per post' }
    ]
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Product Design',
    iconName: 'Layers',
    shortDesc: 'Draft high-fidelity wireframes, interactive user flows, and prototypes.',
    description: 'Shape how users interact with screens. Step deep into UX research surveys, user journey mapping, visual spacing principles, layouts, interactive components, and high-fidelity mock prototyping.',
    difficulty: 'Beginner',
    duration: '2 - 4 Months',
    roadmapSteps: [
      { step: 1, title: 'UX Core Research Maps', desc: 'Conduct mock interviews, construct user persona matrices, test competitor sites, and plot user journeys.' },
      { step: 2, title: 'Wireframing & Spacing Architecture', desc: 'Study relative layouts, responsive structural margins, typography hierarchy, and grey scale layouts.' },
      { step: 3, title: 'UI Themes & Variable Tokens', desc: 'Create extensive style guides, choose color gradients, design interactive button cards, and manage inputs.' },
      { step: 4, title: 'Interactive Prototypes', desc: 'Figma smart-animate connections, setup seamless popup drawers, record flows, and share design links.' }
    ],
    courses: [
      { title: 'Figma Fundamentals', provider: 'Figma Best Practices', url: 'https://www.figma.com/', rating: 4.9, isFree: true },
      { title: 'Product UX Research Certification', provider: 'Google Career Certifications', url: 'https://grow.google/certificates/', rating: 4.8, isFree: true }
    ],
    tools: [
      { name: 'Figma', purpose: 'Industry leading collaborative cloud platform for design and wireframing.', url: 'https://www.figma.com/' },
      { name: 'Unsplash', purpose: 'Collection of free, high resolution, non-copyright digital design photography.', url: 'https://unsplash.com/' },
      { name: 'Coolors', purpose: 'Super-fast generator to curate, export, and matching custom visual gradients.', url: 'https://coolors.co/' }
    ],
    opportunities: [
      { title: 'UI/UX Mock Architect', platform: 'Mobile Startups', earnings: '$40 - $70 / hour' },
      { title: 'Figma Prototyping Contractor', platform: 'Bento Agencies', earnings: '$500 - $2,500 mockup task' },
      { title: 'Digital Product Designer', platform: 'Enterprise Remote', earnings: '$60k - $120k / year' }
    ]
  }
];

export const initialCommunityTips: CommunityTip[] = [
  {
    id: 'tip-1',
    author: 'Adebayo S.',
    category: 'Web Development',
    content: 'Do NOT start with complex frameworks like Angular or React right away. Spend at least two full weeks mastering CSS grid, flexbox and simple JS querySelectors. It makes everything ten times easier later!',
    upvotes: 42,
    timestamp: '2 hours ago'
  },
  {
    id: 'tip-2',
    author: 'Sarah M.',
    category: 'Online Freelancing',
    content: 'When writing Upwork proposals, skip greeting templates like "Hello Dear Hiring Manager". Start immediately with a 2-sentence solution/critique of their website or project. This instantly grabs attention and wins contracts.',
    upvotes: 56,
    timestamp: '5 hours ago'
  },
  {
    id: 'tip-3',
    author: 'Tushar K.',
    category: 'Video Editing',
    content: 'For highly engaging YouTube shorts, sound effects (swooshes, papers, pops) are just as important as the visual cuts themselves! Make sure to space sound effects on every single transition.',
    upvotes: 29,
    timestamp: '1 day ago'
  },
  {
    id: 'tip-4',
    author: 'Liam O.',
    category: 'UI/UX Design',
    content: 'Before design prototyping in Figma, force yourself to make a clean layout on actual paper. This detaches your brain from clicking tools and focuses fully on core layout hierarchy and readability.',
    upvotes: 38,
    timestamp: '2 days ago'
  }
];
