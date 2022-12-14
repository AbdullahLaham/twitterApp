
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import axios from 'axios'
import {Store} from '../store'
import { useContext, useState, useEffect } from 'react'
import CommentSection from '../components/CommentSection'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../actions/posts'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const [newNews, setNewNews] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  const {authData} = useSelector(state => state?.authReducer);
  console.log('rr', authData)

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

  useEffect(() => {
    if (!currentUser?.email) navigate('/auth', {replace: true},);
  }, [navigate]);

  return (
    <div  >
      <main className=' min-h-screen max-w-[100%] mx-auto flex'>
        <Sidebar />
        <Feed />
        <Widgets newNews={newNews} randomUsers={randomUsers} />
        {/* CommentSection */}
        <CommentSection />
      </main>
    </div>
  )
}
// https://saurav.tech/NewsAPI/top-headlines/category/business/in.json