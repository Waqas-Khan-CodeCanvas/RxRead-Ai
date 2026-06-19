import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 overflow-x-hidden">
      
      {/* Global background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/8 blur-[140px] rounded-full" />
      </div>

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout