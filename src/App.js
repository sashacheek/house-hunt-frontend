import './App.css';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import YourListings from './pages/YourListings.jsx';
import AddListing from './pages/AddListing.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/yourlistings" element={<YourListings />}/>
        <Route path="/newlisting" element={<AddListing />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
