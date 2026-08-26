import { useState } from 'react'
import iconClose from '../../assets/icon-close-2.svg'
import iconWarningFilled from '../../assets/icon-warning-filled.svg'

export default function OverrideOptedOutDialog({ optedOutCount, onClose, onContinue }) {
  const [mode, setMode] = useState('opted-in-only')
  const [confirmed, setConfirmed] = useState(false)

  const canContinue = mode === 'opted-in-only' || confirmed

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[500px] shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#cedbe7] rounded-t">
          <h2 className="text-xl text-[#13314c]">Override Opted Out Phone Numbers</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={iconClose} alt="" className="size-6" />
          </button>
        </div>
        <div className="px-4 pt-6 pb-4 flex gap-4">
          <img src={iconWarningFilled} alt="" className="size-12 shrink-0" />
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#13314c]">
              {optedOutCount} phone number{optedOutCount > 1 ? 's are' : ' is'} opted out of all categories. Opted
              out phone numbers should not be contacted for promotional or marketing purposes.
            </p>
            <p className="text-sm text-[#13314c] font-medium">
              Would you like to text only opted in numbers or text everyone?
            </p>
            <label className="flex items-center gap-2 text-sm text-[#13314c]">
              <input
                type="radio"
                name="override-mode"
                checked={mode === 'opted-in-only'}
                onChange={() => setMode('opted-in-only')}
              />
              Send to opted in numbers only
            </label>
            <label className="flex items-center gap-2 text-sm text-[#13314c]">
              <input
                type="radio"
                name="override-mode"
                checked={mode === 'all'}
                onChange={() => setMode('all')}
              />
              Send to all recipients
            </label>
            <label
              className={`flex items-start gap-2 text-sm ${mode === 'all' ? 'text-[#13314c]' : 'text-[#b3b3b3]'}`}
            >
              <input
                type="checkbox"
                disabled={mode !== 'all'}
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5"
              />
              I confirm that this message is necessary and non-promotional.
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 bg-[#f5f8fa] border border-[#cedbe7] rounded-b">
          <span className="text-sm text-[#008dd5] cursor-pointer hover:underline">View Opted Out Numbers</span>
          <div className="flex gap-4">
            <button
              disabled={!canContinue}
              onClick={() => onContinue(mode)}
              className="h-9 px-4 rounded bg-[#008dd5] text-white text-sm disabled:bg-[#008dd5]/50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
            <button onClick={onClose} className="h-9 px-4 rounded border border-[#008dd5] text-[#008dd5] text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
