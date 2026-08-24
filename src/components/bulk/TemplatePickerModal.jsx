import { useState } from 'react'
import { TEMPLATE_DATA, TEMPLATE_FOLDERS } from '../../data/templateFolders.js'
import iconClose from '../../assets/icon-close-2.svg'
import iconChevronRight from '../../assets/icon-chevron-right.svg'
import iconArrowDown from '../../assets/icon-arrow-down.svg'
import iconArrowUp from '../../assets/icon-arrow-up.svg'
import iconFolder from '../../assets/icon-folder.svg'
import iconFolderOpen from '../../assets/icon-folder-open.svg'
import iconSearch from '../../assets/icon-search-2.svg'

const FOLDER_LIST = TEMPLATE_FOLDERS.filter((f) => TEMPLATE_DATA[f.slug])

export default function TemplatePickerModal({ onClose, onPick }) {
  const [dropdownOpen, setDropdownOpen] = useState(true)
  const [openFolder, setOpenFolder] = useState('renewal-retention')
  const [selected, setSelected] = useState(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-[700px]">
        <div className="bg-white border border-[#cedbe7] rounded flex flex-col shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border border-[#cedbe7] rounded-t">
            <h2 className="text-xl text-[#13314c]">Send Text</h2>
            <button onClick={onClose} aria-label="Close">
              <img src={iconClose} alt="" className="size-6" />
            </button>
          </div>

          <div className="border-x border-[#cedbe7] p-4 flex flex-col gap-1">
            <label className="text-sm text-[#666]">Text Template</label>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between text-sm text-[#666]"
            >
              <span className={selected ? 'text-[#13314c]' : ''}>
                {selected === 'new' ? 'New Text' : selected?.name ?? ''}
              </span>
              <img src={dropdownOpen ? iconArrowUp : iconArrowDown} alt="" className="size-5" />
            </button>
          </div>

          <div className="flex items-center justify-end gap-4 px-4 py-2 bg-[#f5f8fa] border border-[#cedbe7] rounded-b">
            <button
              onClick={() => onPick(selected === 'new' ? null : selected)}
              className="h-9 px-3 rounded bg-[#008dd5] text-white text-sm"
            >
              Continue
            </button>
            <button onClick={onClose} className="h-9 px-3 rounded border border-[#008dd5] text-[#008dd5] text-sm">
              Cancel
            </button>
          </div>
        </div>

        {dropdownOpen && (
          <div className="absolute left-4 top-[120px] w-[calc(100%-32px)] bg-white rounded shadow-[0_3px_6px_rgba(0,0,0,0.15)] max-h-[320px] overflow-y-auto z-10">
            <div className="border-b border-[#cedbe7] p-2 sticky top-0 bg-white">
              <div className="relative">
                <img src={iconSearch} alt="" className="size-5 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  placeholder="Search"
                  className="w-full h-8 rounded border border-[#cedbe7] bg-[#f5f8fa] pl-8 pr-2 text-sm outline-none focus:border-[#008dd5]"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setSelected('new')
                setDropdownOpen(false)
              }}
              className="w-full text-left px-2 py-2 text-sm text-[#008dd5] hover:bg-[#f5f8fa] border-b border-[#e5e4e7]"
            >
              &lsaquo; New Text &rsaquo;
            </button>
            {FOLDER_LIST.map((folder) => {
              const isOpen = openFolder === folder.slug
              return (
                <div key={folder.slug}>
                  <button
                    onClick={() => setOpenFolder(isOpen ? null : folder.slug)}
                    className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[#13314c] hover:bg-[#f5f8fa]"
                  >
                    <img src={isOpen ? iconArrowDown : iconChevronRight} alt="" className="size-5" />
                    <img src={isOpen ? iconFolderOpen : iconFolder} alt="" className="size-5" />
                    <span>{folder.label}</span>
                  </button>
                  {isOpen &&
                    TEMPLATE_DATA[folder.slug].rows.map((row) => (
                      <button
                        key={row.name}
                        onClick={() => {
                          setSelected(row)
                          setDropdownOpen(false)
                        }}
                        className="w-full text-left pl-16 pr-2 py-2 text-sm text-[#13314c] hover:bg-[#f5f8fa]"
                      >
                        {row.name}
                      </button>
                    ))}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
