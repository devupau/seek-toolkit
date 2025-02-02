export type ToggleButtonProps = {
  isHidden: boolean
  handler: () => void
}

export default function ToggleButton({ isHidden, handler }: ToggleButtonProps) {
  return (
    <button
      className={`toggle-btn ${isHidden ? "toggle-btn--hidden" : ""}`}
      onClick={() => {
        handler()
      }}>
      {isHidden ? "Show" : "Hide"}
    </button>
  )
}
