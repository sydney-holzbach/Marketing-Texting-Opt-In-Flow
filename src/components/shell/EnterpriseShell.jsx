import AppHeader from './AppHeader.jsx'
import ContextBar from './ContextBar.jsx'
import Sidebar from './Sidebar.jsx'

export default function EnterpriseShell({ title, onBack, children }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <ContextBar title={title} onBack={onBack} />
      <div className="flex flex-1 min-h-0 w-full">
        <Sidebar />
        <div className="flex-1 min-w-0 overflow-y-auto bg-[#f2f2f2]">{children}</div>
      </div>
    </div>
  )
}
