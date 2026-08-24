import AppHeader from './AppHeader.jsx'
import ContextBar from './ContextBar.jsx'

export default function RegisterShell({ title, onBack, children }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <ContextBar title={title} onBack={onBack} />
      <div className="flex-1 min-h-0 w-full overflow-y-auto bg-[#f2f2f2]">{children}</div>
    </div>
  )
}
