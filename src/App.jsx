import { useState } from 'react'
import Navbar from './assets/components/Navbar'
import './App.css'
import Manager from './assets/components/Manager'
import Footer from './assets/components/Footer'
function App() {
document.title="Pass Op"

  return (
    <>
    <Navbar />
    <div className='min-h-[87vh]'>

    <Manager />
    </div>
    <Footer />
    </>
  )
}

export default App
