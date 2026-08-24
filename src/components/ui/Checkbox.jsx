export default function Checkbox({ checked, onChange, label, className = '', labelClassName = '' }) {
  return (
    <label className={`flex gap-2 items-start cursor-pointer select-none ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 size-5 shrink-0 rounded-sm border-2 border-[#dbe1e5] text-[#1a64bc] accent-[#1a64bc]"
      />
      <span className={`text-sm text-[#616466] leading-5 ${labelClassName}`}>{label}</span>
    </label>
  )
}
