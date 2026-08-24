import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import InputField from '../components/ui/InputField.jsx'
import { usePreferences } from '../state/PreferencesContext.jsx'
import rmrpBg from '../assets/rmrp-bg.svg'
import rmResidentLogo from '../assets/rmresident-logo.svg'
import chevronDown from '../assets/chevron-down.svg'
import infoOutline from '../assets/info-outline.svg'
import recaptchaLogo from '../assets/recaptcha-logo.svg'

export default function ResidentSignUp() {
  const { preferences } = usePreferences()
  const [form, setForm] = useState({ accountNumber: '', email: '', ssn: '', phone: '' })
  const [informational, setInformational] = useState(false)
  const [promotional, setPromotional] = useState(false)
  const [captcha, setCaptcha] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = form.accountNumber && form.email && captcha

  if (submitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-8 bg-[#eaf3fb] overflow-hidden">
        <img src={rmrpBg} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
        <div className="bg-white rounded-lg shadow-lg px-8 py-12 w-[584px] flex flex-col items-center gap-4 text-center">
          <img src={rmResidentLogo} alt="rmResident Portal" className="h-10" />
          <h1 className="text-xl text-[#313233]">You're signed up</h1>
          <p className="text-sm text-[#747474]">
            {informational && 'You will receive informational texts about lease info, maintenance, billing & community events. '}
            {promotional && 'You will receive promotional texts about property specials & promotions.'}
            {!informational && !promotional && 'No texting consent was selected — you can update this anytime in your account.'}
          </p>
          <Link to="/" className="text-sm text-[#1a64bc] underline">
            Back to prototype home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 bg-[#eaf3fb] overflow-hidden">
      <img src={rmrpBg} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />

      <div className="flex flex-col gap-4 items-center w-full">
        <div className="bg-white shadow-lg flex flex-col gap-12 items-center pb-8 pt-12 px-8 rounded-lg w-[584px]">
          <img src={rmResidentLogo} alt="rmResident Portal" className="h-10" />

          <div className="flex flex-col gap-2 items-start w-full">
            <div className="flex flex-col gap-6 items-center w-full">
              <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex flex-col gap-2 items-start w-full">
                  <p className="text-lg text-[#313233]">Account Information</p>
                  <p className="text-sm text-[#747474]">Enter the following to verify your personal information.</p>
                </div>

                <div className="flex flex-col gap-1 items-start w-full">
                  <span className="text-sm text-[#616466]">Location</span>
                  <div className="border border-[#dbe1e5] flex items-center justify-between h-8 px-2 rounded-lg w-full">
                    <span className="text-sm text-[#313233]">Default</span>
                    <img src={chevronDown} alt="" className="size-5" />
                  </div>
                </div>

                <div className="flex gap-4 items-start w-full">
                  <InputField
                    label="Account Number"
                    required
                    value={form.accountNumber}
                    onChange={(v) => setForm((f) => ({ ...f, accountNumber: v }))}
                  />
                  <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
                    <span className="text-sm text-[#616466] flex items-center gap-1">
                      Email Address*
                      <img src={infoOutline} alt="" className="size-5" />
                    </span>
                    <input
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full h-8 rounded-lg border border-[#dbe1e5] bg-white px-2 text-sm text-[#313233] outline-none focus:border-[#1a64bc]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 items-start w-full">
                  <InputField
                    label="Last 4 Digits of SSN"
                    value={form.ssn}
                    onChange={(v) => setForm((f) => ({ ...f, ssn: v }))}
                  />
                  <InputField
                    label="Phone Number"
                    value={form.phone}
                    onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  />
                </div>
              </div>
            </div>

            {(preferences.showInformationalDisclaimer || preferences.showPromotionalDisclaimer) && (
              <div className="flex flex-col gap-2 items-start w-full">
                {preferences.showInformationalDisclaimer && (
                  <label className="flex gap-2 items-start w-full cursor-pointer">
                    <input
                      type="checkbox"
                      checked={informational}
                      onChange={(e) => setInformational(e.target.checked)}
                      className="mt-0.5 size-5 shrink-0 rounded-sm border-2 border-[#dbe1e5] accent-[#1a64bc]"
                    />
                    <span className="flex-1 text-sm text-[#616466] leading-5">
                      I agree to receive automated text messages regarding lease info, maintenance, billing & community events
                    </span>
                  </label>
                )}
                {preferences.showPromotionalDisclaimer && (
                  <label className="flex gap-2 items-start w-full cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promotional}
                      onChange={(e) => setPromotional(e.target.checked)}
                      className="mt-0.5 size-5 shrink-0 rounded-sm border-2 border-[#dbe1e5] accent-[#1a64bc]"
                    />
                    <span className="flex-1 text-sm text-[#616466] leading-5">
                      I agree to receive automated text messages regarding property specials & promotions
                    </span>
                  </label>
                )}
              </div>
            )}

            <div className="flex flex-col gap-5 items-center w-full">
              {(preferences.showInformationalDisclaimer || preferences.showPromotionalDisclaimer) && (
                <p className="text-xs text-[#747474] leading-[18px]">
                  By checking the checkbox(s) and providing your phone number, you agree to receive automated text
                  messages from {preferences.companyName}. Reply STOP to opt-out or HELP for more information at any
                  time. Message and data rates may apply. Message frequency will vary. Consent to receive text
                  messages is not a condition of purchase or of any service. For more information, please read our{' '}
                  <a href={preferences.privacyPolicyUrl} target="_blank" rel="noreferrer" className="underline">
                    privacy policy
                  </a>{' '}
                  and{' '}
                  <a href={preferences.termsOfServiceUrl} target="_blank" rel="noreferrer" className="underline">
                    terms of service
                  </a>
                  .
                </p>
              )}

              <button
                onClick={() => setCaptcha((c) => !c)}
                className="bg-[#fafafa] border border-[#d6d6d6] shadow-sm h-[74px] rounded-sm w-[302px] flex items-center gap-3.5 px-3"
              >
                <span
                  className={`size-6 rounded-[1px] border-2 shrink-0 ${
                    captcha ? 'bg-[#1a64bc] border-[#1a64bc]' : 'bg-white border-[#c1c1c1]'
                  }`}
                />
                <span className="text-sm text-black">I'm not a robot</span>
                <img src={recaptchaLogo} alt="" className="h-[46px] w-12 ml-auto" />
              </button>

              <div className="flex gap-4 items-start w-full">
                <Button type="secondary" className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="flex-1 disabled:opacity-50"
                  disabled={!canSubmit}
                  onClick={() => canSubmit && setSubmitted(true)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#747474]">Powered by Rent Manager © 2025</p>
      </div>
    </div>
  )
}
