import { AnimatePresence, motion } from 'framer-motion'
import { getAnswerMediaPath } from '../../data/quiz-data'
import type { Question } from '../../types/quiz'
import { MediaPlayer } from './MediaPlayer'

interface AnswerRevealProps {
  question: Question
  isRevealed: boolean
  onReveal: () => void
}

export function AnswerReveal({ question, isRevealed, onReveal }: AnswerRevealProps) {
  const answerType = question.answer_type ?? 'text'
  const source = question.answer_media ? getAnswerMediaPath(question.answer_media) : null
  const isLongAnswer = question.answer.length > 90

  return (
    <section className="answer-reveal" aria-live="polite">
      {isRevealed ? null : (
        <button type="button" className="primary-button" onClick={onReveal}>
          Reveal Answer
        </button>
      )}
      <AnimatePresence>
        {isRevealed ? (
          <motion.div
            className="answer-reveal__panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
          >
            <p className="answer-reveal__label">Jawaban</p>
            <p className={`answer-reveal__text${isLongAnswer ? ' answer-reveal__text--long' : ''}`}>
              {question.answer}
            </p>
            <MediaPlayer type={answerType} source={source} alt="Media jawaban" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
