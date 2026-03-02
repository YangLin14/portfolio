# Love Ability Gym - Technical Guide

This document provides a comprehensive technical overview of the Love Ability Gym application. It is structured to help developers navigate the **Frontend**, **Backend/Data**, and **DevOps** layers of the system efficiently.

---

## 🏗️ 1. Architecture Overview

### High-Level Philosophy
The application is a **Client-Side Rendered (CSR)** Single Page Application (SPA) built with **React 19** and **Vite**. It adheres strictly to **"Offline-First"** principles, utilizing **IndexedDB** as the primary source of truth and **Supabase** purely for optional cloud synchronization.

### Tech Stack Summary

| Category | Technology | Reasoning |
|----------|------------|-----------|
| **Framework** | React 19 | Leveraging latest features like hooks and concurrent rendering. |
| **Build Tool** | Vite 6 | Extremely fast HMR and optimized production builds. |
| **Routing** | React Router v6 | Standard declarative routing for SPAs. |
| **State** | React Context API | Sufficient for global state without Redux bloat. |
| **Styling** | CSS Modules + CSS Variables | Scoped component styles via `*.module.css` + global theming. |
| **Storage** | IndexedDB + localStorage | robust offline data persistence (>5MB capacity). |
| **Sync** | Custom Delta Sync | Bandwidth-efficient synchronization with Last-Write-Wins resolution. |
| **Testing** | Vitest + RTL | Fast integration testing with `fake-indexeddb` support. |

### 📂 Directory Structure

```text
src/
├── assets/              # Static assets (images, icons)
├── components/          # Shared reusable UI components
│   ├── DailyCheckIn.jsx # Core "Check-In" logic and UI
│   ├── BottomNav.jsx    # Bottom navigation bar
│   ├── profile/         # Decomposed Profile sub-components
│   │   ├── ProfileHeader.jsx
│   │   ├── StatsOverview.jsx
│   │   ├── ActivityHistory.jsx
│   │   └── LogItem.jsx
│   └── ...
├── context/             # Global State Managers (React Context)
│   ├── AppProvider.jsx  # Composite wrapper (initializes StorageService)
│   ├── UserContext.jsx  # Gamification state (XP, Level, Streak)
│   ├── LanguageContext.jsx # I18n provider
│   ├── NotificationContext.jsx # Toast notification system
│   └── AuthContext.jsx  # Authentication state
├── data/                # Static data (Taxonomy, Quizzes)
├── hooks/               # Custom React Hooks (Business Logic)
├── i18n/                # Internationalization
│   ├── translations.js  # Main dictionary combining locales
│   ├── en.js            # English strings
│   └── zh.js            # Chinese strings
├── modules/             # Feature-specific modules (Scalable structure)
│   └── uplink/          # "The L3 Uplink" module
│       ├── context/     # Module-specific state (UplinkContext)
│       └── components/  # TheMirror, TheLedger, TheAnchor, TheRadar
├── pages/               # Top-level Route Components (Dashboard, Profile)
├── services/            # Singleton Business Services
│   ├── StorageService.js # Hybrid IndexedDB + Sync Orchestrator
│   ├── db.js            # Native IndexedDB wrapper
│   └── supabaseClient.js
└── App.jsx              # App Root & Routing Setup
```

---

## 🎨 2. Frontend Architecture

This section covers everything running in the browser related to UI, UX, and Application State.

### Core Systems

1.  **Routing**: Uses `react-router-dom` with `React.lazy` for code-splitting main pages (`Dashboard`, `Profile`).
2.  **PWA Integration**:
    -   Configured via `vite-plugin-pwa`.
    -   **Service Worker**: Uses Workbox (`generateSW`) with `StaleWhileRevalidate` strategy for assets.
    -   **Install Prompt**: The `AppProvider` listens for `beforeinstallprompt` to allow custom UI triggers for installation.
3.  **Internationalization (i18n)**:
    -   Managed by `LanguageContext`.
    -   Scanning `src/i18n/translations.js` which aggregates `en.js` and `zh.js`.
    -   Helper `t(path)` resolves nested keys safely.
    -   **Structure**: Each tool's translation includes an `intro` object with `{ what, purpose, why }` keys to populate the `ToolIntro` component.

### State Management

Global state is avoided unless necessary. We use **React Context** for cross-cutting concerns:

-   **UserContext**: Handles gamification (XP, Level, Streaks). Persists to `love_gym_stats` in localStorage.
-   **NotificationContext**: Manages a global toast stack.
    -   `addNotification(msg, type)` pushes to a queue.
    -   Auto-dismissal via `setTimeout`.
-   **AuthContext**: Wraps Supabase Auth sessions.
-   **UplinkContext**: (Module-specific) Manages the complex state machine for the Relationship Repair Protocol.

### UI & Design System

-   **Styling**: **CSS Modules** (`*.module.css`) for component safety + **CSS Variables** (`index.css`) for global theme tokens (colors, spacing).
-   **Animations**: **Framer Motion** powers:
    -   **Page Transitions**: `AnimatePresence` with `mode="wait"`.
    -   **Crisis Mode Overlay**: Uses `clipPath: circle(...)` to create a smooth, performant expanding transition from the bottom-right trigger button to a full-screen overlay.
-   **Accessibility (a11y)**:
    -   Semantic HTML (`<nav>`, `<main>`, `<article>`).
    -   `aria-label` on all icon-only buttons.
    -   **ToolIntro**: A reusable modal component that provides "What/Purpose/Why" educational context for each tool. It uses `localStorage` to track if a user has seen the intro, ensuring it only appears on the first visit (or when manually triggered).
        -   **Examples**: `StoryBuster`, `TheRadar`, `TimeCapsule` (which also supports a `quote` feature).
    -   Keyboard navigation support via `tabIndex` and focus management.

### Feature Module: Stage 1 (Self-Awareness)

A comprehensive, gamified assessment pipeline designed to establish the user's emotional baseline:

1. **Architecture & Persistence**: Uses `useStage1Store` (Zustand + `persist` middleware) for complex multi-step flows and tracking state rollback (`undoStack`). Data maps to a strict shape (`schema.js`).
2. **Interactive UI**: Shared components (`SwipeCard`, `TagCloudSelector`, `ZeroSumSliders`) built with Framer Motion and `useHaptics` for rich feedback.
3. **Levels**:
   - **Level 1 (DISC)**: Forced-choice and scenario swiping to measure pacing and focus.
   - **Level 2 (Values)**: Hierarchy mapping and 100-point sum allocations.
   - **Level 3 (Attachment)**: Parental tagging, childhood radar mapping, and interpersonal safety scales.
   - **Boss Level (Happiness)**: Synthesizing real-world pain points to produce actionable intelligence.
4. **Data Fusion & Handoff**: A core algorithmic engine identifies contradictions and passes contextual pain-points to the Stage 2-4 tools via a custom hand-off logic.

> 📘 **Deep Dive**: For full implementation details, schema definitions, and calculation logic, see [**Stage 1 Implementation Details**](./docs/stage1-implementation-details.md).

### Feature Module: The L3 Uplink

A specialized module with a **Linear State Machine**:

1.  **The Mirror (Diagnosis)**: Randomizes 3 scenarios from `data/scenarios.js`. Scrambles options to prevent memorization.
2.  **The Ledger (Analysis)**: Input-heavy form to analyze "Give vs Take" dynamics.
3.  **The Anchor (Regulation)**: A visual breathing guide (4-7-8 rhythm) using purely CSS/Framer Motion.
4.  **The Radar (Inference)**: A wizard flow (Observe -> Hypothesis -> Probe). Can function as a standalone tool in Module 3.

---

## 💾 3. Backend & Data Layer

This section covers data persistence, synchronization, and server-side integration.

### Data Persistence Strategy

The app uses a **Hybrid Local-First** approach.

1.  **Primary Storage (IndexedDB)**:
    -   **Wrapper**: `src/services/db.js` (Zero dependency).
    -   **Store**: `logs` object store with indexes on `moduleName` and `createdAt`.
    -   **Performance**: Async non-blocking I/O.
2.  **Fallback/Cache (Memory + localStorage)**:
    -   `StorageService` maintains an in-memory cache of logs for **synchronous** reads (instant UI rendering).
    -   Profile/Stats are stored in `localStorage` for simplicity.

### Sync Engine (`StorageService.js`)

A custom **Delta Sync** implementation ensures efficiency and data integrity.

-   **Workflow**:
    1.  **Push**: Local writes are saved to IDB immediately. If online, an async background task pushes to Supabase.
    2.  **Pull**: On load/refresh, the app requests *only* records modified after `last_sync_timestamp`.
    3.  **Merge**: Incoming cloud records are merged into IDB.
    4.  **Push Back**: Any local records created after the last sync are pushed upstream.
-   **Conflict Resolution**: **Last-Write-Wins (LWW)** using high-precision timestamps.

### Cloud Infrastructure (Supabase)

-   **Database**: PostgreSQL.
-   **Table**: `user_logs` (JSONB).
    -   `id` (UUID): Primary Key.
    -   `data` (JSONB): Stores the log payload flexibly.
    -   `client_id`: Used for deduping.
-   **Authentication**: handled via Supabase Auth (Email/Password).

---

## 🧪 4. Quality Assurance

### Testing Strategy

We use **Vitest** for a fast, Jest-compatible runner.

-   **Unit Tests**: Focus on pure logic (hooks, utils).
-   **Integration Tests**: Focus on User Flows (rendering components with providers).
-   **Environment**: `jsdom` with `fake-indexeddb` to simulate a real browser database environment.

### Mocking Strategy

| Dependency | Mock Approach | Reason |
|------------|---------------|--------|
| **Supabase** | Global mock in `setupTests.js` | Prevent network mastery; deterministic auth states. |
| **IndexedDB** | `fake-indexeddb` | Full in-memory IDB implementation for accurate storage testing. |
| **StorageService** | `vi.mock()` (partial) | Isolate component UI from complex sync logic when needed. |
| **Navigation** | `vi.mock('react-router-dom')` | Spy on `useNavigate` calls. |

### Test Suites

| Category | Coverage | Key Files |
|----------|----------|-----------|
| **Core Logic** | 100% | `useEmotionAnalysis.test.jsx`, `StorageService.test.js` |
| **UI Components** | High | `Dashboard.test.jsx`, `Profile.test.jsx`, `DailyCheckIn.test.jsx` |
| **Feature Flows** | High | `UplinkFlow.test.jsx`, `NotificationContext.test.jsx` |

---

## 🚀 5. DevOps & Workflow

### Development

```bash
# Install
npm install

# Start Dev Server
npm run dev

# Run Tests
npm test
```

### Deployment

The app is static and can be deployed to any static host (Vercel, Netlify, S3).

1.  **Build**: `npm run build` generates the `dist/` folder.
2.  **Config**: `vite.config.js` handles path aliasing and PWA manifest generation.
3.  **Env Variables**:
    -   `VITE_SUPABASE_URL`: Your Supabase project URL.
    -   `VITE_SUPABASE_ANON_KEY`: Public API key.
