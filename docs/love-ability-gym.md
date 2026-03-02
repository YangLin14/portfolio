# 💪 Love Ability Gym

A mobile-first web application for training emotional intelligence and relationship skills through interactive exercises and guided practices.

[Love Ability Gym](https://love-ability-gym.vercel.app/)

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

## Purpose

為了幫助人們在親密關係中，先學會了解自己（不管是情緒、需求、或是想法）。進而學會如何控制自己的情緒，了解如何冷靜自己，用理性的方式溫和對待關係，不再因為情緒上頭而傷害對方。學習如何清晰的表達自己的感受，客觀的描述事實，明確的講述自己的想法及需求。

認識完自己，才有能力去認識對方，但切記要先對自己有一定程度的了解和掌握度。學習對方心裡的想法，學會換位思考，理解對方的感受，並給予適當的回應。學會如何共情和接住對方的情緒，知道怎麼正確的安慰對方，不是一味的「說教」或「給建議」，而是「同理」與「陪伴」。讓對方感受到我們懂他/她，而不是急著否定或批判對方。

最終達成目的：學會如何愛自己與愛人。

English: To help people navigate intimate relationships, the first step is to learn to understand oneself (whether it's emotions, needs, or thoughts). This leads to learning how to control one's emotions, how to calm oneself, and how to treat relationships rationally and gently, avoiding hurting one's partner due to emotional outbursts. It also involves learning how to clearly express one's feelings, objectively describe facts, and clearly articulate one's thoughts and needs.

Only after understanding oneself can one understand the other person, but it's crucial to have a certain level of self-understanding and control first. Learn to understand the other person's thoughts, practice empathy, understand their feelings, and respond appropriately. Learn how to empathize with and accept their emotions, and know how to properly comfort them—not through lecturing or giving advice, but through empathy and companionship. Let the other person feel understood, rather than being quick to negate or criticize them.

Ultimately, the goal is to learn how to love oneself and one's partner.

## 📖 About

Love Ability Gym is not about finding love—it's about **building the capacity to love**. Through 5 core modules, users can strengthen their "emotional muscles" with practical tools and exercises.

### 🎯 Core Modules

| Module | Focus | Key Tools |
|--------|-------|-----------|
| **Module 1** | 覺察 (Awareness) | Emotion Scan, Story Buster, Rapid Awareness, Attribution Shift, Happiness Scale, Time Travel |
| **Module 2** | 表達 (Expression) | Draft Builder, Vocabulary Swap, Apology Builder |
| **Module 3** | 共情 (Empathy) | Anger Decoder, Deep Listening Lab, Perspective Switcher, **The Radar** |
| **Module 4** | 允許 (Allowing) | Permission Slip, Reframing Tool |
| **Module 5** | 影響 (Influence) | Spotlight Journal, Time Capsule, Vision Board |
| **Special** | **The L3 Uplink** | **Relationship Repair Protocol**: From Ego (L1) to Empathy (L3) via 4-phase training. |

### 🧩 Stage 1: Self-Awareness (出廠設定)
The foundational stage where users discover their emotional baseline through highly interactive assessments.
- **Level 1: DISC Assessment** - Uncover communication pacing and focus.
- **Level 2: Core Values** - Map out the "Hierarchy of Love" and life pillar allocations.
- **Level 3: Attachment & Origin** - Trace childhood atmospheres and defense mechanisms.
- **Boss Level: Happiness Questionnaire** - Synthesize deep relationship insights and generate a "Relationship X-Ray".

> 📘 **Developer Note**: For a deep dive into the architecture, state management, and UI components powering Stage 1, please see the [**Stage 1 Implementation Details**](./docs/stage1-implementation-details.md).

### ❤️ The L3 Uplink (Special Feature)
A specialized protocol for relationship repair and emotional maturity training.
- **Phase 1: The Mirror** - Situational diagnosis to identify Ego (L1) vs Empathy (L3).
- **Phase 2: The Ledger** - Analyzing "Give vs Take" dynamics in relationships.
- **Phase 3: The Anchor** - Physiological regulation (Breathing) before engagement.
- **Phase 4: The Radar** - A structured "Observe -> Hypothesis -> Test" wizard for reading needs.

## ✨ Features

- 🌐 **Bilingual Support** - Full English and Traditional Chinese (繁體中文)
- ☁️ **Optional Cloud Sync** - Delta sync with conflict resolution via Supabase
- 🎬 **Smooth Animations** - Seamless page transitions and expanding UI elements
- ♿ **Accessible Design** - ARIA labels, keyboard navigation, screen reader support
- 🚀 **Instant Splash Screen** - Immediate load with smooth transitions
- 📲 **PWA Ready** - Installable as a native app with offline capabilities
- 📱 **Mobile-First Design** - Optimized for phone use
- 📊 **Progress Tracking** - XP system and emotional weather charts
- 🔔 **Smart Notifications** - Non-intrusive toast notifications for feedback and rewards
- 🆘 **Crisis Mode** - Quick-access breathing exercises for emotional emergencies
- 🎓 **Educational Tool Intros** - "What/Purpose/Why" guides for every emotional tool
- 💾 **IndexedDB Storage** - All data stored privately on your device with localStorage fallback

##  Data & Privacy

**Your data belongs to you.**

- **IndexedDB + localStorage**: All logs, journal entries, and progress are stored primarily in **IndexedDB** (async, >5MB capacity) with **localStorage** as fallback. Keys are prefixed with `love_gym_`.
- **Delta Sync**: If you choose to sign in, data is backed up to a private Supabase database. Only new/changed records are synced (not the entire history), and conflicts are resolved via Last-Write-Wins timestamps.
- **Privacy First**: Syncing is completely optional. If you don't sign in, data never leaves your device.
- **⚠️ Important**: Clearing your browser cache or uninstalling the PWA will delete your data. We recommend backing up manually if needed.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YangLin14/love-ability-gym.git
cd love-ability-gym

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
love-ability-gym/
├── docs/                    # Design documentation
│   └── stage1-implementation-details.md  # Deep dive into Stage 1
├── public/                  # Static assets
├── src/
│   ├── components/          # Shared UI components
│   │   ├── profile/         # Decomposed Profile sub-components
│   │   │   ├── ProfileHeader.jsx
│   │   │   ├── StatsOverview.jsx
│   │   │   ├── ActivityHistory.jsx
│   │   │   └── LogItem.jsx
│   │   ├── BottomNav.jsx
│   │   ├── BottomNav.module.css
│   │   ├── DailyCheckIn.jsx
│   │   ├── DailyCheckIn.module.css
│   │   └── ...
│   ├── context/             # React context providers (User, Auth, Language, Notification)
│   ├── i18n/                # Internationalization
│   │   ├── translations.js  # Main entry point
│   │   ├── en.js            # English locales
│   │   └── zh.js            # Chinese locales
│   ├── modules/             # Feature modules (1-5)
│   │   ├── module1/         # Awareness tools
│   │   ├── module2/         # Expression tools
│   │   ├── module3/         # Empathy tools
│   │   ├── module4/         # Allowing tools
│   │   └── module5/         # Influence tools
│   ├── pages/               # Main pages (Dashboard, Profile, Onboarding)
│   │   ├── Profile.jsx      # Decomposed (uses profile/ sub-components)
│   │   ├── Profile.module.css
│   │   └── ...
│   ├── services/            # Storage and utility services
│   │   ├── StorageService.js # Hybrid IndexedDB + localStorage + Supabase sync
│   │   ├── db.js            # Native IndexedDB wrapper (zero dependencies)
│   │   └── supabaseClient.js
│   └── styles/              # Global styles and theme
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: CSS Modules + CSS Variables
- **Animation**: Framer Motion
- **State Management**: React Context
- **Storage**: IndexedDB (primary) + localStorage (fallback) + Supabase (optional cloud sync)
- **Sync**: Delta sync with LWW conflict resolution
- **Database**: PostgreSQL (via Supabase)
- **Charts**: Custom SVG components
- **Testing**: Vitest (fake-indexeddb for storage), React Testing Library
- **PWA**: Vite PWA Plugin
- **Accessibility**: ARIA labels, keyboard nav, screen reader support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by principles from:
- Nonviolent Communication (NVC)
- Emotional Intelligence research
- Cognitive Behavioral Therapy (CBT)
- Attachment theory

---

<p align="center">
  <strong>你變了，世界就變了。</strong><br>
  <em>"You change, the world changes."</em>
</p>
