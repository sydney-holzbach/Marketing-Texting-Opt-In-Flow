import { useState } from 'react'
import RegisterShell from '../../components/shell/RegisterShell.jsx'
import TemplatePickerModal from '../../components/bulk/TemplatePickerModal.jsx'
import BulkTextComposerModal from '../../components/bulk/BulkTextComposerModal.jsx'
import OverrideOptedOutDialog from '../../components/bulk/OverrideOptedOutDialog.jsx'
import BulkTextPreviewModal from '../../components/bulk/BulkTextPreviewModal.jsx'
import BulkActionsMenu from '../../components/bulk/BulkActionsMenu.jsx'
import { TENANTS } from '../../data/tenants.js'
import phoneSms from '../../assets/phone-sms.svg'
import phoneVerified from '../../assets/phone-verified.svg'
import phoneInvalid from '../../assets/phone-invalid.svg'
import phonePending from '../../assets/phone-pending.svg'

const VARIANT_LABEL = {
  informational: 'Informational Bulk Flow',
  promotional: 'Promotional Bulk Flow',
}

const PHONE_STATUS_ICON = {
  sms: phoneSms,
  verified: phoneVerified,
  invalid: phoneInvalid,
  pending: phonePending,
}

function KebabIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-[#1a64bc]">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  )
}

const COL_WIDTHS = {
  checkbox: 'w-[4%]',
  name: 'w-[16%]',
  property: 'w-[15%]',
  unit: 'w-[12%]',
  phone: 'w-[15%]',
  leaseStart: 'w-[13%]',
  leaseEnd: 'w-[13%]',
  status: 'w-[8%]',
  kebab: 'w-[4%]',
}

export default function BulkFlow({ variant }) {
  const [selected, setSelected] = useState([])
  const [selectionMode, setSelectionMode] = useState(false)
  const [step, setStep] = useState('register')
  const [template, setTemplate] = useState(null)
  const [composerResult, setComposerResult] = useState(null)
  const [previewRecipientIds, setPreviewRecipientIds] = useState([])
  const [sentSummary, setSentSummary] = useState(null)
  const [showBulkActions, setShowBulkActions] = useState(false)

  function toggleOne(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  function toggleAll() {
    setSelected((prev) => (prev.length === TENANTS.length ? [] : TENANTS.map((t) => t.id)))
  }

  function handleComposerNext(result) {
    setComposerResult(result)
    if (template !== null && result.optedOutRecipients.length > 0) {
      setStep('override')
    } else {
      finishSend(result.checkedIds, result.checkedIds.length)
    }
  }

  function finishSend(recipientIds, count) {
    setSentSummary({ count, total: recipientIds.length })
    setStep('sent')
  }

  function reset() {
    setStep('register')
    setTemplate(null)
    setComposerResult(null)
    setPreviewRecipientIds([])
    setSentSummary(null)
    setSelected([])
    setSelectionMode(false)
  }

  return (
    <RegisterShell title="Tenants">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <button
              onClick={() => setShowBulkActions((v) => !v)}
              className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded flex items-center gap-1 whitespace-nowrap"
            >
              Bulk Actions <span className="text-xs">&#9662;</span>
            </button>
            {showBulkActions && (
              <BulkActionsMenu
                onClose={() => setShowBulkActions(false)}
                onSendText={() => {
                  setShowBulkActions(false)
                  setSelectionMode(true)
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#616466]">Search</label>
            <input
              placeholder="Find a tenant"
              className="h-9 w-[170px] border border-[#cedbe7] rounded px-3 text-sm outline-none focus:border-[#008dd5] bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#616466]">Saved Filters</label>
            <div className="h-9 w-[150px] border border-[#cedbe7] rounded px-3 flex items-center justify-between text-sm text-[#13314c] bg-white">
              <span>*Temp filter</span>
              <span className="text-[#8a8f98] text-xs">&#9776;</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#616466]">Status</label>
            <div className="h-9 w-[140px] border border-[#cedbe7] rounded px-3 flex items-center justify-between text-sm text-[#13314c] bg-white">
              <span>All selected</span>
              <span className="text-[#8a8f98]">&#9662;</span>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-[#13314c] mt-4 shrink-0 whitespace-nowrap">
            <input type="checkbox" />
            Exclude Subaccounts
          </label>
          <span className="text-xs text-[#616466] bg-white border border-[#cedbe7] rounded px-2 py-1 mt-4 shrink-0 whitespace-nowrap">
            {VARIANT_LABEL[variant]}
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-2 shrink-0">
            <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded">+ Add Tenant</button>
            <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded">+ Add Guest</button>
          </div>
        </div>

        <div className="bg-white border border-[#cedbe7] rounded overflow-hidden w-full">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="bg-[#737373] text-white text-left font-medium text-xs tracking-[1.134px]">
                {selectionMode && (
                  <th className={`px-2 py-1 rounded-tl-sm ${COL_WIDTHS.checkbox}`}>
                    <input type="checkbox" checked={selected.length === TENANTS.length} onChange={toggleAll} />
                  </th>
                )}
                <th className={`px-2 py-1 font-medium ${COL_WIDTHS.name} ${selectionMode ? '' : 'rounded-tl-sm'}`}>
                  Name
                </th>
                <th className={`px-2 py-1 font-medium ${COL_WIDTHS.property}`}>Property</th>
                <th className={`px-2 py-1 font-medium ${COL_WIDTHS.unit}`}>Unit</th>
                <th className={`px-2 py-1 font-medium ${COL_WIDTHS.phone}`}>Phone Number</th>
                <th className={`px-2 py-1 font-medium ${COL_WIDTHS.leaseStart}`}>Lease Start</th>
                <th className={`px-2 py-1 font-medium ${COL_WIDTHS.leaseEnd}`}>Lease End</th>
                <th className={`px-2 py-1 font-medium ${COL_WIDTHS.status}`}>Status</th>
                <th className={`px-2 py-1 rounded-tr-sm ${COL_WIDTHS.kebab}`} />
              </tr>
            </thead>
            <tbody>
              {TENANTS.map((t) => (
                <tr key={t.id} className="border-t border-[#e5e4e7] hover:bg-[#f5f8fa]">
                  {selectionMode && (
                    <td className="px-3 py-2">
                      <input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggleOne(t.id)} />
                    </td>
                  )}
                  <td className="px-3 py-2 text-[#13314c]">{t.name}</td>
                  <td className="px-3 py-2 text-[#616466] truncate">{t.property}</td>
                  <td className="px-3 py-2 text-[#616466]">{t.unit}</td>
                  <td className="px-3 py-2 text-[#616466]">
                    <span className="inline-flex items-center gap-1.5">
                      {selectionMode && PHONE_STATUS_ICON[t.phoneStatus] && (
                        <img src={PHONE_STATUS_ICON[t.phoneStatus]} alt="" className="size-5 shrink-0" />
                      )}
                      {t.phone}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[#616466]">{t.leaseStart}</td>
                  <td className="px-3 py-2 text-[#616466]">{t.leaseEnd}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs ${
                        t.status === 'Current' ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      &#9679; {t.status}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <button className="flex items-center justify-center w-full">
                      <KebabIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#8a8f98] text-right">
          {TENANTS.length} of {TENANTS.length} Tenants
        </p>
      </div>

      {selectionMode && selected.length > 0 && step === 'register' && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#008dd5] text-white flex items-center justify-between px-6 py-3">
          <span>{selected.length} Tenants Selected</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep('template')}
              className="bg-white text-[#008dd5] text-sm h-9 px-4 rounded font-medium"
            >
              Send Text
            </button>
            <button
              onClick={() => {
                setSelected([])
                setSelectionMode(false)
              }}
              className="text-white text-xl leading-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {step === 'template' && (
        <TemplatePickerModal
          onClose={() => setStep('register')}
          onPick={(row) => {
            setTemplate(row)
            setStep('composer')
          }}
        />
      )}

      {(step === 'composer' || step === 'override') && (
        <BulkTextComposerModal
          selectedIds={selected}
          initialMessage={template?.messageText ?? template?.description ?? ''}
          initialIsPromotional={template?.promotional === true}
          isNewText={template === null}
          onClose={() => setStep('register')}
          onNext={handleComposerNext}
        />
      )}

      {step === 'override' && composerResult && (
        <OverrideOptedOutDialog
          optedOutCount={composerResult.optedOutRecipients.length}
          onClose={() => setStep('composer')}
          onContinue={(mode) => {
            const optedOutIds = composerResult.optedOutRecipients.map((t) => t.id)
            const recipientIds =
              mode === 'opted-in-only'
                ? composerResult.checkedIds.filter((id) => !optedOutIds.includes(id))
                : [...new Set([...composerResult.checkedIds, ...optedOutIds])]
            setPreviewRecipientIds(recipientIds)
            setStep('preview')
          }}
        />
      )}

      {step === 'preview' && composerResult && (
        <BulkTextPreviewModal
          recipients={TENANTS.filter((t) => previewRecipientIds.includes(t.id))}
          message={composerResult.message}
          onBack={() => setStep('override')}
          onCancel={() => setStep('register')}
          onSendAll={() => finishSend(previewRecipientIds, previewRecipientIds.length)}
        />
      )}

      {step === 'sent' && sentSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded w-full max-w-[420px] shadow-xl p-6 flex flex-col items-center gap-3 text-center">
            <span className="text-green-600 text-3xl">&#10003;</span>
            <h2 className="text-lg text-[#13314c] font-medium">Text sent</h2>
            <p className="text-sm text-[#616466]">
              Sent to {sentSummary.count} of {selected.length} selected tenants
              {sentSummary.count < selected.length
                ? ` — ${selected.length - sentSummary.count} were skipped for being opted out.`
                : '.'}
            </p>
            <button onClick={reset} className="h-9 px-4 rounded bg-[#1a64bc] text-white text-sm mt-2">
              Back to Tenants
            </button>
          </div>
        </div>
      )}
    </RegisterShell>
  )
}
