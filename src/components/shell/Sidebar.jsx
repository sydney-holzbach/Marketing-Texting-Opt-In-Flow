import { Link, useLocation } from 'react-router-dom'

const SECTIONS = [
  { label: 'Screenings' },
  { label: 'Income Verification' },
  { label: 'Metro 2 Reporting' },
  {
    label: 'Virtual Post Office',
    children: [{ label: 'General' }, { label: 'Defaults' }, { label: 'Commercial' }, { label: 'rmVoIP' }],
  },
  {
    label: 'Phone Broadcast/Texting',
    children: [
      { label: 'Phone Broadcast' },
      { label: 'Texting', to: '/admin/texting' },
    ],
  },
  {
    label: 'Online Listings',
    children: [{ label: 'General' }, { label: 'Availability Filters' }, { label: 'Standard Fields' }],
  },
  {
    label: 'Blue Moon',
    children: [{ label: 'General' }, { label: 'Form & Field Setup' }],
  },
]

function Item({ item, depth }) {
  const location = useLocation()
  const active = item.to && location.pathname === item.to
  const pad = depth === 0 ? 'pl-4' : 'pl-8'

  if (!item.to) {
    return (
      <div className={`flex items-center h-12 ${pad} pr-4 text-white/90 text-base`}>{item.label}</div>
    )
  }

  return (
    <Link
      to={item.to}
      className={`flex items-center h-12 ${pad} pr-4 text-base transition-colors ${
        active ? 'bg-[#008dd5] text-white' : 'text-white/90 hover:bg-[#4d5a67]'
      }`}
    >
      {item.label}
    </Link>
  )
}

export default function Sidebar() {
  return (
    <nav className="bg-[#424e5b] w-[280px] h-full overflow-y-auto shrink-0">
      {SECTIONS.map((section) => (
        <div key={section.label}>
          <Item item={section} depth={0} />
          {section.children?.map((child) => (
            <Item key={child.label} item={child} depth={1} />
          ))}
        </div>
      ))}
    </nav>
  )
}
