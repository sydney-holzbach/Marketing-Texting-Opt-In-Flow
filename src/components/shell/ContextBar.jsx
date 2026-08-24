import { useNavigate } from 'react-router-dom'
import iconHelp from '../../assets/icon-help.svg'

export default function ContextBar({ title, onBack }) {
  const navigate = useNavigate()
  return (
    <div className="bg-[#008dd5] flex h-10 items-center justify-between px-4 w-full shrink-0">
      <div className="flex items-center gap-2">
        <button onClick={onBack ?? (() => navigate(-1))} className="text-white/90 hover:text-white text-lg leading-none">
          &lsaquo;&lsaquo;
        </button>
        <span className="text-white text-lg">{title}</span>
      </div>
      <img src={iconHelp} alt="" className="size-5" />
    </div>
  )
}
