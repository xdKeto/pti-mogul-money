# PRD — "Board Quiz" Website (Jeopardy-style) for the 17 Agustus (Independence Day) Event

## 1. Project Summary
An interactive quiz website for the final game of a church's 17 Agustus (Indonesian Independence Day) competition. The concept is inspired by Jeopardy: a board with 5 categories, each with 6 questions worth points ($100–$600). The MC/operator clicks a card on screen (typically projected onto a large screen), the question appears, there's a button to reveal the answer, then a button to go back to the board. Once a card has been opened it turns **greyed-out** (disabled) persistently, even after the page is refreshed.

This is **not** a full Jeopardy replica — there's no automatic scoring, buzzers, or multiplayer. The focus is purely on the navigation system: board → question → answer → back, with a visually appealing look (see the attached design reference for the layout/pill-button style — colors are not taken from that reference, see Section 8).

## 2. Goals
- The operator/MC can run the whole game from a single screen (a laptop that's mirrored/projected) without needing any other tools.
- Question content (questions, answers, media) is 100% managed manually through a single JSON file — no backend/CMS needed.
- Progress (which cards have been opened) persists in the browser, survives page refreshes, and can be reset anytime via a "Clear Cards" button.
- Supports 4 question content types: plain text, image, video, and audio (with play/pause/replay controls).
- An engaging design that feels like a real game show, with smooth transition animations.

## 3. Out of Scope
To keep development fast, the following are **intentionally not built**:
- Authentication/login, data security, rate-limiting, etc.
- Automatic per-team/per-participant scoring (scores are tracked manually by the judges/MC).
- Real-time multiplayer / cross-device sync (the assumption is that only one device runs the app, watched by everyone via a projector).
- A CMS/admin panel for editing questions through a UI — questions are edited directly in the JSON file by the user.
- Backend/database — all content is static and bundled at build time.
- SEO optimization, analytics, error tracking.

## 4. Tech Stack
| Part | Choice | Reason |
|---|---|---|
| Framework | **Vite + React (+ TypeScript)** | No need for SSR/complex routing (just one page with 2 "views"), so Vite is lighter and faster for an agent to scaffold compared to Next.js. Vercel supports deploying Vite apps with zero extra config. |
| Styling | **Tailwind CSS** | Fast for styling a custom theme, easy for an AI agent to work with. |
| Animation | **Framer Motion** | Board ↔ question transitions, staggered card animations, answer reveal. |
| State/Persistence | **localStorage** (instead of cookies) | Simpler for simple client-only data like "the list of question IDs that have been opened." No need to send it to a server, so cookies aren't necessary. |
| Question Content | **A single `quiz-data.json` file** imported directly into the app | User edits it manually, no backend needed. |
| Media (images/videos) | Static files in the `/public/media/` folder | Referenced by filename in the JSON. |
| Deploy | **Vercel** | Push to GitHub → auto-deploy, zero-config for a Vite app. |

## 5. User Flow
1. **Board Page** loads → the app reads `quiz-data.json` → renders 5 category columns, each column containing 6 pill buttons ($100–$600) stacked vertically.
2. Cards whose IDs are already in localStorage (previously opened) are immediately shown **greyed-out** and can no longer be clicked.
3. Clicking an active card → an animated transition to the **Question View**, showing:
   - Category name & point value in the header.
   - Question content based on `question_type`:
     - `text` → show the question text only.
     - `image` → show the question text (if any) + an image from `question_media`.
     - `video` → show the question text (if any) + a video player from `question_media`, with **Play/Pause** controls and a **Replay** button (restart from 0:00).
     - `audio` → show the question text (if any) + an MP3 player from `question_media`, with **Play/Pause** controls and a **Replay** button (restart from 0:00).
   - A **"Show Hint"** button appears only if the `hint` field is filled in (click to toggle show/hide).
4. **"Reveal Answer"** button → reveals the answer area with an animation (e.g. fade/slide), showing `answer` (text) and, if present, `answer_media` according to `answer_type` (image/video, using the same player as the question).
5. **"Back to Board"** button →
   - Saves this question's ID to localStorage as "opened."
   - Animated transition back to the Board Page.
   - That card is immediately shown greyed-out on the board.
6. On the Board Page there's a **"Clear Cards"** button (in a corner, e.g. top-right) →
   - Clicking it → shows a simple confirmation (e.g. `window.confirm` or a small modal) "Reset all card progress?"
   - If confirmed → clear localStorage → all cards return to the active state (not greyed-out).

## 6. Component Structure (suggested for the agent)
```
src/
  data/
    quiz-data.json
  hooks/
    useAnsweredCards.ts      # get/set/clear opened question IDs via localStorage
  components/
    BoardPage/
      BoardPage.tsx
      CategoryColumn.tsx
      QuestionCard.tsx        # $value pill button, has active/greyed-out state
      ClearCardsButton.tsx
    QuestionView/
      QuestionView.tsx
      QuestionContent.tsx     # switches rendering between text / image / video
      MediaPlayer.tsx         # custom video player (play/pause/replay) + image display
      AnswerReveal.tsx
      HintToggle.tsx
  App.tsx                     # holds currentView: 'board' | 'question', selectedQuestion
  main.tsx
public/
  media/
    questions/                # images & videos for questions
    answers/                  # images & videos for answers (if any)
```
Note: navigating between board ↔ question does **not** need React Router — local state in `App.tsx` (`currentView`) is enough, to keep things simple. The agent may change this if routing is deemed better, but it's not required.

## 7. Data Structure (JSON Schema)
The `quiz-data.json` file contains a `categories` array. Each category has an `id`, `name`, and a `questions` array containing 6 items ($100–$600, in order).

```ts
type QuestionType = "text" | "image" | "video" | "audio";

interface Question {
  id: string;                  // unique, e.g. "bible-trivia-100"
  value: number;                // 100 | 200 | 300 | 400 | 500 | 600
  question_type: QuestionType;  // question content type
  question: string;             // question text (always present, read aloud by the MC)
  question_media?: string | null; // filename in /public/media/questions/, required if type is image/video/audio
  hint?: string | null;         // optional
  answer: string;               // answer text (always present)
  answer_type?: QuestionType;   // optional, defaults to "text" — the answer can also have its own media
  answer_media?: string | null; // filename in /public/media/answers/, used if answer_type is image/video/audio
}

interface Category {
  id: string;
  name: string;
  questions: Question[];        // length 6, ordered by value 100→600
}

interface QuizData {
  categories: Category[];       // length 5
}
```

## 8. Design Guidance (UI Direction)
Visual theme: **Indonesian Independence (17 Agustus) vibes** — not the purple-gold theme from the attached reference image (that image was only a reference for the Jeopardy board's *layout/structure*, not its color palette).
- **Color palette**: dominated by **red and white** (flag colors), which can be combined with **gold/golden-yellow** accents for a festive/celebratory feel, or **cream/off-white** for text contrast on red. The background can be a gradient from dark red to maroon, or solid red with a subtle diagonal line/batik-pattern accent as decoration.
- **Optional motifs/decoration**: independence-themed decorative elements such as a waving flag silhouette, stars, rice & cotton (Pancasila emblem), or a diagonal red-white line pattern on the background/border — used sparingly, without hurting readability.
- **Category cards**: pill/oval shape with a thin white or gold outline on a red background, bold uppercase text in white/gold.
- **Point value cards ($100–$600)**: large red pill (slightly lighter/darker than the background for depth) with a subtle shadow/glow, large bold white/gold text.
- **Greyed-out state**: reduce card opacity & saturation (dull grey), cursor becomes `not-allowed`, no hover effect.
- **Animations**:
  - Board load: cards appear staggered (fade + scale-in, column/row by column/row).
  - Board ↔ Question transition: smooth scale/fade or slide (Framer Motion `AnimatePresence`).
  - Answer reveal: fade + slide-up, feeling like it's being "unveiled."
- **Screen priority**: designed primarily for wide screens (laptop/projector, e.g. 1920×1080 resolution); a mobile-friendly layout is a nice-to-have but not the main priority.

## 9. Functional Requirements (Checklist for the Agent)
- [ ] Board displays 5 categories × 6 value cards, in the order given in the JSON.
- [ ] Clicking an active card → moves to the Question View with an animation.
- [ ] Question View renders content according to `question_type` (text/image/video/audio).
- [ ] Video player: can play, pause, and replay (restart from the beginning).
- [ ] Hint only appears if the `hint` field has content.
- [ ] The "Reveal Answer" button shows `answer` + `answer_media` (if present) according to `answer_type`.
- [ ] The "Back to Board" button saves the "opened" status to localStorage then returns to the Board.
- [ ] Opened cards are shown greyed-out and can no longer be clicked, including after a page refresh.
- [ ] The "Clear Cards" button empties localStorage and returns all cards to the active state (with confirmation before resetting).
- [ ] All question/answer text/images/videos are pulled from `quiz-data.json` — no content is hardcoded in components.
- [ ] Project structure is ready to deploy to Vercel (build command & output matching Vite defaults).

## 10. Assumptions & Notes for the Agent
- Only one device runs the app (operated by the MC), watched together via a projector — no need for multi-device sync.
- There is no scoring system in this app; scores are recorded manually by the committee/judges.
- The user will fill in & edit `quiz-data.json` and upload media files to `/public/media/` manually — the agent doesn't need to build an upload tool.
- Media filenames in the JSON must exactly match the filenames in the `/public/media/questions/` or `/public/media/answers/` folder.
- If a question has `question_media`/`answer_media` set to empty (`null`) even though `question_type`/`answer_type` isn't `text`, the agent may show a simple fallback (e.g. a "media not provided" placeholder) — no need for complex error handling.
