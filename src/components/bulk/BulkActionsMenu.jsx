function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-[#1a64bc]">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="size-3 fill-[#1a64bc]">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

const GROUPS = [
  {
    heading: 'History / Note',
    items: [{ label: 'Add to History', submenu: true }],
  },
  {
    heading: 'Service Manager',
    items: [{ label: 'Add Issue' }],
  },
  {
    heading: 'Financial',
    items: [{ label: 'Add Charge' }],
  },
  {
    heading: 'Inspections',
    items: [{ label: 'Add Management Inspection' }, { label: 'Add Tenant Self-Inspection' }],
  },
  {
    heading: 'Evictions',
    items: [{ label: 'Start Eviction Process' }],
  },
  {
    heading: 'Account Groups',
    items: [{ label: 'Add Account Group' }],
  },
  {
    heading: 'Communication',
    items: [
      { label: 'Write Letters' },
      { label: 'Send Email' },
      { label: 'Publish Signable Documents' },
      { label: 'Send Text', action: 'send-text' },
      { label: 'Add to Phone Broadcasts' },
      { label: 'Send Surveys' },
    ],
  },
]

export default function BulkActionsMenu({ onClose, onSendText }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full left-0 mt-1 w-[280px] bg-white rounded shadow-lg border border-[#e5e4e7] z-50 py-2 max-h-[420px] overflow-y-auto">
        <button
          onClick={onClose}
          className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#f5f8fa] text-left"
        >
          <span className="flex items-center gap-2 text-sm text-[#1a64bc]">
            <EditIcon />
            Mass Edit Mode
          </span>
          <span className="text-xs text-[#8a8f98]">F2</span>
        </button>
        <div className="h-px bg-[#e5e4e7] my-1" />

        {GROUPS.map((group) => (
          <div key={group.heading} className="px-4 py-1">
            <p className="text-sm font-semibold text-[#13314c] mt-1 mb-1">{group.heading}</p>
            {group.items.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.action === 'send-text') onSendText()
                  else onClose()
                }}
                className="w-full flex items-center justify-between py-1.5 text-left text-sm text-[#1a64bc] hover:underline"
              >
                {item.label}
                {item.submenu && <ArrowRight />}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
