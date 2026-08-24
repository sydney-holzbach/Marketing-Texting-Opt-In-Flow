import { Link, useParams } from 'react-router-dom'
import AppHeader from './AppHeader.jsx'
import { TEMPLATE_FOLDERS } from '../../data/templateFolders.js'

export default function TemplatesShell({ children }) {
  const { folderSlug } = useParams()

  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <div className="bg-[#008dd5] flex h-10 items-center justify-between px-4 w-full shrink-0">
        <span className="text-white text-lg">Text Templates: Tenants</span>
        <div className="flex items-center gap-3 text-white text-sm">
          <span className="hover:underline cursor-pointer">Letter / Email Template Register &rarr;</span>
        </div>
      </div>
      <div className="flex flex-1 min-h-0 w-full">
        <nav className="bg-white border-r border-[#cedbe7] w-[250px] h-full overflow-y-auto shrink-0 p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#616466]">Type</span>
            <div className="h-8 border border-[#cedbe7] rounded flex items-center px-2 text-sm text-[#13314c]">
              Tenant
            </div>
          </div>
          <input
            placeholder="Search folders"
            className="h-8 border border-[#cedbe7] rounded px-2 text-sm outline-none focus:border-[#008dd5]"
          />
          <div className="flex flex-col">
            {TEMPLATE_FOLDERS.map((folder) => {
              const active = folder.slug === folderSlug
              return (
                <Link
                  key={folder.slug}
                  to={`/templates/${folder.slug}`}
                  className={`text-sm px-2 py-1.5 rounded ${
                    active ? 'bg-[#e5f3fc] text-[#008dd5] font-medium' : 'text-[#13314c] hover:bg-[#f5f8fa]'
                  }`}
                >
                  {folder.label}
                </Link>
              )
            })}
          </div>
        </nav>
        <div className="flex-1 min-w-0 overflow-y-auto bg-[#f2f2f2] p-4">{children}</div>
      </div>
    </div>
  )
}
