import logo from './logo.svg';
import './App.css';
import Login from './pages/Login.jsx'
import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import YourListings from './pages/YourListings.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/yourlistings" element={<YourListings />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
