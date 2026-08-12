import { useCallback, useState } from 'react'

const STORAGE_KEY = 'pti-jeopardy-opened-cards-v1'

interface StoredProgress {
  version: 1
  openedIds: string[]
}

function readOpenedCards(): Set<string> {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return new Set()

    const parsed = JSON.parse(stored) as Partial<StoredProgress>
    if (parsed.version !== 1 || !Array.isArray(parsed.openedIds)) return new Set()

    return new Set(parsed.openedIds.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

function persistOpenedCards(openedCards: Set<string>): void {
  const payload: StoredProgress = {
    version: 1,
    openedIds: [...openedCards],
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function useAnsweredCards() {
  const [openedCards, setOpenedCards] = useState<Set<string>>(readOpenedCards)

  const markAsOpened = useCallback((questionId: string) => {
    setOpenedCards((currentCards) => {
      if (currentCards.has(questionId)) return currentCards

      const nextCards = new Set(currentCards)
      nextCards.add(questionId)
      persistOpenedCards(nextCards)
      return nextCards
    })
  }, [])

  const clearOpenedCards = useCallback(() => {
    setOpenedCards(() => {
      window.localStorage.removeItem(STORAGE_KEY)
      return new Set()
    })
  }, [])

  return {
    openedCards,
    markAsOpened,
    clearOpenedCards,
  }
}
