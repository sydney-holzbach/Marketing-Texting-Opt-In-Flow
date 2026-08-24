import { useState } from 'react'
import iconHelp from '../../assets/icon-help.svg'
import iconClose from '../../assets/icon-close.svg'
import chevronDown from '../../assets/chevron-down.svg'

export default function TemplateDetailsModal({ template, folderLabel, onClose, onSave, title = 'Text Template Details' }) {
  const [name, setName] = useState(template.name)
  const [messageText, setMessageText] = useState(template.messageText ?? template.description ?? '')
  const [promotional, setPromotional] = useState(!!template.promotional)

  const allUsers = template.users?.primary === 'All Selected'
  const selectedCount = allUsers ? null : template.users ? 1 + (template.users.extra ?? 0) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[577px] max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#cedbe7] shrink-0">
          <h2 className="text-xl text-[#13314c]">{title}</h2>
          <div className="flex items-center gap-2">
            <img src={iconHelp} alt="" className="size-6" />
            <button onClick={onClose} aria-label="Close">
              <img src={iconClose} alt="" className="size-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-4 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#666]">General</p>
            <div className="border border-[#cedbe7] rounded p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#666]">Template Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#666]">Folder</label>
                <div className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between text-sm text-[#13314c]">
                  <span>{folderLabel}</span>
                  <img src={chevronDown} alt="" className="size-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#666]">Message Text</p>
              <button className="text-sm text-[#008dd5]">Open Script Builder</button>
            </div>
            <div className="border border-[#cedbe7] rounded p-4 flex flex-col gap-2">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                className="w-full rounded border border-[#cedbe7] bg-[#f5f8fa] p-3 text-sm text-[#13314c] outline-none focus:border-[#008dd5]"
              />
              <label className="flex items-center gap-2 text-sm text-[#666]">
                <input type="checkbox" checked={promotional} onChange={(e) => setPromotional(e.target.checked)} />
                Includes promotional material
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#666]">Users</p>
              <div className="border border-[#cedbe7] rounded p-4 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-[#666]">
                  <input type="checkbox" checked={allUsers} readOnly />
                  All Users
                </label>
                {!allUsers && (
                  <div className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between text-sm text-[#13314c]">
                    <span>{selectedCount} Selected</span>
                    <img src={chevronDown} alt="" className="size-5" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#666]">History / Note Category</p>
              <div className="border border-[#cedbe7] rounded p-4">
                <div className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between text-sm text-[#13314c]">
                  <span>{template.category ?? 'General'}</span>
                  <img src={chevronDown} alt="" className="size-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#666]">Description</p>
            <div className="border border-[#cedbe7] rounded p-4">
              <p className="text-sm text-[#13314c] bg-[#f5f8fa] rounded p-3">{template.description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 bg-[#f5f8fa] border-t border-[#cedbe7] shrink-0">
          <button
            onClick={() => {
              onSave?.({ ...template, name, messageText, promotional })
              onClose()
            }}
            className="h-9 px-4 rounded bg-[#008dd5] text-white text-sm"
          >
            Save
          </button>
          <button onClick={onClose} className="h-9 px-4 rounded border border-[#008dd5] text-[#008dd5] text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
