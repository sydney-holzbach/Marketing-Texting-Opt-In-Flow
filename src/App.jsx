import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ResidentSignUp from './pages/ResidentSignUp.jsx'
import AdminTextingPreferences from './pages/AdminTextingPreferences.jsx'
import TemplateListPage from './pages/templates/TemplateListPage.jsx'
import TenantProfile from './pages/TenantProfile.jsx'
import InformationalBulkFlow from './pages/bulk/InformationalBulkFlow.jsx'
import PromotionalBulkFlow from './pages/bulk/PromotionalBulkFlow.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<ResidentSignUp />} />
      <Route path="/admin/texting" element={<AdminTextingPreferences />} />
      <Route path="/templates/:folderSlug" element={<TemplateListPage />} />
      <Route path="/tenants/charlie-apegian" element={<TenantProfile />} />
      <Route path="/bulk/informational" element={<InformationalBulkFlow />} />
      <Route path="/bulk/promotional" element={<PromotionalBulkFlow />} />
    </Routes>
  )
}

export default App
