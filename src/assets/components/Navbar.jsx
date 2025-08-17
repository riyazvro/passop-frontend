import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-400 text-white'>
      <div className='flex md:justify-between justify-around items-center-safe h-15 md:px-40'>
        
        <div className='text-2xl font-bold flex'>
          <span className='text-green-600'>&lt; </span>
          <span className=''>Pass</span>
          <span className='text-green-600'> OP /&gt;</span>
          <h1>RIYAZZZZ</h1>
          <h1>❤️❤️❤️</h1>
        </div>
        
        <a href='https://github.com/riyazvro' className='cursor-pointer flex justify-center items-center gap-2 bg-green-400 rounded-full p-1 px-2 ring-1'>
          <img width={35} className='invert' src="/icons/github.svg" alt="" />
          <span className='font-bold'>GitHub</span>
          
        </a>
      </div>
    </nav>
  )
}

export default Navbar
