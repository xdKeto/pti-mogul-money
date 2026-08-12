import { getQuestionMediaPath } from '../../data/quiz-data'
import type { Question } from '../../types/quiz'
import { MediaPlayer } from './MediaPlayer'

interface QuestionContentProps {
  question: Question
}

export function QuestionContent({ question }: QuestionContentProps) {
  const source = question.question_media ? getQuestionMediaPath(question.question_media) : null
  const isLongQuestion = question.question.length > 150

  return (
    <div className="question-content">
      <p className={`question-content__text${isLongQuestion ? ' question-content__text--long' : ''}`}>
        {question.question}
      </p>
      <MediaPlayer type={question.question_type} source={source} alt="Media pertanyaan" />
    </div>
  )
}
