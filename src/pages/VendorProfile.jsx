import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/shell/AppHeader.jsx'
import Checkbox from '../components/ui/Checkbox.jsx'
import Toast from '../components/ui/Toast.jsx'
import SendOptInTextModal from '../components/owner/SendOptInTextModal.jsx'
import iconAutorenew from '../assets/icon-autorenew.svg'
import iconHelp from '../assets/icon-help.svg'
import iconSearch from '../assets/icon-search.svg'
import chevronDown from '../assets/chevron-down.svg'

function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.02z" />
    </svg>
  )
}

function ChevronDownIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  )
}

function OpenInNewIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2z" />
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

function InfoIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2zm0-8h-2V7h2z" />
    </svg>
  )
}

function PinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  )
}

function TextOptOutIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 4h16a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1z" opacity="0.35" />
      <path d="M3.5 2.5l18 18-1.4 1.4-3-3H8l-4 4V5c0-.3.1-.6.3-.8L2.1 3.9z" />
    </svg>
  )
}

function TextOptInIcon({ className }) {
  return (
    <svg viewBox="0 0 20.667 18.667" className={className} fill="currentColor">
      <path d="M19 2C19.9167 2 20.667 2.75033 20.667 3.66699V13.667C20.6668 14.5835 19.9166 15.333 19 15.333H7.33301L4 18.667V10.4619L5.0459 11.5L5.66699 10.876V14.6416L6.6416 13.667H19V3.66699H12.8428L14.502 2H19ZM9.83301 9.5H8.16699V8.36426L8.69629 7.83301H9.83301V9.5ZM13.167 9.5H11.5V7.83301H13.167V9.5ZM16.5 9.5H14.833V7.83301H16.5V9.5ZM9.21875 2L7.67285 3.66699H5.66699V5.83008L5.0459 6.5L4 5.46973V3.66699C4 2.75033 4.75033 2 5.66699 2H9.21875Z" />
      <path d="M4.88172 10.2987L0 5.41699L1.22043 4.19656L4.88172 7.85785L12.7396 0L13.96 1.22043L4.88172 10.2987Z" />
    </svg>
  )
}

function ChatBubbleIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v11a1 1 0 01-1 1H9l-4 4V5z" />
    </svg>
  )
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  )
}

function PrimaryCheckbox({ checked }) {
  return (
    <span
      className={`inline-flex items-center justify-center size-5 rounded-sm shrink-0 ${
        checked ? 'bg-[#f58220]' : 'bg-white border-2 border-[#b3b3b3]'
      }`}
    >
      {checked && <CheckIcon className="size-3.5 text-white" />}
    </span>
  )
}

function BookmarkIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6 2h12a1 1 0 011 1v18l-7-4-7 4V3a1 1 0 011-1z" />
    </svg>
  )
}

function CopyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12zm3 4H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11z" />
    </svg>
  )
}

function DocumentIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6 2h9l5 5v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zm8 1.5V8h4.5zM8 12h8v1.5H8zm0 4h8v1.5H8zm0-8h4v1.5H8z" />
    </svg>
  )
}

function TrashIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M9 3h6l1 2h4v2H4V5h4zM5 8h14l-1.2 12.1a2 2 0 01-2 1.9H8.2a2 2 0 01-2-1.9z" />
    </svg>
  )
}

function TileHeader({ title, borderColorClass, actions }) {
  return (
    <div className={`flex items-center justify-between px-3 h-9 border-b-2 ${borderColorClass} shrink-0`}>
      <p className="text-sm font-semibold text-[#666]">{title}</p>
      <div className="flex items-center gap-4">
        {actions}
        <OpenInNewIcon className="size-5 text-[#008dd5]" />
      </div>
    </div>
  )
}

function BoxField({ label, value, placeholder, trailingIcon, disabled, labelTrailing }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-sm text-[#666]">{label}</label>
        {labelTrailing}
      </div>
      <div
        className={`h-9 rounded border border-[#cedbe7] px-2 flex items-center justify-between gap-2 ${
          disabled ? 'bg-[#eef1f3]' : 'bg-[#f5f8fa]'
        }`}
      >
        <input
          defaultValue={value}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent text-sm text-[#13314c] placeholder:text-[#999] outline-none disabled:text-[#999]"
        />
        {trailingIcon}
      </div>
    </div>
  )
}

function BoxSelect({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#666]">{label}</label>
      <div className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between text-sm text-[#13314c]">
        <span>{value}</span>
        <img src={chevronDown} alt="" className="size-5" />
      </div>
    </div>
  )
}

function RegisterTable({ columns, rows, renderRow }) {
  return (
    <div className="border border-[#cedbe7] rounded overflow-hidden w-full">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="bg-white border-b border-[#cedbe7]">
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-3 py-2 font-semibold text-[#13314c] ${col.width ?? ''} ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  )
}

function formatPhone(digits) {
  if (!digits || digits.length !== 10) return digits ?? ''
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function formatHistoryDate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2)
  return `${mm}/${dd}/${yy}`
}

function formatHistoryTime(d) {
  let hours = d.getHours()
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours}:${minutes} ${period}`
}

const PHONE_ROWS = [
  { type: 'Office', default: false, number: '' },
  { type: 'Cell', default: true, number: '5130144589' },
  { type: 'Fax', default: false, number: '' },
]

const HISTORY_ROWS = [
  { date: '07/31/24', type: 'Email', note: 'An inspection has been completed: Buckeye Hall - Q [HTML Email]' },
  { date: '07/24/24', type: 'Visit', note: 'Tim stopped by the office today' },
  { date: '05/24/24', type: 'Call', note: 'Called Tim to follow up on planned upgrades. Left voicemail' },
  { date: '05/01/24', type: 'System', note: 'Vendor created' },
]

export default function VendorProfile() {
  const navigate = useNavigate()
  const [optInPhone, setOptInPhone] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [pendingOptIn, setPendingOptIn] = useState(null)
  const [historyRows, setHistoryRows] = useState(HISTORY_ROWS)
  const [cellOptedIn, setCellOptedIn] = useState(true)

  function handleSendText() {
    setPendingOptIn({ phone: optInPhone, sentAt: new Date() })
    setOptInPhone(null)
    setToastVisible(true)
  }

  function handleToastDismiss() {
    setToastVisible(false)
    if (pendingOptIn) {
      const { phone, sentAt } = pendingOptIn
      const optedInAt = new Date(sentAt.getTime() + 4 * 60 * 1000)
      setHistoryRows((rows) => [
        {
          date: formatHistoryDate(optedInAt),
          type: 'System',
          note: `${phone} opted in to text messaging at ${formatHistoryTime(optedInAt)}`,
        },
        {
          date: formatHistoryDate(sentAt),
          type: 'System',
          note: `Texting opt-in message sent to ${phone} at ${formatHistoryTime(sentAt)}`,
        },
        ...rows,
      ])
      setCellOptedIn(true)
      setPendingOptIn(null)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <div className="bg-[#008dd5] flex h-10 items-center gap-3 px-4 w-full shrink-0">
        <button onClick={() => navigate('/')} className="text-white/90 hover:text-white text-lg leading-none">
          &lsaquo;&lsaquo;
        </button>
        <span className="text-white text-lg">Vendors</span>
        <div className="bg-[#425a70] flex gap-2 h-8 items-center px-2 rounded w-[248px]">
          <img src={iconSearch} alt="" className="size-4 opacity-80" />
          <span className="text-white text-sm truncate">AAA Plumbing</span>
        </div>
        <div className="flex items-center gap-2 text-white text-sm shrink-0">
          <span>&lsaquo;</span>
          <span>1 of 255</span>
          <span>&rsaquo;</span>
        </div>
        <div className="bg-[#f58220] text-white text-sm rounded flex items-center gap-2 px-2 py-1 shrink-0">
          <span>&#9776;</span>
          <span>1 Filters Applied</span>
          <CloseIcon className="size-3.5" />
        </div>
        <div className="flex-1" />
        <img src={iconAutorenew} alt="" className="size-5 opacity-90" />
        <img src={iconHelp} alt="" className="size-5" />
      </div>

      <div className="flex flex-1 min-h-0 w-full">
        <div className="flex-1 min-w-0 overflow-y-auto bg-[#f2f2f2] p-4 flex flex-col gap-4">
          <div className="bg-white border border-[#cedbe7] rounded shadow-sm flex items-center justify-between p-4 flex-wrap gap-3">
            <div className="flex flex-col gap-3">
              <span className="text-base font-semibold text-[#13314c]">AAA Plumbing</span>
              <div className="flex items-center gap-8 flex-wrap text-sm text-[#13314c]">
                <span>Contact: Main</span>
                <span className="flex items-center gap-2">
                  <MailIcon className="size-5 text-[#008dd5]" />
                  capegian@mail.com
                </span>
                <span className="flex items-center gap-2">
                  <PhoneIcon className="size-5 text-[#008dd5]" />
                  513-555-1235
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded">Add Bill</button>
              <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded">Add Note</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader
                title="Tax Information"
                borderColorClass="border-[#008dd5]"
                actions={<span className="text-sm text-[#008dd5]">YTD Balances</span>}
              />
              <div className="p-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <BoxField label="1099 SocSec #/ Tax #" value="XXX-XXXXXXX" />
                  <BoxSelect label="1099 Category" value="< System Default >" />
                </div>
                <Checkbox checked={false} onChange={() => {}} label="1099 Vendor" />
              </div>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader
                title="Comment"
                borderColorClass="border-[#008dd5]"
                actions={<InfoIcon className="size-5 text-[#008dd5]" />}
              />
              <div className="p-4">
                <textarea
                  rows={4}
                  className="w-full rounded border border-[#cedbe7] bg-[#f5f8fa] p-2 text-sm text-[#13314c] outline-none resize-none"
                />
              </div>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Addresses" borderColorClass="border-[#008dd5]" />
              <div className="p-4 flex flex-col gap-3">
                <div className="border-b border-[#cedbe7]">
                  <button className="text-sm text-[#13314c] font-medium pb-2 border-b-2 border-[#008dd5]">
                    Primary
                  </button>
                </div>
                <div className="rounded border border-[#cedbe7] bg-[#f5f8fa] p-3 text-sm text-[#13314c] min-h-[64px]">
                  500 Marina Drive
                  <br />
                  Cincinnati, Ohio 45206
                </div>
                <div className="flex items-center justify-between">
                  <Checkbox checked onChange={() => {}} label="Default" />
                  <button className="flex items-center gap-1 text-sm text-[#008dd5]">
                    <PinIcon className="size-4" />
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Phone Numbers" borderColorClass="border-[#008dd5]" />
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="bg-white border-b border-[#cedbe7]">
                    <th className="px-3 py-2 w-[12%]" />
                    <th className="px-3 py-2 text-center font-semibold text-[#13314c] w-[14%]">Primary</th>
                    <th className="px-3 py-2 text-left font-semibold text-[#13314c] w-[16%]">Type</th>
                    <th className="px-3 py-2 text-left font-semibold text-[#13314c] w-[36%]">Phone Number</th>
                    <th className="px-3 py-2 text-left font-semibold text-[#13314c] w-[22%]">Extension</th>
                  </tr>
                </thead>
                <tbody>
                  {PHONE_ROWS.map((row, i) => (
                    <tr key={row.type} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                      <td className="px-3 py-2">
                        {row.default && (
                          <span className="flex items-center gap-1.5">
                            <PhoneIcon className="size-4 text-[#008dd5] shrink-0" />
                            {cellOptedIn ? (
                              <span title="Opted in to text messaging" className="inline-block">
                                <TextOptInIcon className="size-4 text-[#6eb744] inline-block" />
                              </span>
                            ) : (
                              <button
                                onClick={() => setOptInPhone(formatPhone(row.number))}
                                aria-label={`Send opt-in text to ${row.type}`}
                              >
                                <TextOptOutIcon className="size-4 text-[#d64545] inline-block" />
                              </button>
                            )}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <PrimaryCheckbox checked={row.default} />
                      </td>
                      <td className="px-3 py-2 text-[#13314c]">{row.type}</td>
                      <td className="px-3 py-2">
                        <input
                          defaultValue={row.number}
                          className="w-full h-8 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c] outline-none"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input className="w-full h-8 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c] outline-none" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader
                title="Contacts"
                borderColorClass="border-[#008dd5]"
                actions={<button className="text-sm text-[#008dd5]">Add Contact</button>}
              />
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-baseline gap-2">
                      <span className="text-base font-semibold text-[#13314c]">Brad Locke</span>
                      <span className="italic text-sm text-[#13314c]">(Primary)</span>
                    </span>
                    <span className="inline-flex w-fit items-center bg-[#f0d9a8] text-[#6b4d1a] text-xs font-medium px-2 py-0.5 rounded">
                      Manager
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 text-sm text-[#13314c] shrink-0">
                    <span className="flex items-center gap-2">
                      <PhoneIcon className="size-4 text-[#008dd5]" />
                      <ChatBubbleIcon className="size-4 text-[#008dd5]" />
                      555-555-5555
                    </span>
                    <span className="flex items-center gap-2">
                      <MailIcon className="size-4 text-[#008dd5]" />
                      blocke@email.com
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#13314c]">Comment</span>
                  <p className="text-sm text-[#13314c]">
                    Brad is the Manager and Owner at Locke &amp; Key Construction. Preferred contact method is email,
                    but will respond to texts after hours. Business hours: 10 am - 4 pm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col shrink-0">
            <TileHeader
              title="HISTORY / NOTES"
              borderColorClass="border-[#f58220]"
              actions={
                <button className="text-sm text-[#008dd5] flex items-center gap-1">
                  Add Note <span className="text-xs">&#9662;</span>
                </button>
              }
            />
            <RegisterTable
              columns={[
                { label: 'Date', width: 'w-[10%]' },
                { label: 'Type', width: 'w-[10%]' },
                { label: 'Note', width: 'w-[80%]' },
              ]}
              rows={historyRows}
              renderRow={(row, i) => (
                <tr key={i} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                  <td className="px-3 py-2 text-[#13314c] truncate">{row.date}</td>
                  <td className="px-3 py-2 text-[#13314c] truncate">{row.type}</td>
                  <td className="px-3 py-2 text-[#13314c] truncate">{row.note}</td>
                </tr>
              )}
            />
          </div>
        </div>

        <div className="bg-[#13314c] w-10 shrink-0 flex flex-col items-center gap-6 py-4">
          <BookmarkIcon className="size-5 text-white/80" />
          <CopyIcon className="size-5 text-white/80" />
          <MailIcon className="size-5 text-white/80" />
          <DocumentIcon className="size-5 text-white/80" />
          <TrashIcon className="size-5 text-white/80" />
        </div>
      </div>

      {optInPhone && (
        <SendOptInTextModal phoneNumber={optInPhone} onClose={() => setOptInPhone(null)} onSend={handleSendText} />
      )}
      {toastVisible && (
        <Toast message="Message successfully sent." onDismiss={handleToastDismiss} />
      )}
    </div>
  )
}
