import chevronDown from '../../assets/chevron-down-2.svg'

export default function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full border border-[#a8d4f5] bg-[#eaf5fd] text-[#1a64bc] text-xs px-2 py-0.5">
      {children}
      <img src={chevronDown} alt="" className="size-3.5" />
    </span>
  )
}
