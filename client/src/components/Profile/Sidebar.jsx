import React from 'react'
import { IoMdContact } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";



const Sidebar = ({selectedCategory, setSelectedCategory}) => {
    const data = [
        {
            title: "Personal Information",
            icon: IoMdContact
        },
        {
            title: "Password",
            icon: RiLockPasswordLine
        },
        {
            title: "Avatar",
            icon: RxAvatar
        }
    ]
  return (
    <div className='text-tertiary flex flex-col gap-2'>
        {
            data.map((edit) => (
                <button key={edit.title}
                    className={`${selectedCategory === edit.title ? "bg-primary text-secondary": ""} p-4 rounded-xl flex items-center gap-2`}
                    onClick={() => setSelectedCategory(edit.title)}
                >
                    <edit.icon className='text-xl'/>
                    <span> {edit.title} </span>
                </button>
            ))
        }
        
    </div>
  )
}

export default Sidebar