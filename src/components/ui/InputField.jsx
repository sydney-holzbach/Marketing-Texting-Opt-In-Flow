export default function InputField({ label, required, value, onChange, placeholder, hint, ...rest }) {
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
      {label && (
        <span className="text-sm text-[#616466] tracking-[0.28px]">
          {label}
          {required ? '*' : ''}
        </span>
      )}
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full h-8 rounded-lg border border-[#dbe1e5] bg-white px-2 text-sm text-[#313233] outline-none focus:border-[#1a64bc]"
        {...rest}
      />
      {hint && <span className="text-xs text-[#747474]">{hint}</span>}
    </div>
  )
}
