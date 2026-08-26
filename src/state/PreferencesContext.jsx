import { createContext, useContext, useState } from 'react'

const PreferencesContext = createContext(null)

const defaultPreferences = {
  broadcastNumberRule: 'any',
  showInformationalDisclaimer: true,
  companyName: 'Mgmt Company Name (Premiere Management Company)',
  privacyPolicyUrl: 'https://lcs-bateam.sitemanager.rentmanager.com/PrivacyPolicy.aspx',
  termsOfServiceUrl: 'https://lcs-bateam.sitemanager.rentmanager.com/TermsofService.aspx',
}

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(defaultPreferences)

  function updatePreferences(patch) {
    setPreferences((prev) => ({ ...prev, ...patch }))
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider')
  return ctx
}
