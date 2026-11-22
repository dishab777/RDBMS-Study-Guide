# RDBMS Study Hub

RDBMS Study Hub is a responsive, dark-themed React website for learning relational database management systems. It includes structured syllabus lessons, ER and EER diagrams, SQL examples, step-by-step numerical solutions, quizzes, PYQ practice, formula revision, bookmarks, notes and LocalStorage-based progress tracking.

## Features

- Five syllabus chapters organized by course outcome
- Detailed topics with definitions, rules, examples, diagrams and exam guidance
- Step-by-step solution interface
- Interactive RDBMS quiz with answer explanations
- Global topic search
- Local study progress, streak, bookmarks and personal notes
- Formula and quick-revision sheet
- Responsive desktop, tablet and mobile layouts
- Vercel-ready client-side routing

## Technology

- React 18
- Vite 6
- React Router 7
- Tailwind-style custom CSS
- Lucide React
- KaTeX
- Recharts
- LocalStorage

## Run locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Deploy with Vercel

### GitHub deployment

1. Push this project to a GitHub repository.
2. Sign in to Vercel and choose **Add New Project**.
3. Import the repository.
4. Vercel will detect Vite automatically.
5. Use these settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
6. Select **Deploy**.

The included `vercel.json`:

- uses `dist` as the build output;
- configures Vite for Vercel;
- rewrites SPA routes to `index.html` so chapter, quiz and progress URLs work on refresh.

### Vercel CLI deployment

```bash
npm install --global vercel
vercel login
vercel
vercel --prod
```

## Project structure

```text
RDBMS Study Guide/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Diagram.jsx
│   │   ├── Layout.jsx
│   │   └── StepByStepSolution.jsx
│   ├── data/
│   │   └── syllabus.js
│   ├── hooks/
│   │   └── useProgress.js
│   ├── pages/
│   │   ├── ChapterPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProgressPage.jsx
│   │   ├── PYQPage.jsx
│   │   ├── QuizPage.jsx
│   │   └── RevisionPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
```

## Content note

The PYQ section contains clearly labeled adapted university-style practice questions. It does not present them as original questions from specific past examination years unless source text and an official year are supplied.
