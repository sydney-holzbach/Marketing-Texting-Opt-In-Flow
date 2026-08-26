import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/shell/AppHeader.jsx'
import iconInfo from '../assets/icon-info.svg'
import iconHelp from '../assets/icon-help.svg'
import iconSearch from '../assets/icon-search.svg'
import iconAutorenew from '../assets/icon-autorenew.svg'
import iconMenu from '../assets/icon-menu.svg'
import iconReports from '../assets/icon-reports.svg'
import iconGrade from '../assets/icon-grade.svg'
import iconPrint from '../assets/icon-print.svg'

function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3z" />
    </svg>
  )
}

function ApartmentIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6 2h12v20H6zM8 5v2h2V5zm4 0v2h2V5zM8 9v2h2V9zm4 0v2h2V9zm-4 4v2h2v-2zm4 0v2h2v-2zm-4 4v4h2v-4zm4 0v4h2v-4z" />
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

function KebabIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
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

function TileHeader({ title, borderColorClass, actions }) {
  return (
    <div className={`flex items-center justify-between px-3 h-9 border-b-2 ${borderColorClass} shrink-0`}>
      <p className="text-sm font-semibold text-[#13314c]">{title}</p>
      <div className="flex items-center gap-4">
        {actions}
        <OpenInNewIcon className="size-5 text-[#008dd5]" />
      </div>
    </div>
  )
}

function Field({ label, value, link }) {
  return (
    <div className="flex flex-col gap-1 min-h-9">
      <span className="text-sm text-[#666]">{label}</span>
      {value && (
        <span className={`text-sm ${link ? 'text-[#008dd5] font-semibold' : 'text-[#13314c] font-semibold'}`}>
          {value}
        </span>
      )}
    </div>
  )
}

const HISTORY_ROWS = [
  { date: '02/25/2026', type: 'Lease Renewal Offer', note: 'Lease Renewal Offer: Offer Declined' },
  { date: '02/25/2026', type: 'Survey', note: 'Survey Self Inspection: Inspection Sent to…' },
  { date: '02/25/2026', type: 'Text Message', note: 'The signable document for tenant is waiti…' },
  { date: '02/25/2026', type: 'Service Issue', note: 'Tenant added to Ticket #471 in Service M…' },
  { date: '02/25/2026', type: 'Email', note: 'Unit Inspection has been completed' },
  { date: '02/25/2026', type: 'Text Messages', note: 'The signable document for Tenant is wait…' },
]

const TRANSACTION_ROWS = [
  { date: '03/01/2026', type: 'Water Utility', amount: '40.00', balance: '44,061.00' },
  { date: '03/01/2026', type: 'Rent Charge', amount: '1,170.00', balance: '44,021.00' },
  { date: '03/01/2026', type: 'Electric Utility', amount: '200.00', balance: '42,851.00' },
  { date: '03/01/2026', type: 'Condominium Fee', amount: '100.00', balance: '42,651.00' },
]

const RECURRING_CHARGE_ROWS = [
  { bar: '#008dd5', scope: 'Property', chargeType: 'CONDO', comment: '', fromDate: '01/01/2026', amount: '100.00' },
  { bar: '#008dd5', scope: 'Property', chargeType: 'ELECT', comment: '', fromDate: '01/01/2026', amount: '200.00' },
  { bar: '#b3b3b3', scope: 'Tenant', chargeType: 'RC', comment: '', fromDate: '01/01/2026', amount: '1,170.00' },
  {
    bar: '#008dd5',
    scope: 'Property',
    chargeType: 'H2O',
    comment: '(Calculated Value)',
    fromDate: '01/01/2026',
    amount: '40.00',
  },
]

function RegisterTable({ columns, rows, renderRow }) {
  return (
    <div className="border border-[#cedbe7] rounded overflow-hidden w-full">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="bg-white border-b border-[#cedbe7]">
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-3 py-2 font-medium text-xs tracking-[1.134px] text-[#13314c] ${col.width ?? ''} ${
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

export default function TenantProfile() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <div className="bg-[#008dd5] flex h-10 items-center gap-3 px-4 w-full shrink-0">
        <button onClick={() => navigate('/')} className="text-white/90 hover:text-white text-lg leading-none">
          &lsaquo;&lsaquo;
        </button>
        <span className="text-white text-lg">Tenants</span>
        <div className="bg-[#425a70] flex gap-2 h-8 items-center px-2 rounded w-[248px]">
          <img src={iconSearch} alt="" className="size-4 opacity-80" />
          <span className="text-white text-sm truncate">Charlie Apegian</span>
        </div>
        <div className="flex items-center gap-2 text-white text-sm shrink-0">
          <span>&lsaquo;</span>
          <span>125 of 255</span>
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
          <div className="bg-white border border-[#cedbe7] rounded shadow-sm flex overflow-hidden">
            <div className="bg-[#425a70] w-4 shrink-0" />
            <div className="flex-1 min-w-0 flex items-center justify-between p-4 flex-wrap gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-8 flex-wrap">
                  <span className="text-base font-semibold text-[#13314c]">Charlie Apegian</span>
                  <span className="italic text-base text-[#13314c]">Account #: 516</span>
                  <span className="inline-flex items-center gap-2 bg-[#e2f1da] text-[#13314c] text-sm rounded px-2 h-8">
                    <span className="size-2 rounded-full bg-[#4c9a2a]" />
                    Current
                  </span>
                </div>
                <div className="flex items-center gap-8 flex-wrap text-sm text-[#13314c]">
                  <span className="flex items-center gap-2">
                    <HomeIcon className="size-5 text-[#008dd5]" />
                    Riverview Apartments
                  </span>
                  <span className="flex items-center gap-2">
                    <ApartmentIcon className="size-5 text-[#008dd5]" />
                    1B
                  </span>
                  <span className="flex items-center gap-2">
                    <MailIcon className="size-5 text-[#008dd5]" />
                    capegian@lcs.com
                  </span>
                  <span className="flex items-center gap-2">
                    <PhoneIcon className="size-5 text-[#008dd5]" />
                    513-555-1235
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex flex-col gap-2 items-end text-sm text-[#13314c]">
                  <span>
                    Balance Due: <span className="inline-block w-20 text-right font-medium">0.00</span>
                  </span>
                  <span>
                    Security Deposit: <span className="inline-block w-20 text-right font-medium">1,170.00</span>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-[#008dd5] text-white text-sm h-9 rounded flex items-center">
                    <span className="px-3">Add Charge</span>
                    <span className="border-l border-white/60 px-2 flex items-center">
                      <ChevronDownIcon className="size-4" />
                    </span>
                  </button>
                  <button className="bg-[#008dd5] text-white text-sm h-9 rounded flex items-center">
                    <span className="px-3">Refund Deposit</span>
                    <span className="border-l border-white/60 px-2 flex items-center">
                      <ChevronDownIcon className="size-4" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 border-b border-[#cedbe7]">
            <button className="text-sm text-[#13314c] font-medium pb-2 border-b-2 border-[#f58220]">
              Tenant Standard Layout
            </button>
            <button className="text-sm text-[#666] pb-2">Alternate Layout</button>
          </div>

          <div className="border border-[#008dd5] rounded flex items-center gap-2 px-3 h-10 bg-white">
            <img src={iconInfo} alt="" className="size-5" />
            <span className="text-sm text-[#666]">Single-Line</span>
          </div>

          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader
                title="Leases"
                borderColorClass="border-[#f58220]"
                actions={
                  <>
                    <button className="text-sm text-[#008dd5]">Move Out</button>
                    <button className="text-sm text-[#008dd5]">Renew</button>
                    <KebabIcon className="size-4 text-[#008dd5]" />
                  </>
                }
              />
              <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Property" value="RIVER" link />
                <Field label="Lease Start" value="01/01/2026" />
                <Field label="Unit" value="27" link />
                <Field label="Move In" value="01/01/2026" />
                <Field label="Lease Terms" value="12 Months" />
                <Field label="Notice" />
                <Field label="Lease End" value="12/31/2026" />
                <Field label="Move Out" />
                <Field label="Lease Sign" />
                <Field label="Expected MO" />
              </div>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader
                title="Contacts"
                borderColorClass="border-[#008dd5]"
                actions={<button className="text-sm text-[#008dd5]">Add Contact</button>}
              />
              <div className="p-3 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="bg-[#008dd5] text-white rounded-full size-10 flex items-center justify-center text-sm font-semibold shrink-0">
                      CA
                    </span>
                    <span className="text-base font-semibold text-[#13314c]">Charlie Apegian</span>
                    <span className="italic text-sm text-[#13314c]">(Primary)</span>
                  </div>
                  <span className="flex items-center gap-2 text-sm text-[#13314c] shrink-0">
                    <PhoneIcon className="size-4 text-[#008dd5]" />
                    (555) 123-4567
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#13314c]">Additional Information</span>
                  <div className="border border-[#cedbe7] rounded p-3 flex flex-col gap-1 w-fit">
                    <span className="text-sm text-[#666]">License</span>
                    <span className="text-sm font-semibold text-[#13314c]">UA951830</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
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
                  { label: 'Date', width: 'w-[26%]' },
                  { label: 'Type', width: 'w-[30%]' },
                  { label: 'Note', width: 'w-[44%]' },
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

          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader
                title="Transactions"
                borderColorClass="border-[#a8d48f]"
                actions={
                  <>
                    <button className="text-sm text-[#008dd5]">Add Payment</button>
                    <button className="text-sm text-[#008dd5]">Add Charge</button>
                  </>
                }
              />
              <RegisterTable
                columns={[
                  { label: 'Date', width: 'w-[22%]' },
                  { label: 'Type', width: 'w-[34%]' },
                  { label: 'Type', width: 'w-[20%]', align: 'right' },
                  { label: 'Note', width: 'w-[24%]', align: 'right' },
                ]}
                rows={TRANSACTION_ROWS}
                renderRow={(row, i) => (
                  <tr key={i} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                    <td className="px-3 py-2 text-[#13314c]">{row.date}</td>
                    <td className="px-3 py-2 text-[#13314c] truncate">{row.type}</td>
                    <td className="px-3 py-2 text-[#13314c] text-right">{row.amount}</td>
                    <td className="px-3 py-2 text-[#13314c] text-right">{row.balance}</td>
                  </tr>
                )}
              />
            </div>

            <div className="bg-white border border-[#cedbe7] rounded overflow-hidden flex flex-col">
              <TileHeader
                title="Recurring Charges"
                borderColorClass="border-[#f58220]"
                actions={
                  <>
                    <button className="text-sm text-[#008dd5]">Add Charge</button>
                    <button className="text-sm text-[#008dd5]">Add CRE</button>
                  </>
                }
              />
              <RegisterTable
                columns={[
                  { label: '', width: 'w-[3%]' },
                  { label: '', width: 'w-[13%]' },
                  { label: 'Charge Type', width: 'w-[17%]' },
                  { label: 'Comment', width: 'w-[27%]' },
                  { label: 'Frequency', width: 'w-[12%]', align: 'right' },
                  { label: 'From Date', width: 'w-[14%]' },
                  { label: 'Amount', width: 'w-[14%]', align: 'right' },
                ]}
                rows={RECURRING_CHARGE_ROWS}
                renderRow={(row, i) => (
                  <tr key={i} className={i % 2 ? 'bg-[#f5f8fa]' : 'bg-white'}>
                    <td className="px-1 py-2">
                      <span className="block h-5 w-2.5" style={{ backgroundColor: row.bar }} />
                    </td>
                    <td className="px-3 py-2 text-[#13314c] truncate">{row.scope}</td>
                    <td className="px-3 py-2 text-[#13314c] truncate">{row.chargeType}</td>
                    <td className="px-3 py-2 text-[#13314c] truncate">{row.comment}</td>
                    <td className="px-3 py-2 text-[#13314c] text-right">1</td>
                    <td className="px-3 py-2 text-[#13314c]">{row.fromDate}</td>
                    <td className="px-3 py-2 text-[#13314c] text-right">{row.amount}</td>
                  </tr>
                )}
              />
              <div className="bg-[#f5f8fa] px-4 py-2 flex items-center justify-end gap-2 text-xs text-[#666]">
                <span className="font-semibold">4 of 4 Recurring Charges</span>
                <span>$1,510</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#13314c] w-10 shrink-0 flex flex-col items-center gap-6 py-4">
          <img src={iconMenu} alt="" className="size-5 opacity-80" />
          <img src={iconReports} alt="" className="size-5 opacity-80" />
          <img src={iconGrade} alt="" className="size-5 opacity-80" />
          <img src={iconPrint} alt="" className="size-5 opacity-80" />
          <MailIcon className="size-5 text-white/80" />
        </div>
      </div>
    </div>
  )
}
