export type QuestionType = 'text' | 'image' | 'video' | 'audio'

export interface Question {
  id: string
  value: number
  question_type: QuestionType
  question: string
  question_media?: string | null
  hint?: string | null
  answer: string
  answer_type?: QuestionType
  answer_media?: string | null
}

export interface Category {
  id: string
  name: string
  questions: Question[]
}

export interface QuizData {
  categories: Category[]
}
