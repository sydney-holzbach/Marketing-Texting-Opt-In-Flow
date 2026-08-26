import { Link } from 'react-router-dom'

const LINKS = [
  {
    group: 'Opt-in flow',
    items: [
      { to: '/signup', label: 'Resident Portal Sign Up', desc: 'The consent checkboxes a resident actually sees.' },
      { to: '/admin/texting', label: 'Admin: Texting Preferences', desc: 'Toggle disclaimers, set company + policy links.' },
    ],
  },
  {
    group: 'Text templates',
    items: [
      { to: '/templates/renewal-retention', label: 'Renewal & Retention Offers', desc: 'Template list for renewal/retention texts.' },
      { to: '/templates/maintenance-repairs', label: 'Maintenance & Repairs', desc: 'Template list for maintenance texts.' },
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] py-10 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-2xl text-[#13314c] font-semibold">Texting: Marketing Opt-In — Prototype</h1>
          <p className="text-sm text-[#616466] mt-1">
            A connected walkthrough of the opt-in checkbox flow, admin controls, and text templates. Start with the
            two "Opt-in flow" screens — they're wired together live.
          </p>
        </div>

        {LINKS.map((group) => (
          <div key={group.group} className="flex flex-col gap-2">
            <h2 className="text-sm uppercase tracking-wide text-[#8a8f98] font-semibold">{group.group}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="bg-white border border-[#cedbe7] rounded-lg p-4 hover:border-[#008dd5] hover:shadow-sm transition-all"
                >
                  <p className="text-[#13314c] font-medium">{item.label}</p>
                  <p className="text-sm text-[#616466] mt-1">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
