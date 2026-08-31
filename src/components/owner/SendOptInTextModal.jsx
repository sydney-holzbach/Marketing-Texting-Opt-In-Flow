import { usePreferences } from '../../state/PreferencesContext.jsx'
import iconClose from '../../assets/icon-close.svg'

export default function SendOptInTextModal({ phoneNumber, onClose, onSend }) {
  const { preferences } = usePreferences()

  const defaultMessage = `${preferences.companyName}: Reply START to receive automated text messages regarding community news, urgent notifications and events at this number. No purchase necessary. Reply STOP to opt out.`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white border border-[#cedbe7] rounded w-full max-w-[540px] shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#cedbe7]">
          <h2 className="text-xl text-[#13314c]">Send Opt-in text</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={iconClose} alt="" className="size-6" />
          </button>
        </div>

        <div className="px-4 pt-6 pb-4 flex flex-col gap-4">
          <p className="text-sm text-[#666] leading-5">
            The phone number <span className="font-semibold">{phoneNumber}</span> is currently opted out of
            texting. Would you like to send an opt-in message to this number?
          </p>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#666]">Message</label>
            <textarea
              defaultValue={defaultMessage}
              rows={4}
              className="w-full rounded border border-[#cedbe7] bg-[#f5f8fa] p-2 text-sm text-[#b3b3b3] outline-none resize-none focus:text-[#13314c]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 bg-[#f5f8fa] border-t border-[#cedbe7] rounded-b">
          <button
            onClick={onSend}
            className="bg-[#008dd5] text-white text-sm h-9 px-3 rounded hover:bg-[#0077b6]"
          >
            Send Text
          </button>
          <button onClick={onClose} className="h-9 px-3 rounded border border-[#008dd5] text-[#008dd5] text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
