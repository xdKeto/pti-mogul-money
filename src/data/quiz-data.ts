import rawQuizData from '../../quiz-data.json'
import type { QuizData } from '../types/quiz'

export const quizData = rawQuizData as QuizData

export function getQuestionMediaPath(filename: string): string {
  return `/media/questions/${filename}`
}

export function getAnswerMediaPath(filename: string): string {
  return `/media/answers/${filename}`
}
