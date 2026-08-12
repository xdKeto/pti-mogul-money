import { useState } from 'react'
import type { Category, Question } from '../../types/quiz'
import { AnswerReveal } from './AnswerReveal'
import { HintToggle } from './HintToggle'
import { QuestionContent } from './QuestionContent'

interface QuestionViewProps {
  category: Category
  question: Question
  onBack: () => void
}

export function QuestionView({ category, question, onBack }: QuestionViewProps) {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)

  return (
    <main className="question-page">
      <header className="question-page__header">
        <div>
          <p className="eyebrow">{category.name}</p>
          <p className="question-page__value">{question.value} POIN</p>
        </div>
        <button type="button" className="back-button" onClick={onBack}>
          Back to Board
        </button>
      </header>

      <section className="question-page__stage">
        <QuestionContent question={question} />
        {question.hint ? <HintToggle hint={question.hint} /> : null}
        <AnswerReveal
          question={question}
          isRevealed={isAnswerRevealed}
          onReveal={() => setIsAnswerRevealed(true)}
        />
      </section>
    </main>
  )
}
