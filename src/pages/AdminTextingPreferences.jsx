import { useState } from 'react'
import { Link } from 'react-router-dom'
import EnterpriseShell from '../components/shell/EnterpriseShell.jsx'
import { usePreferences } from '../state/PreferencesContext.jsx'
import DisclaimerModal from '../components/DisclaimerModal.jsx'
import iconInfo from '../assets/icon-info.svg'
import iconCheckAction from '../assets/icon-check-action.svg'

function RadioRow({ label, active, onSelect }) {
  return (
    <button onClick={onSelect} className="flex gap-2 items-center text-left">
      <span
        className={`size-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
          active ? 'border-[#008dd5]' : 'border-[#b3b3b3]'
        }`}
      >
        {active && <span className="size-2.5 rounded-full bg-[#008dd5]" />}
      </span>
      <span className="text-sm text-[#666]">{label}</span>
    </button>
  )
}

export default function AdminTextingPreferences() {
  const { preferences, updatePreferences } = usePreferences()
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  return (
    <EnterpriseShell title="System Preferences: Phone Broadcast/Texting - Texting">
      <div className="p-6 flex flex-col gap-4 items-start">
        <div className="flex flex-col gap-1 w-[646px]">
          <p className="text-sm font-semibold text-[#13314c]">Which text numbers should be used for broadcasts?</p>
          <div className="bg-white border border-[#cedbe7] rounded p-4 flex flex-col gap-4">
            <RadioRow
              label="Use text numbers assigned to the property first, then use broadcast text numbers"
              active={preferences.broadcastNumberRule === 'property-first'}
              onSelect={() => updatePreferences({ broadcastNumberRule: 'property-first' })}
            />
            <RadioRow
              label="Use any broadcast text numbers"
              active={preferences.broadcastNumberRule === 'any'}
              onSelect={() => updatePreferences({ broadcastNumberRule: 'any' })}
            />
            <RadioRow
              label="Use only text numbers assigned to the property"
              active={preferences.broadcastNumberRule === 'property-only'}
              onSelect={() => updatePreferences({ broadcastNumberRule: 'property-only' })}
            />
          </div>
        </div>

        <div className="bg-white border border-[#cedbe7] rounded p-4 flex flex-col gap-4 w-[646px]">
          <div className="relative flex items-center gap-2">
            <button onClick={() => updatePreferences({ showInformationalDisclaimer: !preferences.showInformationalDisclaimer })}>
              <img src={iconCheckAction} alt="" className={`size-5 ${preferences.showInformationalDisclaimer ? '' : 'opacity-30 grayscale'}`} />
            </button>
            <span className="text-sm text-[#666]">Show informational texting opt-in consent disclaimer</span>
            <button onClick={() => setShowDisclaimer(true)} aria-label="View texting consent disclaimer">
              <img src={iconInfo} alt="" className="size-5" />
            </button>
          </div>

          <div className="relative flex items-center gap-2">
            <button onClick={() => updatePreferences({ showPromotionalDisclaimer: !preferences.showPromotionalDisclaimer })}>
              <img src={iconCheckAction} alt="" className={`size-5 ${preferences.showPromotionalDisclaimer ? '' : 'opacity-30 grayscale'}`} />
            </button>
            <span className="text-sm text-[#666]">Show promotional texting opt-in consent disclaimer</span>
            <button onClick={() => setShowDisclaimer(true)} aria-label="View texting consent disclaimer">
              <img src={iconInfo} alt="" className="size-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4 pl-7">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#666]">Company Name</label>
              <input
                value={preferences.companyName}
                onChange={(e) => updatePreferences({ companyName: e.target.value })}
                className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c]"
              />
              <span className="text-sm text-[#666]">Note: Company name should match your registered company brand.</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#666]">Privacy Policy URL</label>
              <input
                value={preferences.privacyPolicyUrl}
                onChange={(e) => updatePreferences({ privacyPolicyUrl: e.target.value })}
                className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#666]">Terms of Service URL</label>
              <input
                value={preferences.termsOfServiceUrl}
                onChange={(e) => updatePreferences({ termsOfServiceUrl: e.target.value })}
                className="h-9 rounded border border-[#cedbe7] bg-[#f5f8fa] px-2 text-sm text-[#13314c]"
              />
            </div>
          </div>

          <button onClick={() => setShowDisclaimer(true)} className="text-sm text-[#008dd5] text-left hover:underline">
            View Joint Texting Consent Disclaimer
          </button>
        </div>

        <p className="text-xs text-[#616466] max-w-[646px]">
          Try it: toggle a disclaimer off above, then go to{' '}
          <Link to="/signup" className="text-[#008dd5] underline">
            the resident sign-up page
          </Link>{' '}
          — that consent checkbox disappears from the form entirely. "View Joint Texting Consent Disclaimer" always
          shows the combined legal text residents agree to.
        </p>
      </div>

      {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}
    </EnterpriseShell>
  )
}
