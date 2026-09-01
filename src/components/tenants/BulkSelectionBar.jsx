import iconClose from '../../assets/icon-close.svg'

export default function BulkSelectionBar({ count, onSendText, onClear }) {
  return (
    <div className="sticky bottom-0 z-10 bg-[#008dd5] text-white flex items-center justify-between px-4 py-2 rounded shadow-[0_-2px_10px_rgba(76,76,76,0.15)]">
      <p className="text-sm font-semibold">
        {count} {count === 1 ? 'Tenant' : 'Tenants'} Selected
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={onSendText}
          className="border border-white/70 text-white text-sm h-9 px-3 rounded hover:bg-white/10"
        >
          Send Text
        </button>
        <button onClick={onClear} aria-label="Clear selection">
          <img src={iconClose} alt="" className="size-5 brightness-0 invert" />
        </button>
      </div>
    </div>
  )
}
