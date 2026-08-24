import { useState } from 'react'
import { TENANTS } from '../../data/tenants.js'
import iconClose from '../../assets/icon-close-2.svg'
import iconWarning from '../../assets/icon-warning.svg'
import iconChevronDown from '../../assets/chevron-down.svg'
import iconCheckAction from '../../assets/icon-check-action.svg'
import iconCloudUpload from '../../assets/icon-cloud-upload.svg'
import iconPaste from '../../assets/icon-paste.svg'
import iconImage from '../../assets/icon-image.svg'
import phoneSms from '../../assets/phone-sms.svg'
import phoneVerified from '../../assets/phone-verified.svg'
import phoneInvalid from '../../assets/phone-invalid.svg'
import phonePending from '../../assets/phone-pending.svg'

const PHONE_STATUS_ICON = {
  sms: phoneSms,
  verified: phoneVerified,
  invalid: phoneInvalid,
  pending: phonePending,
}

export default function BulkTextComposerModal({
  selectedIds,
  initialMessage,
  initialIsPromotional,
  isNewText,
  onClose,
  onNext,
}) {
  const [message, setMessage] = useState(initialMessage ?? '')
  const [isPromotional, setIsPromotional] = useState(initialIsPromotional ?? false)
  const [contactsInclude, setContactsInclude] = useState('primary')
  const recipients = TENANTS.filter((t) => selectedIds.includes(t.id))

  const consentField = isPromotional ? 'promotional' : 'informational'
  const [checkedIds, setCheckedIds] = useState(() => {
    const field = initialIsPromotional ? 'promotional' : 'informational'
    return recipients.filter((t) => t.consent[field]).map((t) => t.id)
  })

  const optedOut = recipients.filter((t) => !t.consent[consentField])
  const disabledIds = isNewText && isPromotional ? optedOut.map((t) => t.id) : []

  function toggle(id) {
    if (disabledIds.includes(id)) return
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function handlePromotionalChange(checked) {
    const oldOptedOutIds = recipients.filter((t) => !t.consent[consentField]).map((t) => t.id)
    const newField = checked ? 'promotional' : 'informational'
    const newOptedOutIds = recipients.filter((t) => !t.consent[newField]).map((t) => t.id)
    setIsPromotional(checked)
    setCheckedIds((prev) => {
      const withoutNewlyExcluded = prev.filter((id) => !newOptedOutIds.includes(id))
      const newlyEligible = oldOptedOutIds.filter((id) => !newOptedOutIds.includes(id))
      return Array.from(new Set([...withoutNewlyExcluded, ...newlyEligible]))
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[1024px] max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#cedbe7] shrink-0">
          <h2 className="text-base font-semibold text-[#666]">Bulk Text</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={iconClose} alt="" className="size-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base text-[#13314c]">Addressee List</h3>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-6">
                <span className="text-sm text-[#666]">Contacts to include</span>
                <label className="flex items-center gap-2 text-sm text-[#666]">
                  <input
                    type="radio"
                    name="contacts-include"
                    checked={contactsInclude === 'primary'}
                    onChange={() => setContactsInclude('primary')}
                  />
                  Primary
                </label>
                <label className="flex items-center gap-2 text-sm text-[#666]">
                  <input
                    type="radio"
                    name="contacts-include"
                    checked={contactsInclude === 'types'}
                    onChange={() => setContactsInclude('types')}
                  />
                  Contact Types
                </label>
                <div
                  className={`h-9 w-[248px] border border-[#cedbe7] rounded px-2 flex items-center justify-between text-sm ${
                    contactsInclude === 'types' ? 'bg-[#f5f8fa] text-[#13314c]' : 'bg-[#ebeced] text-[#b3b3b3]'
                  }`}
                >
                  <span>2 Selected</span>
                  <img src={iconChevronDown} alt="" className="size-5" />
                </div>
              </div>
              {!isNewText && optedOut.length > 0 && (
                <div className="flex items-center gap-2 border border-[#f79b4d] rounded px-2 py-1.5 text-sm text-[#666]">
                  <img src={iconWarning} alt="" className="size-6" />
                  {optedOut.length} of {recipients.length} recipients are opted out of all categories
                </div>
              )}
            </div>

            <div className="border border-[#cedbe7] rounded overflow-hidden">
              <div className="max-h-[220px] overflow-y-auto">
                <table className="w-full text-sm table-fixed">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#737373] text-white text-left font-medium text-xs tracking-[1.134px]">
                      <th className="px-2 py-1 w-10 rounded-tl-sm" />
                      <th className="px-2 py-1 font-medium w-[30%]">Name</th>
                      <th className="px-2 py-1 font-medium w-[35%]">Phone Number</th>
                      <th className="px-2 py-1 font-medium w-[25%] rounded-tr-sm">Contact Type</th>
                    </tr>
                  </thead>
                  <tbody>
                  {recipients.map((t) => {
                    const checked = checkedIds.includes(t.id)
                    const disabled = disabledIds.includes(t.id)
                    return (
                      <tr key={t.id} className="border-t border-[#e5e4e7]">
                        <td className="px-3 py-2">
                          <button
                            onClick={() => toggle(t.id)}
                            disabled={disabled}
                            className={`flex items-center justify-center ${disabled ? 'cursor-not-allowed' : ''}`}
                          >
                            {checked ? (
                              <img src={iconCheckAction} alt="" className="size-5" />
                            ) : (
                              <span
                                className={`size-5 inline-block rounded-sm border-2 ${
                                  disabled ? 'border-[#e5e4e7] bg-[#f5f8fa]' : 'border-[#b3b3b3] bg-white'
                                }`}
                              />
                            )}
                          </button>
                        </td>
                        <td className={`px-3 py-2 ${disabled ? 'text-[#b3b3b3]' : 'text-[#13314c]'}`}>{t.name}</td>
                        <td className={`px-3 py-2 ${disabled ? 'text-[#b3b3b3]' : 'text-[#13314c]'}`}>
                          <span className="inline-flex items-center gap-1.5">
                            {PHONE_STATUS_ICON[t.phoneStatus] && (
                              <img src={PHONE_STATUS_ICON[t.phoneStatus]} alt="" className="size-5 shrink-0" />
                            )}
                            {t.phone}
                          </span>
                        </td>
                        <td className={`px-3 py-2 ${disabled ? 'text-[#b3b3b3]' : 'text-[#13314c]'}`}>Tenant</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base text-[#13314c]">Message</h3>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#666]">Attachments</span>
              <div className="border border-dashed border-[#cedbe7] bg-[#f5f8fa] rounded px-2 h-9 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm text-[#008dd5]">
                  <img src={iconCloudUpload} alt="" className="size-4" />
                  Upload Files
                </span>
                <img src={iconPaste} alt="" className="size-5" />
              </div>
            </div>

            <div className="border border-[#cedbe7] rounded">
              <div className="border-b border-[#cedbe7] flex items-center px-3 py-2">
                <button className="text-sm text-[#008dd5]">Insert Text Template</button>
                <img src={iconImage} alt="" className="size-6 ml-2" />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3 text-sm text-[#13314c] outline-none resize-none"
                placeholder="Hi [Tenant.Name()], this is [PropertyManagement.Name()]..."
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-[#666]">
              <input
                type="checkbox"
                checked={isPromotional}
                onChange={(e) => handlePromotionalChange(e.target.checked)}
              />
              Message includes promotional material
            </label>

            {isNewText && optedOut.length > 0 && (
              <div className="flex items-center gap-2 border border-[#f79b4d] rounded px-2 py-1.5 text-sm text-[#666]">
                <img src={iconWarning} alt="" className="size-6 shrink-0" />
                {optedOut.length} of {recipients.length} recipients are opted out of all categories and will not
                receive {isPromotional ? 'promotional messages' : 'this message'}.
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-2 bg-[#f5f8fa] border-t border-[#cedbe7] shrink-0">
          <img src={iconWarning} alt="" className="size-5" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNext({ checkedIds, message, isPromotional, optedOutRecipients: optedOut })}
              className="h-9 px-4 rounded bg-[#008dd5] text-white text-sm"
            >
              Next
            </button>
            <button onClick={onClose} className="h-9 px-4 rounded border border-[#008dd5] text-[#008dd5] text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
