import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './components/PostDetails';
import Signin from './pages/auth/signin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<PostDetails />} />
        <Route path='/auth' element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
