import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import rentManagerLogo from '../../assets/rentmanager-logo.svg'
import iconSearch from '../../assets/icon-search.svg'
import iconNotifications from '../../assets/icon-notifications.svg'
import iconMenu from '../../assets/icon-menu.svg'
import iconReports from '../../assets/icon-reports.svg'
import iconGrade from '../../assets/icon-grade.svg'
import { COMMAND_INDEX } from '../../data/commandIndex.js'

export default function AppHeader() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const matches = query.trim()
    ? COMMAND_INDEX.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))
    : []

  function go(to) {
    navigate(to)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className="bg-[#13314c] flex h-12 items-center px-4 py-2 w-full shrink-0 relative">
      <div className="flex flex-1 items-center gap-4">
        <Link to="/">
          <img src={rentManagerLogo} alt="Rent Manager" className="h-8 w-[175px] object-contain" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 relative">
        <div className="flex items-center shrink-0">
          <div className="bg-[#425a70] flex items-center justify-center h-8 w-10 rounded-l">
            <img src={iconMenu} alt="" className="size-5 opacity-90" />
          </div>
          <div className="bg-[#425a70] flex items-center justify-center h-8 w-10 border-l border-[#13314c]">
            <img src={iconReports} alt="" className="size-5 opacity-90" />
          </div>
          <div className="bg-[#425a70] flex items-center justify-center h-8 w-10 rounded-r border-l border-[#13314c]">
            <img src={iconGrade} alt="" className="size-5 opacity-90" />
          </div>
        </div>
        <div className="relative shrink-0">
          <div className="bg-[#425a70] flex gap-2 h-8 items-center px-2 rounded w-[454px] border border-transparent focus-within:border-[#4a90d9]">
            <img src={iconSearch} alt="" className="size-5" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && matches.length > 0) go(matches[0].to)
                if (e.key === 'Escape') setOpen(false)
              }}
              placeholder="Command Launch"
              className="flex-1 bg-transparent text-white text-xs placeholder:text-white/70 placeholder:italic outline-none"
            />
          </div>

          {open && query.trim() && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute top-full mt-1 w-[454px] bg-white rounded shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-50 p-3">
                {matches.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-[#13314c] mb-1">Menu Items</p>
                    <div className="h-px bg-[#cedbe7] mb-1" />
                    <div className="flex flex-col gap-0.5">
                      {matches.map((item, i) => (
                        <button
                          key={item.to + item.label}
                          onClick={() => go(item.to)}
                          className={`text-left px-3 py-2 rounded text-sm ${
                            i === 0 ? 'bg-[#4a90d9] text-white font-medium' : 'text-[#13314c] hover:bg-[#f5f8fa]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div className="h-px bg-[#e5e4e7] my-2" />
                  </>
                )}
                <p className="text-sm text-[#8a8f98]">Didn't find what you are looking for?</p>
                <button className="flex items-center gap-2 text-sm text-[#008dd5] mt-1">
                  <span>&#128269;</span>
                  Global Search for <span className="italic">{query}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-8">
        <div className="flex flex-col items-start text-white">
          <span className="text-xs">Company Code</span>
          <span className="text-sm">lcs-rmexpress</span>
        </div>
        <div className="flex items-center gap-5">
          <img src={iconNotifications} alt="" className="size-5" />
          <div className="bg-[#008dd5] flex items-center justify-center rounded-full size-8 text-white text-sm">
            MG
          </div>
        </div>
      </div>
    </div>
  )
}
