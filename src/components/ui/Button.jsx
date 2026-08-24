export default function Button({ children, type = 'primary', className = '', ...rest }) {
  const base =
    'content-stretch flex h-[32px] items-center justify-center min-w-[100px] px-3 py-2 rounded-lg text-sm font-normal tracking-[0.28px] transition-colors'
  const variants = {
    primary: 'bg-[#1a64bc] text-white hover:bg-[#155399]',
    secondary: 'bg-white border border-[#1a64bc] text-[#1a64bc] hover:bg-[#f0f6fd]',
  }
  return (
    <button className={`${base} ${variants[type]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
