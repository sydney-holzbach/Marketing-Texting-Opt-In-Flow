import { useState } from 'react'
import iconClose from '../../assets/icon-close.svg'
import chevronDown from '../../assets/chevron-down.svg'

export default function SelectTemplateTypeModal({ onClose, onConfirm }) {
  const [type, setType] = useState('Tenant')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[544px] shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e4e7]">
          <h2 className="text-xl text-[#13314c]">Select Template Type</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={iconClose} alt="" className="size-6" />
          </button>
        </div>
        <div className="px-5 py-5 flex flex-col gap-1">
          <label className="text-sm text-[#616466]">Type</label>
          <div className="h-11 rounded border-2 border-[#1a64bc] px-3 flex items-center justify-between text-[#13314c]">
            <span>{type}</span>
            <img src={chevronDown} alt="" className="size-5" />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-5 py-3 bg-[#f5f8fa] border-t border-[#e5e4e7]">
          <button onClick={() => onConfirm(type)} className="h-10 px-5 rounded bg-[#008dd5] text-white text-sm font-medium">
            OK
          </button>
          <button onClick={onClose} className="h-10 px-5 rounded border border-[#008dd5] text-[#008dd5] text-sm font-medium">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
