import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/shell/AppHeader.jsx'
import Checkbox from '../components/ui/Checkbox.jsx'
import Toast from '../components/ui/Toast.jsx'
import SendOptInTextModal from '../components/owner/SendOptInTextModal.jsx'
import iconSearch from '../assets/icon-search.svg'
import iconAutorenew from '../assets/icon-autorenew.svg'
import iconHelp from '../assets/icon-help.svg'

function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3z" />
    </svg>
  )
}

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

function EyeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 6c-4.5 0-8.3 2.8-10 7 1.7 4.2 5.5 7 10 7s8.3-2.8 10-7c-1.7-4.2-5.5-7-10-7zm0 11.5A4.5 4.5 0 1112 8a4.5 4.5 0 010 9zm0-7.3A2.8 2.8 0 1012 15.8a2.8 2.8 0 000-5.6z" />
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

function MailOffIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm0 2v.6l8 5 8-5V6H4zm16 3.4l-8 5-8-5V18h16z" opacity="0.35" />
      <path d="M3.5 2.5l18 18-1.4 1.4-2.9-2.9H4a1 1 0 01-1-1V5c0-.3.1-.6.3-.8L2.1 3.9zM5.4 6L11 10.4 12.6 12l6.8 6.8H5V6.4z" />
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

function BoxSelect({ label, value, disabled, leadingIcon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#666]">{label}</label>
      <div
        className={`h-9 rounded border border-[#cedbe7] px-2 flex items-center justify-between text-sm text-[#13314c] gap-2 ${
          disabled ? 'bg-[#eef1f3] text-[#999]' : 'bg-[#f5f8fa]'
        }`}
      >
        <span className="flex items-center gap-2 min-w-0 truncate">
          {leadingIcon}
          {value}
        </span>
        <ChevronDownIcon className="size-5 text-[#616466] shrink-0" />
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

const MANAGEMENT_COMPANY_ROWS = [
  { date: '3/3/2006', description: 'Payment Received', amount: '-56.00', balance: '243.00', credit: true },
  { date: '5/7/2016', description: 'Late Charge', amount: '100.00', balance: '299.00', credit: false },
  { date: '6/8/2015', description: 'Management Fee', amount: '50.00', balance: '199.00', credit: false },
  { date: '4/8/2014', description: 'Payment Received', amount: '-1.00', balance: '149.00', credit: true },
  { date: '8/27/2023', description: 'Late Charge', amount: '150.00', balance: '150.00', credit: false },
  { date: '4/4/2023', description: 'Payment Received', amount: '-65.00', balance: '0.00', credit: true },
]

const UDF_ROWS = [{ name: 'Permission to Send Texts', value: 'Yes' }]

const HISTORY_ROWS = [
  {
    date: '01/22/26',
    type: 'System',
    note: '1112 Clarkson, Inc. - Owner Bill Attachments.pdf emailed to [tmwyjfbte@hldrive.com]: January 2026 Owner Bill Attachments',
  },
  { date: '01/22/26', type: 'Email', note: 'Grandin Partners January 2026 Owner Bill Attachments [HTML Email]' },
  { date: '11/15/23', type: 'Email', note: 'An inspection has been completed: Buckeye Hall - Q [HTML Email]' },
  { date: '11/15/23', type: 'Email', note: 'An inspection has been completed: Buckeye Hall - Q [HTML Email]' },
  { date: '02/27/22', type: 'System', note: 'Owner created' },
]

const PHONE_ROWS = [
  { type: 'Office', default: false, receiveTexts: false, number: '' },
  { type: 'Cell', default: true, receiveTexts: false, number: '5139251235' },
  { type: 'Fax', default: false, receiveTexts: false, number: '' },
]

function formatPhone(digits) {
  if (!digits || digits.length !== 10) return digits ?? ''
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export default function OwnerProfile() {
  const navigate = useNavigate()
  const [optInPhone, setOptInPhone] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)

  function handleSendText() {
    setOptInPhone(null)
    setToastVisible(true)
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <div className="bg-[#008dd5] flex h-10 items-center gap-3 px-4 w-full shrink-0">
        <button onClick={() => navigate('/')} className="text-white/90 hover:text-white text-lg leading-none">
          &lsaquo;&lsaquo;
        </button>
        <span className="text-white text-lg">Owners</span>
        <div className="bg-[#425a70] flex gap-2 h-8 items-center px-2 rounded w-[248px]">
          <img src={iconSearch} alt="" className="size-4 opacity-80" />
          <span className="text-white text-sm truncate">Grandin Partners</span>
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
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-base font-semibold text-[#13314c]">Grandin Partners</span>
                <span className="inline-flex items-center gap-2 bg-[#e2f1da] text-[#13314c] text-sm rounded px-2 h-6">
                  <span className="size-2 rounded-full bg-[#4c9a2a]" />
                  Current
                </span>
              </div>
              <div className="flex items-center gap-8 flex-wrap text-sm text-[#13314c]">
                <span className="flex items-center gap-2">
                  <HomeIcon className="size-5 text-[#008dd5]" />
                  Grand Cypress Homes
                </span>
                <span className="flex items-center gap-2">
                  <MailIcon className="size-5 text-[#008dd5]" />
                  capegian@mail.com
                </span>
                <span className="flex items-center gap-2">
                  <PhoneIcon className="size-5 text-[#008dd5]" />
                  513-925-1235
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#13314c]">
                  Last Pay Day: <span className="font-medium">03/31/2025</span>
                </span>
                <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded">Make Contribution</button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#13314c]">
                  Balance: <span className="inline-block w-16 text-right font-medium">0.00</span>
                </span>
                <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded">Add Note</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="General" borderColorClass="border-[#008dd5]" />
              <div className="p-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <BoxField label="Name" value="Grandin Partners" />
                  <BoxField label="Display Name" value="Grandin Partners" />
                </div>
                <div className="w-1/2 pr-2">
                  <BoxField label="Tax ID" value="XX-XXXXX" trailingIcon={<EyeIcon className="size-5 text-[#666] shrink-0" />} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-[#666]">Comment</label>
                    <span className="text-[#008dd5] text-sm">&#9776;</span>
                  </div>
                  <textarea
                    rows={2}
                    className="w-full rounded border border-[#cedbe7] bg-[#f5f8fa] p-2 text-sm text-[#13314c] outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Addresses" borderColorClass="border-[#008dd5]" />
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-6 border-b border-[#cedbe7]">
                  <button className="text-sm text-[#13314c] font-medium pb-2 border-b-2 border-[#008dd5]">
                    Primary
                  </button>
                  <button className="text-sm text-[#666] pb-2">Alternate</button>
                  <button className="text-sm text-[#666] pb-2">Forwarding</button>
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

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Miscellaneous" borderColorClass="border-[#a8d48f]" />
              <div className="p-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <BoxField
                    label="Email Address"
                    value="capegian@mail.com"
                    trailingIcon={<MailOffIcon className="size-5 text-[#d64545] shrink-0" />}
                    labelTrailing={<span className="text-sm text-[#008dd5]">Manage Subscriptions</span>}
                  />
                  <BoxSelect label="Display Color" value="Default" leadingIcon={<img src={iconSearch} alt="" className="size-4 opacity-60" />} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <BoxSelect label="Payment Method" value="Check" />
                  <BoxField label="eChecks Email" value="" />
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <BoxField label="Payee" value="Harold" />
                  <Checkbox checked={false} onChange={() => {}} label="Don't Print Checks" className="pb-2.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Manage Account" borderColorClass="border-[#a8d48f]" />
              <div className="p-4 flex flex-col gap-4">
                <BoxSelect label="Draw Account" value="< Use Default>" />
                <BoxSelect label="Contribution Account" value="< Use Default >" />
              </div>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Check Setup" borderColorClass="border-[#f58220]" />
              <div className="p-4 flex flex-col gap-3">
                <Checkbox checked={false} onChange={() => {}} label="Override Default" />
                <Checkbox checked={false} onChange={() => {}} label="Separate checks by ownership" className="opacity-50 pointer-events-none" />
                <Checkbox checked onChange={() => {}} label="Balance reserves across ownerships" className="opacity-50 pointer-events-none" />
                <div className="grid grid-cols-2 gap-4">
                  <BoxSelect label="Balance Account" value="3040 - Owner Reserves" disabled />
                  <BoxField label="Balance Memo" value="" disabled />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Phone Numbers" borderColorClass="border-[#008dd5]" />
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="bg-white border-b border-[#cedbe7]">
                    <th className="px-3 py-2 text-center font-semibold text-[#13314c] w-[16%]">Default</th>
                    <th className="px-3 py-2 text-left font-semibold text-[#13314c] w-[16%]">Type</th>
                    <th className="px-3 py-2 text-center font-semibold text-[#13314c] w-[20%]">Receive Texts?</th>
                    <th className="px-3 py-2 text-left font-semibold text-[#13314c] w-[30%]">Phone Number</th>
                    <th className="px-3 py-2 text-left font-semibold text-[#13314c] w-[18%]">Extension</th>
                  </tr>
                </thead>
                <tbody>
                  {PHONE_ROWS.map((row, i) => (
                    <tr key={row.type} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                      <td className="px-3 py-2 text-center">
                        <input type="checkbox" checked={row.default} readOnly className="size-4 accent-[#1a64bc]" />
                      </td>
                      <td className="px-3 py-2 text-[#13314c]">{row.type}</td>
                      <td className="px-3 py-2 text-center">
                        {row.default && (
                          <button
                            onClick={() => setOptInPhone(formatPhone(row.number))}
                            aria-label={`Send opt-in text to ${row.type}`}
                          >
                            <TextOptOutIcon className="size-5 text-[#d64545] inline-block" />
                          </button>
                        )}
                      </td>
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
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="Management Company" borderColorClass="border-[#008dd5]" />
              <RegisterTable
                columns={[
                  { label: 'Date', width: 'w-[20%]' },
                  { label: 'Description', width: 'w-[42%]' },
                  { label: 'Amount', width: 'w-[19%]', align: 'right' },
                  { label: 'Balance', width: 'w-[19%]', align: 'right' },
                ]}
                rows={MANAGEMENT_COMPANY_ROWS}
                renderRow={(row, i) => (
                  <tr key={i} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                    <td className="px-3 py-2 text-[#13314c]">{row.date}</td>
                    <td className="px-3 py-2 text-[#13314c] truncate">{row.description}</td>
                    <td className={`px-3 py-2 text-right ${row.credit ? 'text-[#426e29]' : 'text-[#13314c]'}`}>
                      {row.amount}
                    </td>
                    <td className="px-3 py-2 text-[#13314c] text-right">{row.balance}</td>
                  </tr>
                )}
              />
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader title="UDFS" borderColorClass="border-[#008dd5]" />
              <RegisterTable
                columns={[
                  { label: 'Name', width: 'w-1/2' },
                  { label: 'Value', width: 'w-1/2' },
                ]}
                rows={UDF_ROWS}
                renderRow={(row, i) => (
                  <tr key={row.name} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                    <td className="px-3 py-2 text-[#13314c]">{row.name}</td>
                    <td className="px-3 py-2 text-[#13314c]">{row.value}</td>
                  </tr>
                )}
              />
            </div>
          </div>

          <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col shrink-0">
            <TileHeader
              title="History / Notes"
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
              rows={HISTORY_ROWS}
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
        <Toast message="Message successfully sent." onDismiss={() => setToastVisible(false)} />
      )}
    </div>
  )
}
