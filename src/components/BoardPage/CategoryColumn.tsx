import type { Category, Question } from '../../types/quiz'
import { QuestionCard } from './QuestionCard'

interface CategoryColumnProps {
  category: Category
  openedCards: Set<string>
  onSelectQuestion: (category: Category, question: Question) => void
  categoryIndex: number
}

export function CategoryColumn({
  category,
  openedCards,
  onSelectQuestion,
  categoryIndex,
}: CategoryColumnProps) {
  return (
    <section className="category-column" aria-labelledby={`category-${category.id}`}>
      <h2 id={`category-${category.id}`} className="category-column__title">
        {category.name}
      </h2>
      <div className="category-column__questions">
        {category.questions.map((question, questionIndex) => (
          <QuestionCard
            key={question.id}
            question={question}
            isOpened={openedCards.has(question.id)}
            onSelect={(selectedQuestion) => onSelectQuestion(category, selectedQuestion)}
            index={categoryIndex * category.questions.length + questionIndex}
          />
        ))}
      </div>
    </section>
  )
}
