import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
const Manager = () => {
  const ref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const getPasswords=async() => {
    let req= await fetch("https://possop-backend-riyazvros-projects.vercel.app")
    let passwords=await req.json()
    console.log(passwords); 
    setpasswordArray(passwords)
    
  }
  
  useEffect(() => {
    getPasswords()
  }, [])

  const showPassword = () => {
    if (ref.current.src.includes("/icons/eye.png")) {
      ref.current.src = "/icons/eyecross.png"
    }
    else {
      ref.current.src = "/icons/eye.png"
    }
  }
  const savePassword = async() => {
    
    if(form.site.length===0){
      toast('Please enter a site', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    else if(form.username.length===0){
      toast('Please enter a username', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    else if(form.password.length===0){
      toast('Please enter a password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    else{
    toast('Password saved', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
    });
    setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:passwordArray.id}]))
    // console.log([...passwordArray, form]);
    let res=await fetch("https://possop-backend-riyazvros-projects.vercel.app",{
      method:"POST",
      body:JSON.stringify({...form,id:uuidv4()}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    setform({ site: "", username: "", password: "" })
  }
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copyText = (params) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
    });
    navigator.clipboard.writeText(params)
  }
  const editPassword=(id)=>{
    
    console.log("Editing password having id :"+id);
    setform(passwordArray.find(item=>item.id===id))
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
  }

  const deletePassword=async(id)=>{
    if(window.confirm("Are you sure you want to delete this password?")){

      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      let res=await fetch("https://possop-backend-riyazvros-projects.vercel.app",{
        method:"DELETE",
        body:JSON.stringify({id}),
        headers:{
          "Content-Type":"application/json"
        }
      })
    }
  }


  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss 
        draggable
        pauseOnHover
        theme="light"
        
      />

      <div className="maincontainer  md:mycontainer  md:w-3/4 md:mx-auto p-2 w-full mb-20">
        <div className='text-4xl font-bold text-center'>
          <span className='text-green-600'>&lt; </span>
          <span className=''>Pass</span>
          <span className='text-green-600'> OP /&gt;</span>
        </div>
        <p className='text-green-900 text-center text-lg'>Your own password manager</p>
        <div className='gap-4 flex flex-col'>
          <input onChange={handleChange} name='site' value={form.site} placeholder='Enter Website URL' className='rounded-full bg-white border border-green-500 w-full px-4 py-1' type="text" />
          <div className='w-full flex gap-5 flex-col md:flex-row'>
            <input onChange={handleChange} name='username' value={form.username} placeholder='Enter Username' className='rounded-full bg-white border border-green-500 w-full px-4 py-1' type="text" />
            <div className='relative'>
              <input onChange={handleChange} name='password' value={form.password} placeholder='Enter Password' className='rounded-full bg-white border border-green-500 w-full px-4 py-1' type="password" />
              <div onClick={showPassword} className='absolute right-1 top-1 cursor-pointer'>
                {/* <img ref={ref} width={25} src="/icons/eye.png" alt="" /> */}

              </div>
            </div>

          </div>
          <div className='flex justify-center items-center'>

            <button onClick={savePassword} className='bg-green-500 gap-4 border border-green-900 hover:bg-green-400 w-fit p-2 px-4 rounded-full flex items-center cursor-pointer'>

              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"

              >
              </lord-icon>
              <h2 className='font-bold text-xl'>Save Password</h2></button>

          </div>
          <div className="passwords">
            <h2 className='text-2xl font-bold py-3'>
              Your Passwords
            </h2>
            {passwordArray.length === 0 && <div>No Passwords To Show</div>}
            {passwordArray.length !== 0 &&
              <table className="table-auto  rounded-md  w-[50vw] overflow-hidden mx-auto">
                <thead className='bg-green-700 text-white'>

                  <tr>
                    <th className='py-1 text-xl'>Site</th>
                    <th className='py-1 text-xl'>Username</th>
                    <th className='py-1 text-xl'>Password</th>
                    <th className='py-1 text-xl'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-green-100'>
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className=' py-1 border-white border text-center md:w-45 flex-col'>
                          <div className='flex justify-center items-center gap-3'>

                            <a href={item.site} target='_blank'>{item.site}
                            </a>
                            <div className='lordiconcopy cursor-pointer' onClick={() => { copyText(item.site) }}>

                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              >
                              </lord-icon>
                            </div>
                          </div>

                        </td>
                        <td className='py-1 border-white border text-center md:w-25'>
                          <div className='flex justify-center items-center gap-3'>

                            <div>{item.username}</div>
                            <div className='lordiconcopy cursor-pointer' onClick={() => { copyText(item.username) }}>

                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              >
                              </lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className=' py-1 border-white border text-center md:w-25'>
                          <div className='flex items-center justify-center gap-3'>
                            <div>{"*".repeat(item.password.length)}</div>
                            <div className='lordiconcopy cursor-pointer' onClick={() => { copyText(item.password) }}>

                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              >
                              </lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className='md:w-8 py-1 border-white border text-center '>
                          <div className='flex justify-center items-center gap-3'>
                            <span className='cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                              >
                              </lord-icon>
                            </span>
                            <span className='cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                              >
                              </lord-icon>
                            </span>
                          </div>
                        </td>

                      </tr>)
                  })}

                </tbody>
              </table>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manager
