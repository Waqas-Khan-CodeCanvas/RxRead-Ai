import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LandingPage    from '../pages/LandingPage'
import UploadPage     from '../pages/UploadPage'
import ProcessingPage from '../pages/ProcessingPage'
import ResultsPage    from '../pages/ResultsPage'
import AboutPage      from '../pages/AboutPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages that use the main layout (navbar + footer) */}
        <Route element={<MainLayout />}>
          <Route path="/"       element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about"  element={<AboutPage />} />
        </Route>

        {/* Full-screen pages without navbar/footer */}
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/results"    element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes