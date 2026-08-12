import { useEffect } from 'react'
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

  useEffect(() => {
    if (!isRevealed) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onReveal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isRevealed, onReveal])

  return (
    <section className="answer-reveal" aria-live="polite">
      <button type="button" className="primary-button" onClick={onReveal}>
        {isRevealed ? 'Show Answer' : 'Reveal Answer'}
      </button>
      <AnimatePresence>
        {isRevealed ? (
          <motion.div
            className="answer-reveal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onReveal}
          >
            <motion.div
              className="answer-reveal__modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="answer-reveal-title"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="answer-reveal__modal-header">
                <p id="answer-reveal-title" className="answer-reveal__label">
                  Jawaban
                </p>
                <button type="button" className="answer-reveal__close" onClick={onReveal}>
                  Close
                </button>
              </div>
              <div className="answer-reveal__modal-content">
                <p className={`answer-reveal__text${isLongAnswer ? ' answer-reveal__text--long' : ''}`}>
                  {question.answer}
                </p>
                <MediaPlayer type={answerType} source={source} alt="Media jawaban" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
