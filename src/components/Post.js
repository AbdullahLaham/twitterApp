import React from 'react'
import {CgMoreAlt} from 'react-icons/cg';
import {FaRegCommentDots} from 'react-icons/fa';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {FiShare2} from 'react-icons/fi'
import {TbBrandGoogleAnalytics} from 'react-icons/tb'
import {FiTrash2} from 'react-icons/fi';
import Moment from 'react-moment';
import { useState } from 'react';
import { useEffect } from 'react';
// import { async } from '@firebase/util';
import { deleteObject, ref } from 'firebase/storage';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState, postIdlState } from '../atom/commentAtom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {deletePost, likePost, openCommentSection} from '../actions/posts'
const Post = ({post}) => {
  // the current user
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [likes, setLikes] = useState(post?.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [comments, setComments] = useState([]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // router
  // adding like to the post function
  const addLike = () => {
    if (isLiked) setIsLiked(false)
    else setIsLiked(true);
    // add the like to the post on the database
    dispatch(likePost(post?._id));
  }
  // deleting the post function
  const deleteThePost = async () => {
    if (window.confirm("Are you sure you want to delete this post!")) {
      dispatch(deletePost(post?._id));
      navigate('/', {replace: true})
    }
  }
  // adding comment to the post 
  const addComment = () => {
    localStorage.setItem('postId', post?._id);
    dispatch(openCommentSection())
  }
  
  useEffect(() => {
    const index = post?.likes?.findIndex((like) => like === currentUser?._id)
    if (index) setIsLiked(true)
    console.log('isLiked', index)
  }, [post?._id])
  return (
    <div className='flex justify-start mb-[2rem] p-[1rem] w-[40rem]'>
      <div className='mr-[.5rem]'>
        <img src={post?.creatorImage} className='w-[3rem] h-[3rem] rounded-full object-cover'  />
      </div>
      <div className='w-[100%]'>
        <Link to={`/post/${post?._id}`}>
          <div>
            <div className='flex items-center justify-between'><div className='flex items-center whitespace-nowrap'><p className='mr-[.5rem] cursor-pointer font-bold'>{post?.creatorName}</p><p className='mr-[.5rem]'>{post?.creatorEmail}</p><p className='mr-[.5rem] hover:underline hover:cursor-pointer text-sm '>- <Moment fromNow>{post?.createdAt}</Moment></p> </div><div className='p-[.5rem] text-3xl ml-[3rem] hoverAnimation cursor-pointer'><CgMoreAlt className='' /></div></div>
            <p className='text-gray-800 text-start text-[15px] sm:text-[16px] '>{post?.text}</p>
          </div>
        </Link>
        <Link to={`/post/${post?._id}`} className='max-h-[25rem] overflow-hidden mt-[1.1rem]'>
            {post?.Image && <img src={post?.Image} className='h-[30rem] w-[30rem] object-cover rounded-md' />}
        </Link>
        <div className='flex justify-between p-[1rem] w-[100%] '>
            <div onClick={() => addComment()} className='flex items-center rounded-full gap-2 text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-blue-200 hover:text-blue-500'>
                <FaRegCommentDots className='cursor-pointer'/>
                {comments.length > 0 && <p>{comments.length}</p>}
                
            </div>
            {currentUser?.email === post?.creatorEmail && (<div onClick={deleteThePost} className='rounded-full text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-red-200 hover:text-red-500'>
                <FiTrash2 className='cursor-pointer '/>
            </div>)}
            {<div>
              <div className={`cursor-pointer rounded-full flex items-center gap-1 text-xl hoverAnimation p-[1rem] ${isLiked && "text-red-500 bg-red-200 active:text-black active:bg-white"}` } onClick={addLike}>
                <BsFillSuitHeartFill className='cursor-pointer'/>
                <p className='mt-[-.2rem]'></p>
              </div>
            </div>}
            <div className='text-xl rounded-full cursor-pointer hoverAnimation p-[1rem] hover:bg-blue-200 hover:text-blue-500'>
                <FiShare2 className='cursor-pointer'/>
            </div>
            <div className='text-xl rounded-full cursor-pointer hoverAnimation hover:bg-blue-200 p-[1rem] hover:text-blue-500 '>
                <TbBrandGoogleAnalytics className='cursor-pointer' />
            </div>
            
        </div>
      </div>

    </div>
  )
}

export default Post;
