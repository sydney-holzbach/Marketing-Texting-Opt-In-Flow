import { useState } from 'react'
import iconClose from '../../assets/icon-close-2.svg'
import iconArrowDropDown from '../../assets/icon-arrow-drop-down-white.svg'

function personalize(message, recipient) {
  const firstName = recipient.name.split(' ')[0]
  return message.replaceAll('[Tenant.FirstName()]', firstName)
}

export default function BulkTextPreviewModal({ recipients, message, onBack, onCancel, onSendAll }) {
  const [selectedId, setSelectedId] = useState(recipients[0]?.id ?? null)
  const selected = recipients.find((r) => r.id === selectedId) ?? recipients[0]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[1100px] max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#cedbe7] shrink-0">
          <h2 className="text-base font-semibold text-[#666]">Bulk Text</h2>
          <button onClick={onCancel} aria-label="Close">
            <img src={iconClose} alt="" className="size-6" />
          </button>
        </div>

        <div className="flex flex-1 min-h-0">
          <div className="w-[264px] shrink-0 border-r border-[#cedbe7] flex flex-col overflow-hidden">
            <div className="border-b border-[#cedbe7] px-2 py-3">
              <h3 className="text-[18px] font-medium text-[#13314c]">Recipients</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {recipients.map((r) => {
                const isSelected = r.id === selected?.id
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`w-full text-left flex items-center justify-between pr-2 py-2 border-l-4 ${
                      isSelected ? 'bg-[#e8f6fa] border-[#008dd5] pl-2' : 'border-transparent pl-3'
                    }`}
                  >
                    <span className="text-sm text-[#13314c] truncate">{r.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-4 px-6 py-4 overflow-y-auto">
            {selected && (
              <>
                <div className="flex items-center gap-1 text-sm text-[#13314c] flex-wrap">
                  <span className="font-semibold">To:</span>
                  <span>{selected.name}</span>
                  <span>{`< ${selected.phone} >`}</span>
                </div>
                <div className="h-px w-full bg-[#cedbe7]" />
                <div className="bg-[#f5f8fa] border border-[#cedbe7] rounded px-3 py-2">
                  <p className="text-sm text-[#666] whitespace-pre-wrap">{personalize(message, selected)}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 px-4 py-2 bg-[#f5f8fa] border-t border-[#cedbe7] shrink-0">
          <button onClick={onBack} className="h-9 px-4 rounded border border-[#008dd5] text-[#008dd5] text-sm mr-auto">
            Back
          </button>
          <div className="flex items-center h-9 rounded overflow-hidden">
            <button onClick={onSendAll} className="h-full px-3 bg-[#008dd5] text-white text-sm">
              Send All
            </button>
            <button
              onClick={onSendAll}
              aria-label="Send options"
              className="h-full px-1.5 bg-[#008dd5] border-l border-white flex items-center justify-center"
            >
              <img src={iconArrowDropDown} alt="" className="size-5" />
            </button>
          </div>
          <button onClick={onCancel} className="h-9 px-4 rounded border border-[#008dd5] text-[#008dd5] text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
