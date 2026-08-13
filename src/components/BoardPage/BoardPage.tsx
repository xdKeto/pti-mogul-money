import type { Category, Question } from '../../types/quiz'
import { ClearCardsButton } from './ClearCardsButton'
import { CategoryColumn } from './CategoryColumn'

interface BoardPageProps {
  categories: Category[]
  openedCards: Set<string>
  onSelectQuestion: (category: Category, question: Question) => void
  onClearCards: () => void
}

export function BoardPage({
  categories,
  openedCards,
  onSelectQuestion,
  onClearCards,
}: BoardPageProps) {
  return (
    <main className="board-page">
      <header className="board-page__header">
        <div className="board-page__branding">
          <img className="board-page__society-logo" src="/media/society_logo.png" alt="" />
          <div>
          <p className="eyebrow">Final Game</p>
          <h1 className='font-light'>Jeopardy</h1>
          </div>
        </div>
        <ClearCardsButton onClear={onClearCards} />
      </header>

      <div className="board-page__flag" aria-hidden="true">
        <span />
        <span />
      </div>

      <section className="board-grid" aria-label="Papan pertanyaan">
        {categories.map((category, categoryIndex) => (
          <CategoryColumn
            key={category.id}
            category={category}
            openedCards={openedCards}
            onSelectQuestion={onSelectQuestion}
            categoryIndex={categoryIndex}
          />
        ))}
      </section>
    </main>
  )
}
