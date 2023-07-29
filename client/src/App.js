import Home from './pages/Home';
import "./home.css";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import DetailedUserPage from './pages/DetailedUserPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
 
function App() {


  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<DetailedUserPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
