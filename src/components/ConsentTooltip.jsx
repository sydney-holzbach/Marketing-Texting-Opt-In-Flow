import informationalMock from '../assets/mock-informational-consent.png'
import promotionalMock from '../assets/mock-promotional-consent.png'

const COPY = {
  informational: {
    title: 'Informational Texting Consent Disclaimer',
    description:
      'The following texting disclaimer will show in applicable areas where a phone number may be entered: "I agree to receive automated text messages regarding lease info, maintenance, billing & community events."',
    image: informationalMock,
  },
  promotional: {
    title: 'Promotional Texting Consent Disclaimer',
    description:
      'The following texting disclaimer will show in applicable areas where a phone number may be entered: "I agree to receive automated text messages regarding property specials & promotions."',
    image: promotionalMock,
  },
}

export default function ConsentTooltip({ variant, className = '' }) {
  const copy = COPY[variant]
  return (
    <div
      className={`w-[394px] rounded bg-white shadow-[0_4px_5px_rgba(76,76,76,0.1),1px_2px_6px_rgba(76,76,76,0.1)] px-5 py-4 flex flex-col gap-3 text-left ${className}`}
    >
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-base text-[#666]">{copy.title}</p>
        <p className="text-sm text-[#616466] leading-5">{copy.description}</p>
      </div>
      <img src={copy.image} alt="" className="w-full rounded border border-[#e5e4e7]" />
    </div>
  )
}
