import axios from 'axios';
// import  Input  from '../../components/Input';
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { BsStars } from 'react-icons/bs';
import CommentSection from './CommentSection';
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi';
import Post from './Post';
import Comment from './Comment';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Widgets from './Widgets';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {getSinglePost} from '../actions/posts';
const PostPage = () => { 
  const [newNews, setNewNews] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  // the post from the Id
  const { post } = useSelector((state) => state?.posts);
  // get the postId from the link
  const {id: postId} = useParams();
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem('user')) navigate('/auth/signin', {replace: true},);
  }, [navigate])

  useEffect(() => {
    
    const fetchData = async () => {
        const news = await axios.get('https://saurav.tech/NewsAPI/top-headlines/category/business/in.json');
        const {data: {articles}} = news;
        // who to follow section
        const users = await axios.get('https://randomuser.me/api/?results=30&inc=name,login,picture')
        const {data: {results}} = users;
        setNewNews(articles);
        setRandomUsers(results);
        
    }
    fetchData();
    
  }, []);

  // get comments of the post
  useEffect(() => {
    // fetch Post Details
    dispatch(getSinglePost(postId));
    
   
  }, []);
 console.log('ddddd', post)
  return (
    <div className='min-h-screen max-w-[100%] mx-auto flex'>
      <Sidebar />
      <main className=' min-h-screen max-w-[100%] mx-auto flex'>
        <div className='xl:ml-[16rem] border-l border-r xl:min-w-[42rem] sm:ml-[73px] flex-grow max-w-xl h-[100vh] '>
        <div className='flex justify-between items-center  py-[.7rem] px-[1.7rem] sticky top-0 z-50 bg-white border-b border-gray-200 '>
          
          <Link to="/" className='hoverAnimation cursor-pointer w-[2rem]'>
              <HiOutlineArrowNarrowLeft className='text-3xl hoverAnimation cursor-pointer p-[.1rem]' />
          </Link>

          <p className='font-bold text-3xl sm:text-xl cursor-pointer w-[3rem] '>Tweet</p>
          
        </div>
        {post && <Post post={post}/>}
        {post?.comments?.map((comment, i) => <Comment key={i} postId={post?._id} comment={comment} userId={currentUser?._id} />)}
    </div>   
        {/* CommentSection */}
        {/* <CommentSection /> */}
      </main>
      <Widgets newNews={newNews} randomUsers={randomUsers} />
      <CommentSection />
    </div>
  )
}

export default PostPage;
