import React, { useState } from 'react'
import {BsTwitter, BsBookmark, BsListStars, BsHash} from 'react-icons/bs'
import {AiOutlineHome, AiOutlineMail, AiOutlineUser, AiOutlineBell} from 'react-icons/ai'
import {CgMoreO, CgMoreAlt} from 'react-icons/cg'
import {GiFeather} from 'react-icons/gi'
import SidebarLink from './SidebarLink'
import {HiHashtag} from 'react-icons/hi'
import { useContext } from 'react'
import { Store } from '../store'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const menuItems = [
    {
      text: "Home",
      icon: AiOutlineHome,
    },
    {
      text: "Explore",
      icon: HiHashtag,
    },
    {
      text: "Notification",
      icon: AiOutlineBell,
    },
    {
      text: "Messages",
      icon: AiOutlineMail,
    },
    {
      text: "BookMark",
      icon: BsBookmark,
    },
    {
      text: "Lists",
      icon: BsListStars,
    },
    {
      text: "Profile",
      icon: AiOutlineUser,
    },
    {
      text: "More",
      icon: CgMoreO,
    },
  ];
const Sidebar = () => {
  const {authData} = useSelector((state) => state?.authReducer);
  const [active, setActive] = useState('Home');
  const {dispatch, state} = useContext(Store);
  // const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  const handleGoogleSignout = () => {
    signOut(auth);
    localStorage.setItem('user', JSON.stringify({}));
    navigate('/auth')
  }
  return (
    <div className='ml-[1.2rem]  hidden sm:flex flex-col items-start justify-between  xl:items-start pr-[1.5rem] fixed h-full border-gray-300 '>
      <div>
        <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0'>
          <BsTwitter className='text-[#57a9f5] text-3xl' />
        </div>
        <div className='space-y-2.5 mt-4 mb-2.5  flex flex-col '>
          {menuItems.map((item, i) => {
            return (
              ((i < 2) || (i > 2 && authData)) && <div onClick={() => setActive(item.text)}>
                <SidebarLink  Icon = {item.icon} text={item.text} active={active == item.text}  />
              </div>
            )
          })}
        </div>
        
        
        {authData && (
          <>
            <button className='hidden xl:block text-center bg-blue-500 text-white rounded-full  cursor-pointer w-[13rem] h-12 hover:brightness-95 text-lg  '>Tweet</button>
            <div className='xl:hidden w-[3rem] p-[1rem] bg-blue-500 text-center  text-white font-bold cursor-pointer rounded-full'>
              <GiFeather/>
            </div>
          </>
        )}
       
      </div>
      {/* Mini Profile */}
      {authData && (<div onClick={handleGoogleSignout} className='flex items-center justify-start text-gray-700 cursor-pointer  hoverAnimation'>
        <img src={authData?.image} width='50px' height='50px' className='w-[3rem] h-[3rem] text-white rounded-full mr-[.3rem] object-cover'/>
        <div className='hidden lg:flex items-center justify-start text-gray-700 cursor-pointer mb-[.5rem]'>
          <div>
            <h4 className='font-bold'>{authData.userName}</h4>
            <p className='text-gray-500'>{authData?.email}</p>
          </div>
          <CgMoreAlt className='text-3xl ml-[.3rem] ' />
        </div>
      </div>)}
    </div>
  )
}

export default Sidebar
