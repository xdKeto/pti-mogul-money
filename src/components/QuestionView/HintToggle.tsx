interface HintToggleProps {
  hint: string
}

export function HintToggle({ hint }: HintToggleProps) {
  return (
    <div className="hint-toggle">
      <p className="hint-toggle__content">
        <span className="hint-toggle__label">deskripsi soal:</span>
        {hint}
      </p>
    </div>
  )
}
