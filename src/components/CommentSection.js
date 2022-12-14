import React, { useEffect } from 'react'
import {Snapshot, useRecoilState} from 'recoil'
import { modalState, postIdlState } from '../atom/commentAtom'
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import Moment from 'react-moment';
import { TbPhoto } from 'react-icons/tb';
import { BiHappy } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeCommentSection, sendComment } from '../actions/posts';
const CommentSection = () => {
    const {isOpen: open} = useSelector((state) => state?.posts);
    const {post} = useSelector((state) => state?.posts);
    const [commentImage, setCommenTmage] = useState(null);
    const [input, setInput] = useState("");
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    // dispatch
    const dispatch = useDispatch();
    // navigate
    const navigate = useNavigate();

    // useEffect(() => {
    //   console.log('postId', postId)
    //   const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
    //     setPosts(snapshot.docs);
    //     snapshot.docs.map((post) => {
    //       if (post?.id === localStorage.getItem('id')) {
    //         setPost(post)
    //      }  
    //    })

    //   });
    //   setCurrentUser(JSON.parse(localStorage.getItem('user')))
    // }, [postId]);

    

    const addComment = () => {
      const comment = {
        text: input,
        image: commentImage,
        creatorImage: currentUser?.image,
        creatorName: currentUser?.userName,
        creatorEmail: currentUser?.email,
      }
      console.log(comment)
      dispatch(sendComment({comment, postId: post?._id}));
      dispatch(closeCommentSection());
      setInput('');
      navigate(`/post/${post?._id}`);
    }
    
  return (
    <>
          {open && (
            <Modal isOpen={() => open} onRequestClose={() => {dispatch(closeCommentSection())}} className='max-w-lg w-[90%] h-[300px] absolute left-[50%] translate-x-[-50%] border-1 border-gray-400 bg-white rounded-xl top-24'>
                <div className='p-2'>
                    <div className='border-gray-200'>
                        <div className='hoverAnimation w-9 pt-[-.2rem] h-9 flex items-center justify-center absolute left-5 top-2'>
                            <p onClick={() => {dispatch(closeCommentSection())}} className='text-[22px] text-gray-500 cursor-pointer text-3xl'><AiOutlineClose /></p>
                        </div>
                        <div className='mt-[3rem]'>
                          <span className="w-0.5 h-[3rem] z-[-1] absolute left-7 top-[6.1rem] bg-gray-300" />
                          <p className='absolute top-[6.5rem] left-[4.2rem] text-gray-500 '>{post?.text}</p>
                          <div className='mr-[.5rem] flex items-center gap-2'>
                            
                            <img src={post?.creatorImage} className='3-[4rem] h-[3rem] rounded-full object-cover'  />
                            <div className='flex items-center justify-between'><div className='flex items-center whitespace-nowrap'><p className='mr-[.5rem] cursor-pointer font-bold'>{post?.creatorName}</p><p className='mr-[.5rem]'>{post?.creatorEmail}</p><p className='mr-[.5rem] hover:underline hover:cursor-pointer text-sm '><Moment fromNow>{post?.createdAt}</Moment></p> </div></div>
                          </div>
                          <div className='flex items-center  justify-start mt-[2rem]'>
                            <div className=' object-cover cursor-pointer hover:brightness-95 mt-[-1.2rem]'><img src={currentUser?.image} className='w-[3rem] h-[3rem] rounded-full' /></div>
                            <textarea  placeholder='Tewet your reply' value={input} onChange={(e) => setInput(e.target.value)} className='outline-none max-h-[8rem] text-gray-500 resize-none text-[1.2rem] placeholder-gray-600 tracking-wide  min-w-[20rem] form-textarea pl-[1rem] border-none focus:ring-0 ' ></textarea>
                          </div>
                          <div className='flex items-center justify-between pt-2.5 border-t '>
                            <div className='flex items-center justify-start'>
                                <div>
                                  <label for='image'><TbPhoto className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' /></label>
                                  <input type='file' className='hidden' id="image" name='postImage' onChange={(e) => setCommenTmage(e?.target?.files[0])} />
                                </div>
                                <BiHappy className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' />
                            </div>`
                            <button disable={!input.trim()} onClick={addComment} className={`disabled:opacity-50 text-center bg-blue-500 text-white rounded-full shadow-md cursor-pointer w-[5rem] h-12 hover:brightness-95 text-lg ${loading && "animate-pulse pre"}`}>
                                Reply
                            </button>
                          </div>
                        </div>
                        
                    </div>
                    {/* <h1>{postId}</h1> */}
                </div>
            </Modal>
            )}
    </>
  )
}

export default CommentSection
