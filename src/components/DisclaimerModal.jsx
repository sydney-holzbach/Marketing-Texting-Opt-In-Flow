import { usePreferences } from '../state/PreferencesContext.jsx'
import closeIcon from '../assets/icon-close.svg'

export default function DisclaimerModal({ onClose }) {
  const { preferences } = usePreferences()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[668px] shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#cedbe7]">
          <h2 className="text-xl text-[#13314c]">Texting Consent Disclaimer</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={closeIcon} alt="" className="size-6" />
          </button>
        </div>
        <div className="px-4 py-4 flex flex-col gap-4 text-sm text-[#13314c] text-left">
          <p>
            The following texting disclaimer will show in applicable areas where a phone number may be entered:
          </p>
          <p>
            By checking the checkbox and providing your phone number, you agree to receive automated text
            messages from {preferences.companyName} regarding all the information indicated above. Reply STOP
            to opt-out or HELP for more information at any time. Message and data rates may apply. Message
            frequency will vary. Consent to receive text messages is not a condition of purchase or of any
            service. For more information, please read our{' '}
            <a href={preferences.privacyPolicyUrl} target="_blank" rel="noreferrer" className="text-[#008dd5] underline">
              privacy policy
            </a>{' '}
            and{' '}
            <a href={preferences.termsOfServiceUrl} target="_blank" rel="noreferrer" className="text-[#008dd5] underline">
              terms of service
            </a>
            .
          </p>
        </div>
        <div className="flex justify-end gap-4 px-4 py-2 bg-[#f5f8fa] border-t border-[#cedbe7] rounded-b">
          <button
            onClick={onClose}
            className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded hover:bg-[#0077b6]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
