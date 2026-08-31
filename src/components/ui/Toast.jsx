import { useEffect } from 'react'

function CheckCircleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 14.5L6 12l1.41-1.41 3.09 3.08 6.09-6.09L18 9z" />
    </svg>
  )
}

function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.7l-1.41-1.42L9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.3-6.3z" />
    </svg>
  )
}

export default function Toast({ message, onDismiss, duration = 4000 }) {
  useEffect(() => {
    if (!onDismiss) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex justify-center px-4">
      <div className="bg-[#4c9a2a] text-white rounded shadow-lg flex items-center gap-3 pl-4 pr-3 py-3 max-w-[480px]">
        <CheckCircleIcon className="size-5 shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button onClick={onDismiss} aria-label="Dismiss">
          <CloseIcon className="size-4 opacity-90 hover:opacity-100" />
        </button>
      </div>
    </div>
  )
}
