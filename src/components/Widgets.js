import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {BsSearch} from 'react-icons/bs';
import News from './News';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUsers, followUser} from '../actions/userAuth';
const Widgets = ({newNews, randomUsers}) => {
  // test
  const [articleLength, setArticleLength] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [usersNum, setUsersNum] = useState(3);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const {users} = useSelector((state) => state?.posts);
  const {authData} = useSelector(state => state?.authReducer);
  console.log('ddddwwwwwwwwwwww', authData)
  useEffect(() => {
    showAll ? setArticleLength(newNews.length) : setArticleLength(3)
  }, [showAll, newNews.length])
  const followThisUser = (userId) => {
    dispatch(followUser(authData?._id, userId));
  }
  return (
    <div className='w-[100%] ml-[2rem] mt-[0rem] hidden lg:block sticky top-0'>
      <div className='sticky top-0 bg-white h-[4.8rem]' >
        <div className='flex items-center p-3 rounded-full relative ' >
            <BsSearch className='h-5 absolute left-[20px] z-10  ' />
            <input type='text' placeholder='Search Twitter' className='w-[80%] h-10 rounded-md  pl-[2.5rem] focus:shadow-lg focus:bg-white w-[100%] sticky top-0 space-y-5  bg-blue-50 border-none outline-none ' />
        </div>
      </div>
      <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-1 ml-[1rem] w-[90%] xl:w-[81%] px-2 '>
        <h4 className='font-bold text-xl px-2 '>What's happening</h4>
        {newNews.map((news, i) => {
          return (
            i < articleLength  && <News key={i} article={news} />
          )
        })}
        <button className='px-2 text-blue-400 hover:text-blue-500 cursor-pointer' onClick={() => {setArticleLength(newNews.length); setShowAll(!showAll)}}>{articleLength > 3 ? "Show Less" : "Show More"}</button>
      </div>
      <div className=' text-gray-700 space-y-3 mt-[2rem] bg-gray-100 rounded-xl pt-1 ml-[1rem] w-[90%] xl:w-[81%] px-2 '>
        <h4 className='font-bold text-xl px-2 '>Who to follow</h4>
        {
          users?.length && users?.map((user, i) => {
            return i < usersNum && 
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
              <div className='flex items-center justify-between' key={i} >
                <img className='rounded-full object-cover mr-[.5rem] max-w-[3rem] max-h-[3rem]'src={user?.image} />
                <div className='w-[100%] flex flex-col items-start'>
                  <p>{user?.userName}</p>
                  <p className='text-gray-400'>{user?.email}</p>
                </div>
                <button className=' text-center bg-[#000] text-white rounded-full shadow-md cursor-pointer w-[5rem] px-[.5rem] h-8 hover:brightness-95 text-lg' onClick={() => followThisUser(user?._id)}>Follow</button>
              </div>
              </motion.div>
            </AnimatePresence>

          })
        }
        <button className='cursor-pointer px-2 text-blue-400 hover:text-blue-500 ' onClick={() => {setUsersNum(usersNum+3)}}>Show More</button>
      </div>
      
    </div>
  )
}

export default Widgets
