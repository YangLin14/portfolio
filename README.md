# Portfolio — Fong-Yu (Yang) Lin

A responsive personal portfolio website showcasing my robot learning and software projects and professional experience.

🔗 **Live:** [yanglin14.github.io/portfolio](https://yanglin14.github.io/portfolio/)

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, CSS Grid, Flexbox, responsive breakpoints
- **JavaScript** — Smooth scrolling, live Taipei clock, dynamic footer year
- **Google Fonts** — Inter typeface

## Structure

```
├── index.html          # Main portfolio page
├── style.css           # Global styles & theming
├── script.js           # Interactions & live clock
├── projects/           # Individual project detail pages (15)
├── experience/         # Individual experience detail pages (9)
├── assets/
│   ├── images/         # Project screenshots & photos
│   └── videos/         # Demo videos
└── docs/               # Project documentation files
```

## Featured Projects

- **Unitree G1 Ping-Pong Forehand**: RL whole-body cross-court forehand for the Unitree G1, with Triton Droids (IsaacLab, MuJoCo, PPO)
- **URKL T800 Multi-Motion Tracking**: one policy that chains kick, dodge, and punch on EngineAI's T800 (mjlab, MuJoCo, PPO)
- **Humanoid Robot Teleoperation**: wearable IMU teleoperation for a custom 10-DOF humanoid, CSE 145 (IsaacLab, MuJoCo, Holosoma)
- **LLM Spatial Grounding (Talk-to-Robot)**: where LLMs fail at turning language into robot goals (MuJoCo, SAC+HER, Gemini)
- **PromptGuard**: prompt-injection testing and system-prompt hardening for LLM products (Python)
- **Love Ability Gym**: emotional intelligence training app (React, Vite, Supabase)
- **NewLedger**: cross-platform expense tracker (Flutter, Firebase, ML Kit)
- **Flashy**: AI flashcard platform (Next.js, Groq)
- And more under "Other Projects" on the site

## Development

```bash
# Serve locally (any static server)
npx serve .
```

No build step required — this is a static HTML/CSS/JS site.

## License

© Fong-Yu (Yang) Lin. All Rights Reserved.
