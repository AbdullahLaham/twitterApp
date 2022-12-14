
import React from 'react'
import {CgMoreAlt} from 'react-icons/cg';
import {FaRegCommentDots} from 'react-icons/fa';
import {BsFillSuitHeartFill} from 'react-icons/bs';
// import {FiShare2} from 'react-icons/fi'
// import {TbBrandGoogleAnalytics} from 'react-icons/tb'
import {FiTrash2} from 'react-icons/fi';
import Moment from 'react-moment';
import { useState } from 'react';
import { useEffect } from 'react';
// import { async } from '@firebase/util';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState, postIdlState } from '../atom/commentAtom';
import {likeComment, deleteComment} from '../actions/posts';
import { useDispatch, useSelector } from 'react-redux';

const Comment = ({postId, comment, userId}) => {
  const { post } = useSelector((state) => state?.posts);

    console.log('gggg', comment);
  // the current user
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [comments, setComments] = useState([]);
  // dispatch
  const dispatch = useDispatch();
  // adding like to the post function
  const addLikeToComment = async () => {
    dispatch(likeComment({postId, commentId: comment?._id}));
    const index = comment?.likes.findIndex((like) => like == currentUser?._id);
    console.log('indeeeeee', index)
    if (index >= 0) setIsLiked(true);
    else setIsLiked(false);
  }
  // deleting the post function
  const deleteTheComment = async () => {
    if (window.confirm("Are you sure you want to delete this post!")) {
      // deleting from the database
      dispatch(deleteComment({postId, commentId: comment?._id}));
    }
  }
  useEffect(() => {
    console.log(comment?.likes.length);
    const index = comment?.likes.findIndex((like) => like == currentUser?._id);
    if (index >= 0) setIsLiked(true);
    else setIsLiked(false);
    
  }, [comments, currentUser, likes, isLiked])

  return (
    <div className='flex justify-start mb-[2rem] p-[1rem]'>
      <div className='mr-[.5rem]'>
        <img src={comment?.creatorImage} className='w-[3rem] h-[3rem] rounded-full object-cover'  />
      </div>
      <div>
      <div className='flex items-center justify-between'><div className='flex items-center whitespace-nowrap'><p className='mr-[.5rem] cursor-pointer font-bold'>{comment?.creatorName}</p><p className='mr-[.5rem]'>{comment?.creatorEmail}</p><p className='mr-[.5rem] hover:underline hover:cursor-pointer text-sm '>- <Moment fromNow>{comment?.createdAt}</Moment></p> </div><div className='p-[.5rem] text-3xl ml-[3rem] hoverAnimation cursor-pointer'><CgMoreAlt className='' /></div></div>
        <p className='text-gray-800 text-[15px] text-start sm:text-[16px] '>{comment?.text}</p>
        
        <div className='flex items-center gap-2 p-[1rem] '>
            <div onClick={deleteTheComment} className=' text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-red-200 hover:text-red-500'>
                <FiTrash2 className='cursor-pointer'/>
            </div>
            <div>
              <div className={`cursor-pointer flex items-center gap-1 text-xl   ${!isLiked && "text-red-500"}`}  onClick={addLikeToComment}>
                <BsFillSuitHeartFill className='cursor-pointer'/>
                <p className='mt-[-.2rem]'>{comment?.likes.length > 0 && comment?.likes.length}</p>
              </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Comment
// {comment?.creatorEmail === currentUser?.email && (