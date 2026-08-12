interface ClearCardsButtonProps {
  onClear: () => void
}

export function ClearCardsButton({ onClear }: ClearCardsButtonProps) {
  const handleClear = () => {
    if (window.confirm('Reset all card progress?')) onClear()
  }

  return (
    <button type="button" className="clear-cards-button" onClick={handleClear}>
      Clear Cards
    </button>
  )
}
