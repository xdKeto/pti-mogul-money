import { motion } from 'framer-motion'
import type { Question } from '../../types/quiz'

interface QuestionCardProps {
  question: Question
  isOpened: boolean
  onSelect: (question: Question) => void
  index: number
}

export function QuestionCard({ question, isOpened, onSelect, index }: QuestionCardProps) {
  return (
    <motion.button
      type="button"
      className={`question-card${isOpened ? ' question-card--opened' : ''}`}
      disabled={isOpened}
      onClick={() => onSelect(question)}
      initial={{ opacity: 0, scale: 0.88, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.045, duration: 0.32, ease: 'easeOut' }}
      whileHover={isOpened ? undefined : { y: -3, scale: 1.02 }}
      whileTap={isOpened ? undefined : { scale: 0.98 }}
      aria-label={`${question.value} poin`}
    >
      <span>${question.value}</span>
    </motion.button>
  )
}
