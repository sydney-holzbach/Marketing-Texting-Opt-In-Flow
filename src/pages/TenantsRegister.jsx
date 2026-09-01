import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/shell/AppHeader.jsx'
import Checkbox from '../components/ui/Checkbox.jsx'
import BulkActionsMenu from '../components/tenants/BulkActionsMenu.jsx'
import SendTextModal from '../components/tenants/SendTextModal.jsx'
import BulkSelectionBar from '../components/tenants/BulkSelectionBar.jsx'
import BulkTextModal from '../components/tenants/BulkTextModal.jsx'
import Toast from '../components/ui/Toast.jsx'
import iconPrint from '../assets/icon-print.svg'
import iconAutorenew from '../assets/icon-autorenew.svg'
import iconHelp from '../assets/icon-help.svg'
import iconSearch from '../assets/icon-search.svg'
import chevronDown from '../assets/chevron-down.svg'

function PlusIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
    </svg>
  )
}

function SlidersIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 6h10v2H4V6zm13 0h3v2h-3V6zM4 16h3v2H4v-2zm6 0h10v2H10v-2zM14 4a2 2 0 110 4 2 2 0 010-4zM7 14a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  )
}

function ColumnsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="3" y="5" width="5" height="14" />
      <rect x="9.5" y="5" width="5" height="14" />
      <rect x="16" y="5" width="5" height="14" />
    </svg>
  )
}

function KebabIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  )
}

function ChatBubbleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v11a1 1 0 01-1 1H9l-4 4V5z" />
    </svg>
  )
}

function ChatBubbleOffIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v11a1 1 0 01-1 1H9l-4 4V5z" />
      <path d="M3 3l18 18" />
    </svg>
  )
}

const TENANT_ROWS = [
  { name: 'Charlie Apegian', bar: '#f58220', unit: '18', phone: '(847) 123-4567', texting: false, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', to: '/tenants/charlie-apegian' },
  { name: 'Kiley Donahue', unit: '5', phone: '(167) 345-6789', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Jaxon Frami', unit: '28', phone: '(415) 947-0123', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Solon Crona', unit: '4', phone: '(513) 987-6543', texting: false, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Lacey Bartell', unit: '14', phone: '(513) 592-7259', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Arlo Swift', notice: true, unit: '1', phone: '(283) 456-7890', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Kenton Emard', unit: '8', phone: '(513) 567-8901', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Eli Beer', bar: '#d64545', unit: '12', phone: '(283) 789-0123', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Shea Trantow', unit: '24', phone: '(847) 555-0198', texting: false, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Doug Pfeffer', unit: '6', phone: '(619) 234-7890', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Tod Corkery', unit: '11', phone: '(194) 295-1895', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current' },
  { name: 'Kobe Bayer', unit: '10', phone: '(212) 555-0134', texting: true, leaseStart: '01/01/2026', leaseEnd: '12/31/2025', status: 'Current' },
  { name: 'Jayson Ankunding', unit: '3', phone: '(415) 678-9012', texting: true, leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past' },
  { name: 'Gussie Jast', bar: '#008dd5', unit: '9', phone: '(415) 947-0123', texting: true, leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past' },
  { name: 'Crystel Crist', bar: '#4c9a2a', unit: '15', phone: '(513) 234-5678', texting: false, leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past' },
  { name: 'Eusebio Crona', unit: '7', phone: '(312) 047-0147', texting: true, leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past' },
  { name: 'Elmer Emmerich', unit: '13', phone: '(415) 947-0123', texting: true, leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past' },
  { name: 'Jalon Franecki', unit: '17', phone: '(213) 738-0189', texting: true, leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past' },
  { name: 'Coty Quitzon', unit: '2', phone: '', texting: false, leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past' },
]

export default function TenantsRegister() {
  const navigate = useNavigate()
  const [bulkActionsOpen, setBulkActionsOpen] = useState(false)
  const [sendTextOpen, setSendTextOpen] = useState(false)
  const [bulkSelectMode, setBulkSelectMode] = useState(false)
  const [selectedNames, setSelectedNames] = useState([])
  const [pendingTemplate, setPendingTemplate] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [sentCount, setSentCount] = useState(0)
  const [bulkTextOpen, setBulkTextOpen] = useState(false)

  function handleContinue(template) {
    setPendingTemplate(template)
    setSendTextOpen(false)
    setBulkSelectMode(true)
  }

  function toggleRow(name) {
    setSelectedNames((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))
  }

  function toggleAll() {
    setSelectedNames((prev) => (prev.length === TENANT_ROWS.length ? [] : TENANT_ROWS.map((r) => r.name)))
  }

  function handleBulkTextNext(count) {
    setSentCount(count)
    setToastVisible(true)
    setSelectedNames([])
    setBulkTextOpen(false)
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <div className="bg-[#008dd5] flex h-10 items-center justify-between px-4 w-full shrink-0">
        <span className="text-white text-lg">Tenants</span>
        <div className="flex items-center gap-4">
          <img src={iconPrint} alt="" className="size-5" />
          <img src={iconAutorenew} alt="" className="size-5 opacity-90" />
          <img src={iconHelp} alt="" className="size-5" />
        </div>
      </div>

      <div className="flex-1 min-w-0 overflow-y-auto bg-[#f2f2f2] p-4 flex flex-col gap-3">
        <div className="flex items-end gap-3 flex-wrap">
          <div className="relative shrink-0">
            <button
              onClick={() => setBulkActionsOpen((v) => !v)}
              className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded flex items-center gap-1"
            >
              Bulk Actions <span className="text-xs">&#9662;</span>
            </button>
            {bulkActionsOpen && (
              <BulkActionsMenu
                onClose={() => setBulkActionsOpen(false)}
                onSendText={() => setSendTextOpen(true)}
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-[#616466]">Search</span>
            <div className="h-9 w-[248px] border border-[#cedbe7] rounded bg-white flex items-center gap-2 px-2">
              <img src={iconSearch} alt="" className="size-4 opacity-60" />
              <input placeholder="Find a tenant" className="flex-1 text-sm text-[#13314c] outline-none" />
              <img src={chevronDown} alt="" className="size-4" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-[#616466]">Saved Filters</span>
            <div className="flex items-center gap-1">
              <div className="h-9 w-[220px] border border-[#cedbe7] rounded bg-white flex items-center justify-between px-2 text-sm text-[#13314c]">
                <span>*Temp Filter</span>
                <img src={chevronDown} alt="" className="size-4" />
              </div>
              <button className="h-9 w-9 border border-[#cedbe7] rounded bg-white flex items-center justify-center shrink-0">
                <SlidersIcon className="size-4 text-[#616466]" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-[#616466]">Status</span>
            <div className="h-9 w-[248px] border border-[#cedbe7] rounded bg-white flex items-center justify-between px-2 text-sm text-[#13314c]">
              <span>All selected</span>
              <img src={chevronDown} alt="" className="size-4" />
            </div>
          </div>

          <Checkbox checked={false} onChange={() => {}} label="Exclude Subaccounts" className="pb-2.5" />

          <div className="flex-1" />

          <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded flex items-center gap-1 shrink-0">
            <PlusIcon className="size-4" /> Add Tenant
          </button>
          <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded flex items-center gap-1 shrink-0">
            <PlusIcon className="size-4" /> Add Guest
          </button>
        </div>

        <div className="bg-white border border-[#cedbe7] rounded overflow-hidden w-full">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="bg-[#737373] text-white text-left font-medium text-xs tracking-[1.134px]">
                {bulkSelectMode && (
                  <th className="w-[3%] px-3 py-2 rounded-tl-sm">
                    <input
                      type="checkbox"
                      checked={selectedNames.length === TENANT_ROWS.length}
                      ref={(el) => {
                        if (el) el.indeterminate = selectedNames.length > 0 && selectedNames.length < TENANT_ROWS.length
                      }}
                      onChange={toggleAll}
                      className="size-4 accent-[#1a64bc]"
                    />
                  </th>
                )}
                <th className={`w-[1.5%] px-0 py-2 ${bulkSelectMode ? '' : 'rounded-tl-sm'}`} />
                <th className="w-[16%] px-3 py-2">Name</th>
                <th className="w-[16%] px-3 py-2">Property</th>
                <th className="w-[7%] px-3 py-2">Unit</th>
                <th className="w-[16%] px-3 py-2">Phone Number</th>
                <th className="w-[12%] px-3 py-2">Lease Start</th>
                <th className="w-[12%] px-3 py-2">Lease End</th>
                <th className="w-[10%] px-3 py-2">Status</th>
                <th className="w-[4%] px-2 py-2" />
                <th className="w-[4%] px-2 py-2 rounded-tr-sm">
                  <ColumnsIcon className="size-3.5 fill-white" />
                </th>
              </tr>
            </thead>
            <tbody>
              {TENANT_ROWS.map((row) => {
                const clickable = !!row.to
                return (
                  <tr
                    key={row.name}
                    onClick={() => clickable && navigate(row.to)}
                    className={`border-t border-[#e5e4e7] ${clickable ? 'cursor-pointer hover:bg-[#f5f8fa]' : ''}`}
                  >
                    {bulkSelectMode && (
                      <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedNames.includes(row.name)}
                          onChange={() => toggleRow(row.name)}
                          className="size-4 accent-[#1a64bc]"
                        />
                      </td>
                    )}
                    <td className="p-0">
                      {row.bar && <span className="block h-9 w-1.5" style={{ backgroundColor: row.bar }} />}
                    </td>
                    <td className="px-3 py-2 text-[#13314c] font-medium">
                      <span className="flex items-center gap-2">
                        {row.name}
                        {row.notice && (
                          <span className="bg-[#d64545] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded leading-none">
                            Notice
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#13314c] truncate">Riverview Apartments</td>
                    <td className="px-3 py-2 text-[#13314c]">{row.unit}</td>
                    <td className="px-3 py-2 text-[#13314c]">
                      <span className="flex items-center gap-1.5">
                        {row.phone && row.texting && <ChatBubbleIcon className="size-4 text-[#008dd5] shrink-0" />}
                        {row.phone && !row.texting && bulkSelectMode && (
                          <ChatBubbleOffIcon className="size-4 text-[#d64545] shrink-0" />
                        )}
                        {row.phone}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#13314c]">{row.leaseStart}</td>
                    <td className="px-3 py-2 text-[#13314c]">{row.leaseEnd}</td>
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-1.5 text-[#13314c] italic">
                        <span
                          className={`size-2 rounded-full shrink-0 ${
                            row.status === 'Current' ? 'bg-[#4c9a2a]' : 'bg-[#d64545]'
                          }`}
                        />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-2 py-2" onClick={(e) => e.stopPropagation()}>
                      <button className="flex items-center justify-center w-full">
                        <KebabIcon className="size-4 text-[#008dd5]" />
                      </button>
                    </td>
                    <td />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#8a8f98] text-right">{TENANT_ROWS.length} of 112 Tenants</p>

        {selectedNames.length > 0 && (
          <BulkSelectionBar
            count={selectedNames.length}
            onSendText={() => setBulkTextOpen(true)}
            onClear={() => setSelectedNames([])}
          />
        )}
      </div>

      {sendTextOpen && (
        <SendTextModal onClose={() => setSendTextOpen(false)} onContinue={handleContinue} />
      )}
      {bulkTextOpen && (
        <BulkTextModal
          recipients={TENANT_ROWS.filter((r) => selectedNames.includes(r.name)).map((r) => ({
            name: r.name,
            phone: r.phone,
            texting: r.texting,
          }))}
          templateName={pendingTemplate}
          onClose={() => setBulkTextOpen(false)}
          onNext={handleBulkTextNext}
        />
      )}
      {toastVisible && (
        <Toast
          message={`Text sent to ${sentCount} ${sentCount === 1 ? 'tenant' : 'tenants'}${
            pendingTemplate ? ` using "${pendingTemplate}"` : ''
          }.`}
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </div>
  )
}
