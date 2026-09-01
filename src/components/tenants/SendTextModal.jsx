import { useState } from 'react'
import iconClose from '../../assets/icon-close.svg'
import { TEMPLATE_DATA } from '../../data/templateFolders.js'

function ChevronIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  )
}

function FolderIcon({ className, open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 6a1 1 0 011-1h4.17l2 2H19a1 1 0 011 1v1H4V6zm0 5h17l-1.8 8.2a1 1 0 01-1 .8H6.8a1 1 0 01-1-.8L4 11z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 6a1 1 0 011-1h4.17l2 2H19a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V6z" />
    </svg>
  )
}

const FOLDER_SLUGS = ['renewal-retention', 'maintenance-repairs']

export default function SendTextModal({ onClose, onContinue }) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [expandedFolders, setExpandedFolders] = useState({
    'renewal-retention': false,
    'maintenance-repairs': true,
  })
  const [selectedTemplate, setSelectedTemplate] = useState('')

  function toggleFolder(slug) {
    setExpandedFolders((f) => ({ ...f, [slug]: !f[slug] }))
  }

  function pick(name) {
    setSelectedTemplate(name)
    setPickerOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[697px] shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#cedbe7] shrink-0">
          <h2 className="text-xl text-[#13314c]">Send Text</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={iconClose} alt="" className="size-6" />
          </button>
        </div>

        <div className="px-4 py-4 flex flex-col gap-1 relative">
          <label className="text-sm text-[#666]">Text Template</label>
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between text-sm text-[#13314c]"
          >
            <span className={selectedTemplate ? '' : 'text-[#999]'}>{selectedTemplate || 'Select a template'}</span>
            <ChevronIcon className={`size-5 text-[#616466] shrink-0 transition-transform ${pickerOpen ? 'rotate-180' : ''}`} />
          </button>

          {pickerOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setPickerOpen(false)} />
              <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-[#cedbe7] rounded shadow-lg z-20 max-h-[360px] overflow-y-auto">
                <div className="p-2 border-b border-[#cedbe7]">
                  <input
                    placeholder="Search"
                    className="w-full h-8 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c] outline-none"
                  />
                </div>
                <button
                  onClick={() => pick('< New Text >')}
                  className="w-full text-left px-3 py-2 text-sm text-[#13314c] hover:bg-[#f5f8fa]"
                >
                  &lt; New Text &gt;
                </button>
                {FOLDER_SLUGS.map((slug) => {
                  const folder = TEMPLATE_DATA[slug]
                  const open = expandedFolders[slug]
                  return (
                    <div key={slug}>
                      <button
                        onClick={() => toggleFolder(slug)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#13314c] hover:bg-[#f5f8fa]"
                      >
                        <ChevronIcon className={`size-4 shrink-0 transition-transform ${open ? '' : '-rotate-90'}`} />
                        <FolderIcon open={open} className="size-4 shrink-0 text-[#616466]" />
                        {folder.label}
                      </button>
                      {open &&
                        folder.rows.map((row) => (
                          <button
                            key={row.name}
                            onClick={() => pick(row.name)}
                            className="w-full text-left pl-14 pr-3 py-2 text-sm text-[#13314c] hover:bg-[#f5f8fa] truncate"
                          >
                            {row.name}
                          </button>
                        ))}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 bg-[#f5f8fa] border-t border-[#cedbe7] rounded-b mt-auto">
          <button
            onClick={() => onContinue?.(selectedTemplate)}
            className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded hover:bg-[#0077b6]"
          >
            Continue
          </button>
          <button onClick={onClose} className="h-9 px-3 rounded border border-[#008dd5] text-[#008dd5] text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
