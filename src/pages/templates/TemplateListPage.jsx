import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TemplatesShell from '../../components/shell/TemplatesShell.jsx'
import Pill from '../../components/ui/Pill.jsx'
import TemplateDetailsModal from '../../components/templates/TemplateDetailsModal.jsx'
import SelectTemplateTypeModal from '../../components/templates/SelectTemplateTypeModal.jsx'
import { TEMPLATE_DATA, TEMPLATE_FOLDERS } from '../../data/templateFolders.js'

const NEW_TEMPLATE_DEFAULTS = {
  'renewal-retention': {
    name: 'Renewal Offer - Rate Discount',
    messageText:
      "Hi [Tenant.FirstName()], your lease at [Property.Name()] is coming up for renewal on [Lease.EndDate()]. Renew now and lock in [X]% off your new rate — plus we'll waive the renewal admin fee if you sign by [Deadline.Date()]. Reply YES or call us at [PhoneNumber()] to get started. We'd love to have you stay!",
    promotional: true,
    users: { extra: 4 },
    category: 'Renewals',
    description:
      'Text sent with a renewal offer with discount incentive, sent to tenants approaching lease end date. Used for retention campaigns.',
  },
}

function blankTemplate(folderLabel) {
  return {
    name: '',
    messageText: '',
    promotional: false,
    users: undefined,
    category: '',
    description: '',
    _folderLabel: folderLabel,
  }
}

const COLUMN_WIDTHS = {
  Name: 'w-[22%]',
  Description: 'w-[44%]',
  Users: 'w-[22%]',
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

function ReorderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-[#1a64bc]">
      <path d="M7 10l5-5 5 5H7z" />
      <path d="M7 14l5 5 5-5H7z" />
    </svg>
  )
}

function ColumnsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-white">
      <rect x="3" y="5" width="5" height="14" />
      <rect x="9.5" y="5" width="5" height="14" />
      <rect x="16" y="5" width="5" height="14" />
    </svg>
  )
}

export default function TemplateListPage() {
  const { folderSlug } = useParams()
  const folder = TEMPLATE_FOLDERS.find((f) => f.slug === folderSlug)
  const data = TEMPLATE_DATA[folderSlug]
  const columns = data?.columns ?? ['Name', 'Description', 'Users']
  const [rows, setRows] = useState(data?.rows ?? [])
  const [openTemplate, setOpenTemplate] = useState(null)
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [newTemplate, setNewTemplate] = useState(null)

  useEffect(() => {
    setRows(TEMPLATE_DATA[folderSlug]?.rows ?? [])
  }, [folderSlug])

  function usersFromModal(saved) {
    if (saved.users?.primary === 'All Selected') return { primary: 'All Selected' }
    const count = saved.users ? 1 + (saved.users.extra ?? 0) : 0
    return { primary: count > 0 ? `${count} Selected` : 'No users selected' }
  }

  function handleSaveNewTemplate(saved) {
    setRows((prev) => [
      ...prev,
      {
        name: saved.name || 'Untitled Template',
        description: saved.description,
        messageText: saved.messageText,
        promotional: saved.promotional,
        category: saved.category,
        users: usersFromModal(saved),
      },
    ])
    setNewTemplate(null)
  }

  function handleSaveExistingTemplate(saved) {
    setRows((prev) => prev.map((r) => (r === openTemplate ? { ...r, ...saved } : r)))
    setOpenTemplate(null)
  }

  return (
    <TemplatesShell>
      <div className="flex items-center gap-3 mb-3">
        <button className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded flex items-center gap-1">
          Bulk Actions <span className="text-xs">&#9662;</span>
        </button>
        <input
          placeholder="Search text templates"
          className="h-9 flex-1 max-w-xs border border-[#cedbe7] rounded px-3 text-sm outline-none focus:border-[#008dd5] bg-white"
        />
        <div className="flex-1" />
        <button
          onClick={() => setShowTypeModal(true)}
          className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded flex items-center gap-1"
        >
          + Add Template
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#008dd5]">&#128193;</span>
        <h2 className="text-[#13314c] font-medium">{folder?.label ?? folderSlug}</h2>
      </div>

      <div className="bg-white border border-[#cedbe7] rounded overflow-hidden w-full">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="bg-[#737373] text-white text-left font-medium text-xs tracking-[1.134px]">
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={`px-2 py-1 font-medium ${COLUMN_WIDTHS[col] ?? ''} ${i === 0 ? 'rounded-tl-sm' : ''}`}
                >
                  {col}
                </th>
              ))}
              <th className="w-[6%] px-2 py-1" />
              <th className="w-[6%] px-2 py-1 rounded-tr-sm">
                <ColumnsIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="px-3 py-6 text-center text-[#8a8f98]">
                  No text templates in this folder yet.
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr
                key={`${row.name}-${i}`}
                onClick={() => setOpenTemplate(row)}
                className="border-t border-[#e5e4e7] hover:bg-[#f5f8fa] cursor-pointer"
              >
                <td className="px-3 py-2 text-[#13314c] font-medium">{row.name}</td>
                <td className="px-3 py-2 text-[#616466] truncate">{row.description}</td>
                <td className="px-3 py-2 text-[#13314c]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="truncate">{row.users.primary}</span>
                    {row.users.extra && <Pill>+{row.users.extra}</Pill>}
                  </span>
                </td>
                <td className="px-2 py-2" onClick={(e) => e.stopPropagation()}>
                  <button className="flex items-center justify-center w-full">
                    <KebabIcon />
                  </button>
                </td>
                <td className="px-2 py-2" onClick={(e) => e.stopPropagation()}>
                  <button className="flex items-center justify-center w-full">
                    <ReorderIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[#8a8f98] text-right mt-2">
        {rows.length} of {rows.length} Text Templates
      </p>

      {openTemplate && (
        <TemplateDetailsModal
          template={openTemplate}
          folderLabel={folder?.label ?? folderSlug}
          onClose={() => setOpenTemplate(null)}
          onSave={handleSaveExistingTemplate}
        />
      )}

      {showTypeModal && (
        <SelectTemplateTypeModal
          onClose={() => setShowTypeModal(false)}
          onConfirm={() => {
            setShowTypeModal(false)
            setNewTemplate(NEW_TEMPLATE_DEFAULTS[folderSlug] ?? blankTemplate(folder?.label ?? folderSlug))
          }}
        />
      )}

      {newTemplate && (
        <TemplateDetailsModal
          title="Add Text Template"
          template={newTemplate}
          folderLabel={newTemplate._folderLabel ?? folder?.label ?? folderSlug}
          onClose={() => setNewTemplate(null)}
          onSave={handleSaveNewTemplate}
        />
      )}
    </TemplatesShell>
  )
}
