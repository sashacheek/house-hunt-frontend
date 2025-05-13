import './App.css';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import YourListings from './pages/YourListings.jsx';
import AddListing from './pages/AddListing.jsx';
import SignUp from './pages/SignUp.jsx';
import Listing from './pages/Listing';
import Navigation from "./components/Navigation";
import NavigationSmall from "./components/NavigationSmall";
import Footer from "./components/Footer"

function Layout() {
  return (
    <>
      <Navigation />
      {/* <NavigationSmall /> */}
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/yourlistings" element={<YourListings />}/>
          <Route path="/newlisting" element={<AddListing />}/>
          <Route path="/listing/:id" element={<Listing />}/>
          <Route path="/editlisting/:id" element={<AddListing />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
