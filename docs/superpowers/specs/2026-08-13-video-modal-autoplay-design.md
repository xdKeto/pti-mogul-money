# Video Modal Autoplay

## Goal

When an answer modal opens, its video should start automatically. Videos should be centered and use native browser controls only.

## Design

`MediaPlayer` accepts an optional `autoPlay` prop, defaulting to `false` so existing question videos keep their current behavior. Video elements always render with native `controls`; the custom Play/Pause and Replay controls are removed. The video wrapper centers the player through its existing layout styles.

`AnswerReveal` passes `autoPlay` only when the answer media type is `video`. This scopes autoplay to videos rendered inside the answer modal and leaves images, audio, and question media unchanged.

## Verification

Run the TypeScript build, ESLint, and the production Vite build. Confirm that the player has native controls, no custom control buttons, centered layout, and the answer video receives autoplay when the modal is revealed.
