import { useState } from 'react'
import iconHelp from '../../assets/icon-help.svg'
import iconClose from '../../assets/icon-close.svg'
import chevronDown from '../../assets/chevron-down.svg'
import Checkbox from '../ui/Checkbox.jsx'

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

function CalendarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14zm0-12H5V6h14z" />
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

function CheckCircleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 14.5L6 12l1.41-1.41 3.09 3.08 6.09-6.09L18 9z" />
    </svg>
  )
}

function TextOptInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 4h16a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1zm3.5 6.2l2.2 2.2 5.3-5.3 1.4 1.4-6.7 6.7-3.6-3.6z" />
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

function formatPhone(digits) {
  if (!digits || digits.length !== 10) return digits ?? ''
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function FieldInput({ label, value, placeholder, trailingIcon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#666]">{label}</label>
      <div className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between gap-2">
        <input
          defaultValue={value}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-sm text-[#13314c] placeholder:text-[#999] outline-none"
        />
        {trailingIcon}
      </div>
    </div>
  )
}

function FieldSelect({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#666]">{label}</label>
      <div className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 flex items-center justify-between text-sm text-[#13314c]">
        <span className={value ? '' : 'text-[#999]'}>{value || 'Select'}</span>
        <img src={chevronDown} alt="" className="size-5" />
      </div>
    </div>
  )
}

function TileTitle({ children }) {
  return (
    <div className="px-3 h-9 flex items-center border-b-2 border-[#008dd5] shrink-0">
      <p className="text-sm font-semibold text-[#13314c]">{children}</p>
    </div>
  )
}

function emptyContact(id, name, initials) {
  return {
    id,
    name,
    initials,
    status: 'Current',
    email: '',
    emailVerified: false,
    dob: '',
    ssn: '',
    employer: '',
    annualIncome: '',
    licensePlate: '',
    vehicle: '',
    contactType: '',
    applicantType: '',
    committeeMember: false,
    committeeCount: 0,
    checks: { primary: false, textingOptIn: false, active: true },
    udf: [
      { name: 'Receives CRP', value: '' },
      { name: 'CRP Move in Date', value: '', isDate: true },
      { name: 'CRP Move out Date', value: '', isDate: true },
    ],
    address: '',
    addressDefault: false,
    phones: [
      { type: 'Home', default: false, optIn: false, number: '', ext: '' },
      { type: 'Work', default: false, optIn: false, number: '', ext: '' },
      { type: 'Cell', default: false, optIn: false, number: '', ext: '' },
      { type: 'Pager', default: false, optIn: false, number: '', ext: '' },
      { type: 'Alternate', default: false, optIn: false, number: '', ext: '' },
    ],
  }
}

const CONTACTS = [
  {
    ...emptyContact('lacey', 'Lacey Bartell', 'LB'),
    email: 'ldaniels@mail.com',
    emailVerified: true,
    dob: '02/20/1995',
    licensePlate: 'KMB 1045',
    committeeMember: true,
    committeeCount: 1,
    checks: { primary: true, textingOptIn: true, active: true },
    address: '1492 Loveland-Madeira Road Unit #02\nLoveland, OH 45140',
    phones: [
      { type: 'Home', default: false, optIn: false, number: '', ext: '' },
      { type: 'Work', default: false, optIn: false, number: '', ext: '' },
      { type: 'Cell', default: true, optIn: true, number: '5135927259', ext: '' },
      { type: 'Pager', default: false, optIn: false, number: '', ext: '' },
      { type: 'Alternate', default: false, optIn: false, number: '', ext: '' },
    ],
  },
  emptyContact('alexis', 'Alexis Daniels', 'AD'),
  emptyContact('hadley', 'Hadley Reynolds', 'HR'),
]

const ADDRESS_TABS = ['Primary', 'Alternative', 'Forwarding']

export default function ViewContactsOverlay({ onClose }) {
  const [selectedId, setSelectedId] = useState(CONTACTS[0].id)
  const [addressTab, setAddressTab] = useState('Primary')
  const [showInactive, setShowInactive] = useState(false)
  const contact = CONTACTS.find((c) => c.id === selectedId)
  const defaultPhone = contact.phones.find((p) => p.default && p.number)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[1300px] h-[85vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#cedbe7] shrink-0">
          <h2 className="text-xl text-[#13314c]">View Contacts</h2>
          <div className="flex items-center gap-3">
            <img src={iconHelp} alt="" className="size-6" />
            <button onClick={onClose} aria-label="Close">
              <img src={iconClose} alt="" className="size-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          <div className="w-[232px] shrink-0 border-r border-[#cedbe7] flex flex-col justify-between">
            <div className="flex flex-col">
              <button className="text-sm text-[#008dd5] text-left px-4 py-3">+ Add Contact</button>
              <div className="flex flex-col">
                {CONTACTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`flex items-center justify-between gap-2 px-4 h-10 text-sm text-left border-l-4 shrink-0 ${
                      c.id === selectedId
                        ? 'bg-[#e5f4fc] border-[#008dd5] text-[#13314c] font-medium'
                        : 'border-transparent text-[#13314c]'
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    <KebabIcon className="size-4 text-[#008dd5] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
            <div className="px-4 py-3">
              <Checkbox checked={showInactive} onChange={setShowInactive} label="Show Inactive" />
            </div>
          </div>

          <div key={selectedId} className="flex-1 min-w-0 overflow-y-auto p-4 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <span className="bg-[#008dd5] text-white rounded-full size-[85px] flex items-center justify-center text-2xl font-semibold shrink-0">
                {contact.initials}
              </span>
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xl font-semibold text-[#13314c]">{contact.name}</span>
                  <span className="inline-flex items-center gap-2 bg-[#e2f1da] text-[#13314c] text-sm rounded px-2 h-6">
                    <span className="size-2 rounded-full bg-[#4c9a2a]" />
                    {contact.status}
                  </span>
                </div>
                <div className="flex items-center gap-6 flex-wrap text-sm text-[#13314c]">
                  {contact.email && (
                    <span className="flex items-center gap-2">
                      <MailIcon className="size-5 text-[#008dd5]" />
                      {contact.email}
                      {contact.emailVerified && <CheckCircleIcon className="size-4 text-[#4c9a2a]" />}
                    </span>
                  )}
                  {defaultPhone && (
                    <span className="flex items-center gap-2">
                      <PhoneIcon className="size-5 text-[#008dd5]" />
                      {formatPhone(defaultPhone.number)}
                    </span>
                  )}
                  {contact.committeeMember && (
                    <span className="flex items-center gap-2">
                      <TextOptInIcon className="size-5 text-[#008dd5]" />
                      Committee Member
                      <span className="bg-[#f2f2f2] text-[#13314c] text-xs rounded-full px-2 h-5 flex items-center">
                        {contact.committeeCount}
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  <Checkbox checked={contact.checks.primary} onChange={() => {}} label="Primary" />
                  <Checkbox checked={contact.checks.textingOptIn} onChange={() => {}} label="Marketing Texting Opt-In" />
                  <Checkbox checked={contact.checks.active} onChange={() => {}} label="Active" />
                </div>
              </div>
            </div>

            <div className="border border-[#cedbe7] rounded p-4 grid grid-cols-3 gap-x-6 gap-y-4">
              <FieldInput
                label="Email"
                value={contact.email}
                trailingIcon={contact.emailVerified && <CheckCircleIcon className="size-5 text-[#4c9a2a] shrink-0" />}
              />
              <FieldInput
                label="Date of Birth"
                value={contact.dob}
                trailingIcon={<CalendarIcon className="size-5 text-[#666] shrink-0" />}
              />
              <FieldInput label="SSN" value={contact.ssn} placeholder="XXX-XX-XXXX" />
              <FieldInput label="Employer" value={contact.employer} />
              <FieldInput
                label="Annual Income"
                value={contact.annualIncome}
                trailingIcon={<EyeIcon className="size-5 text-[#666] shrink-0" />}
              />
              <FieldInput label="License Plate #" value={contact.licensePlate} />
              <FieldInput label="Vehicle" value={contact.vehicle} />
              <FieldSelect label="Contact Type" value={contact.contactType} />
              <FieldSelect label="Applicant Type" value={contact.applicantType} />
            </div>

            <div className="border border-[#cedbe7] rounded overflow-hidden">
              <TileTitle>User Defined Fields</TileTitle>
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="bg-white border-b border-[#cedbe7]">
                    <th className="px-3 py-2 text-left font-medium text-xs tracking-[1.134px] text-[#13314c] w-1/2">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-xs tracking-[1.134px] text-[#13314c] w-1/2">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contact.udf.map((row, i) => (
                    <tr key={row.name} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                      <td className="px-3 py-2 text-[#13314c]">{row.name}</td>
                      <td className="px-3 py-2">
                        <input
                          defaultValue={row.value}
                          placeholder={row.isDate ? 'mm/dd/yy' : ''}
                          className="w-full h-8 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c] outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="border border-[#cedbe7] rounded overflow-hidden flex flex-col">
                <TileTitle>Address</TileTitle>
                <div className="p-3 flex flex-col gap-3">
                  <div className="flex items-center gap-6 border-b border-[#cedbe7]">
                    {ADDRESS_TABS.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setAddressTab(tab)}
                        className={`text-sm pb-2 ${
                          addressTab === tab
                            ? 'text-[#13314c] font-medium border-b-2 border-[#008dd5]'
                            : 'text-[#666]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {addressTab === 'Primary' && contact.address ? (
                    <>
                      <div className="rounded border border-[#cedbe7] bg-[#f5f8fa] p-3 text-sm text-[#13314c] whitespace-pre-line min-h-[64px]">
                        {contact.address}
                      </div>
                      <Checkbox checked={contact.addressDefault} onChange={() => {}} label="Default" />
                    </>
                  ) : (
                    <p className="text-sm text-[#666] py-2">No {addressTab.toLowerCase()} address on file.</p>
                  )}
                </div>
              </div>

              <div className="border border-[#cedbe7] rounded overflow-hidden">
                <TileTitle>Phone Numbers</TileTitle>
                <table className="w-full text-sm table-fixed">
                  <thead>
                    <tr className="bg-white border-b border-[#cedbe7]">
                      <th className="px-3 py-2 text-center font-medium text-xs tracking-[1.134px] text-[#13314c] w-[10%]">
                        Default
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-xs tracking-[1.134px] text-[#13314c] w-[16%]">
                        Type
                      </th>
                      <th className="px-3 py-2 text-center font-medium text-xs tracking-[1.134px] text-[#13314c] w-[14%]">
                        Opt In?
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-xs tracking-[1.134px] text-[#13314c] w-[38%]">
                        Phone Number
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-xs tracking-[1.134px] text-[#13314c] w-[22%]">
                        Extension
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact.phones.map((row, i) => (
                      <tr key={row.type} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                        <td className="px-3 py-2 text-center">
                          <input type="checkbox" checked={row.default} readOnly className="size-4 accent-[#1a64bc]" />
                        </td>
                        <td className="px-3 py-2 text-[#13314c]">{row.type}</td>
                        <td className="px-3 py-2 text-center">
                          {row.optIn && <TextOptInIcon className="size-5 text-[#4c9a2a] inline-block" />}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            defaultValue={row.number}
                            className="w-full h-8 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c] outline-none"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            defaultValue={row.ext}
                            className="w-full h-8 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c] outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 bg-[#f5f8fa] border-t border-[#cedbe7] rounded-b shrink-0">
          <button onClick={onClose} className="h-9 px-4 rounded bg-[#008dd5] text-white text-sm hover:bg-[#0077b6]">
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
