import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import React from 'react'
import { useEffect, useState } from 'react';
import {BsStars} from 'react-icons/bs';
import { db } from '../firebase';
import Input from './Input';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { getPosts } from '../actions/posts';
import { fetchUsers } from '../actions/userAuth';

const Feed = () => {
  const posts = useSelector((state) => state?.posts?.posts);
  const dispatch = useDispatch();
  const {authData} = useSelector((state) => state?.authReducer);
  console.log('yyyyyyy', authData);
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(getPosts(authData?.email));
      const dataa = await dispatch(fetchUsers());
      console.log('ggggggggggggggggggggggg', data);
    }
    fetchData();
  });
  console.log('fdfffffff', posts);
  return (
    <div className='xl:ml-[18rem]  border-l border-r xl:min-w-[42rem] sm:ml-[73px] flex-grow max-w-xl h-[100vh] '>
      <div className='flex justify-between p-[.7rem] sticky top-0 z-50 bg-white border-b border-gray-200 '>
        <p className='font-bold text-3xl sm:text-xl cursor-pointer '>Home</p>
        <div className='hoverAnimation flex items-center justify-center px-0 ml-auto'>
            <BsStars className='text-3xl ' />
        </div>
        
      </div>
      <Input />
      {posts?.map((post, i) => {
        return (
          <AnimatePresence key={i}>
            <motion.div
              key={post?._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Post key={post?._id} post={post} />
            </motion.div>
          </AnimatePresence>
        )
      })}
    </div>
  )
}

export default Feed
