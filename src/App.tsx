import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BoardPage } from './components/BoardPage/BoardPage'
import { QuestionView } from './components/QuestionView/QuestionView'
import { quizData } from './data/quiz-data'
import { useAnsweredCards } from './hooks/useAnsweredCards'
import type { Category, Question } from './types/quiz'
import './App.css'

interface SelectedQuestion {
  category: Category
  question: Question
}

function App() {
  const [selectedQuestion, setSelectedQuestion] = useState<SelectedQuestion | null>(null)
  const { openedCards, markAsOpened, clearOpenedCards } = useAnsweredCards()

  const handleSelectQuestion = (category: Category, question: Question) => {
    setSelectedQuestion({ category, question })
  }

  const handleBackToBoard = () => {
    if (selectedQuestion) markAsOpened(selectedQuestion.question.id)
    setSelectedQuestion(null)
  }

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {selectedQuestion ? (
          <motion.div
            key={selectedQuestion.question.id}
            className="view-frame"
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.01, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <QuestionView
              category={selectedQuestion.category}
              question={selectedQuestion.question}
              onBack={handleBackToBoard}
            />
          </motion.div>
        ) : (
          <motion.div
            key="board"
            className="view-frame"
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.01, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <BoardPage
              categories={quizData.categories}
              openedCards={openedCards}
              onSelectQuestion={handleSelectQuestion}
              onClearCards={clearOpenedCards}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
