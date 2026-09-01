import { useState } from 'react'
import iconClose from '../../assets/icon-close.svg'
import { TEMPLATE_DATA } from '../../data/templateFolders.js'

function WarningIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2L1 21h22zm0 4.5L19.5 19h-15zM11 10v4h2v-4zm0 5.5v2h2v-2z" />
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

function UploadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3l5 5h-3.5v6h-3V8H7zM5 19h14v2H5z" />
    </svg>
  )
}

function TemplateIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zm2 4v2h10V7zm0 4v2h10v-2zm0 4v2h6v-2z" />
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

function ChevronDownIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  )
}

function RowCheckbox({ checked, disabled, onChange }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onChange}
      className={`inline-flex items-center justify-center size-5 rounded-sm shrink-0 ${
        disabled
          ? 'bg-white border-2 border-[#e0e0e0] cursor-not-allowed'
          : checked
            ? 'bg-[#f58220]'
            : 'bg-white border-2 border-[#b3b3b3]'
      }`}
    >
      {checked && !disabled && <CheckIcon className="size-3.5 text-white" />}
    </button>
  )
}

function findTemplateMessage(name) {
  if (!name) return ''
  for (const folder of Object.values(TEMPLATE_DATA)) {
    const row = folder.rows.find((r) => r.name === name)
    if (row) return row.messageText ?? ''
  }
  return ''
}

function personalize(text, fullName) {
  const firstName = fullName.split(' ')[0]
  return text.replace(/\[Tenant First Name\]/g, firstName).replace(/\[Tenant\.FirstName\(\)\]/g, firstName)
}

export default function BulkTextModal({ recipients, templateName, onClose, onNext }) {
  const [step, setStep] = useState('addressees')
  const [checkedNames, setCheckedNames] = useState(recipients.filter((r) => r.texting).map((r) => r.name))
  const [messageText, setMessageText] = useState(findTemplateMessage(templateName))
  const [activeRecipient, setActiveRecipient] = useState(null)

  const optedOutCount = recipients.filter((r) => !r.texting).length
  const allSelectable = recipients.filter((r) => r.texting)
  const allChecked = checkedNames.length === allSelectable.length && allSelectable.length > 0
  const toSend = recipients.filter((r) => checkedNames.includes(r.name))
  const shownRecipient = toSend.find((r) => r.name === activeRecipient) ?? toSend[0]

  function toggleRow(name) {
    setCheckedNames((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))
  }

  function toggleAll() {
    setCheckedNames((prev) => (prev.length === allSelectable.length ? [] : allSelectable.map((r) => r.name)))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[1100px] max-h-[92vh] shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#cedbe7] shrink-0">
          <h2 className="text-xl text-[#13314c]">Bulk Text</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={iconClose} alt="" className="size-6" />
          </button>
        </div>

        {step === 'addressees' && (
          <>
            <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[#13314c]">Addressee List</p>

                <div className="flex items-center gap-6 flex-wrap">
                  <span className="text-sm text-[#666]">Contacts to include</span>
                  <label className="flex items-center gap-1.5 text-sm text-[#13314c]">
                    <input type="radio" name="contacts-to-include" checked readOnly className="accent-[#1a64bc]" />
                    Primary
                  </label>
                  <label className="flex items-center gap-1.5 text-sm text-[#999]">
                    <input type="radio" name="contacts-to-include" disabled className="accent-[#1a64bc]" />
                    Contact Types
                  </label>
                  <div className="h-9 w-[160px] rounded border border-[#cedbe7] bg-[#eef1f3] px-2 flex items-center text-sm text-[#999]">
                    2 Selected
                  </div>
                </div>

                {optedOutCount > 0 && (
                  <div className="flex items-center gap-2 border border-[#f5a623] bg-[#fff4e0] text-[#7a5900] rounded px-3 py-2 text-sm">
                    <WarningIcon className="size-5 text-[#f5a623] shrink-0" />
                    {optedOutCount} {optedOutCount === 1 ? 'recipient is' : 'recipients are'} opted out of texting
                    and will not receive this message.
                  </div>
                )}

                <div className="border border-[#cedbe7] rounded overflow-hidden">
                  <table className="w-full text-sm table-fixed">
                    <thead>
                      <tr className="bg-[#737373] text-white text-left font-medium text-xs tracking-[1.134px]">
                        <th className="w-[6%] px-3 py-2">
                          <RowCheckbox checked={allChecked} onChange={toggleAll} />
                        </th>
                        <th className="w-[34%] px-3 py-2">Name</th>
                        <th className="w-[34%] px-3 py-2">Phone Number</th>
                        <th className="w-[26%] px-3 py-2">Contact Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipients.map((r, i) => (
                        <tr key={r.name} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                          <td className="px-3 py-2">
                            <RowCheckbox
                              checked={checkedNames.includes(r.name)}
                              disabled={!r.texting}
                              onChange={() => toggleRow(r.name)}
                            />
                          </td>
                          <td className={`px-3 py-2 ${r.texting ? 'text-[#13314c]' : 'text-[#b3b3b3]'}`}>{r.name}</td>
                          <td className="px-3 py-2">
                            <span className="flex items-center gap-2">
                              {!r.texting && <TextOptOutIcon className="size-4 text-[#d64545] shrink-0" />}
                              <input
                                defaultValue={r.phone}
                                disabled={!r.texting}
                                className={`w-full h-8 rounded border px-2 text-sm outline-none ${
                                  r.texting
                                    ? 'border-[#cedbe7] bg-[#f5f8fa] text-[#13314c]'
                                    : 'border-[#ebf1f5] bg-[#f5f5f5] text-[#b3b3b3]'
                                }`}
                              />
                            </span>
                          </td>
                          <td className={`px-3 py-2 ${r.texting ? 'text-[#13314c]' : 'text-[#b3b3b3]'}`}>Tenant</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[#13314c]">Message</p>

                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[#666]">Attachments</span>
                  <button className="h-10 rounded border border-dashed border-[#cedbe7] bg-white flex items-center gap-2 px-3 text-sm text-[#008dd5] w-fit">
                    <UploadIcon className="size-4" />
                    Upload Files
                  </button>
                </div>

                <button className="flex items-center gap-2 text-sm text-[#008dd5] w-fit">
                  <TemplateIcon className="size-4" />
                  Insert Text Template
                </button>

                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={5}
                  placeholder="Type your message..."
                  className="w-full rounded border border-[#cedbe7] bg-[#f5f8fa] p-3 text-sm text-[#13314c] outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 px-4 py-3 bg-[#f5f8fa] border-t border-[#cedbe7] rounded-b shrink-0">
              <button
                onClick={() => setStep('review')}
                disabled={checkedNames.length === 0}
                className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded hover:bg-[#0077b6] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button onClick={onClose} className="h-9 px-3 rounded border border-[#008dd5] text-[#008dd5] text-sm">
                Cancel
              </button>
            </div>
          </>
        )}

        {step === 'review' && shownRecipient && (
          <>
            <div className="flex flex-1 min-h-0">
              <div className="w-[230px] shrink-0 border-r border-[#cedbe7] overflow-y-auto p-4 flex flex-col gap-2">
                <p className="text-sm font-semibold text-[#13314c]">Recipients</p>
                <div className="flex flex-col">
                  {toSend.map((r) => (
                    <button
                      key={r.name}
                      onClick={() => setActiveRecipient(r.name)}
                      className={`text-left text-sm px-2 h-9 rounded flex items-center border-l-4 ${
                        r.name === shownRecipient.name
                          ? 'bg-[#e5f4fc] border-[#008dd5] text-[#13314c] font-medium'
                          : 'border-transparent text-[#13314c] hover:bg-[#f5f8fa]'
                      }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 min-w-0 overflow-y-auto p-4 flex flex-col gap-2">
                <p className="text-sm text-[#13314c]">
                  <span className="font-semibold">To:</span> {shownRecipient.name} &lt;{shownRecipient.phone}&gt;
                </p>
                <div className="rounded border border-[#cedbe7] bg-[#f5f8fa] p-3 text-sm text-[#13314c]">
                  {personalize(messageText, shownRecipient.name)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#f5f8fa] border-t border-[#cedbe7] rounded-b shrink-0">
              <button
                onClick={() => setStep('addressees')}
                className="h-9 px-3 rounded border border-[#008dd5] text-[#008dd5] text-sm"
              >
                Back
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNext(checkedNames.length)}
                  className="bg-[#008dd5] text-white text-sm h-9 rounded flex items-center hover:bg-[#0077b6]"
                >
                  <span className="px-3">Send All</span>
                  <span className="border-l border-white/60 px-2 flex items-center h-full">
                    <ChevronDownIcon className="size-4" />
                  </span>
                </button>
                <button onClick={onClose} className="h-9 px-3 rounded border border-[#008dd5] text-[#008dd5] text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
