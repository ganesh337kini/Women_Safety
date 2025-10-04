import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
 import PostBlog from "./components/PostBlog";
// import BlogDetail from "./pages/BlogDetail";
// import Tutorials from "./pages/Tutorials";
// import Emergency from "./pages/Emergency";
 import Login from "./components/Login";
 import Profile from "./pages/Profile";
 import Create from "./pages/Create";
import SpeedList from "./pages/SpeedList";
// import SOS from "./pages/SOS";
// import Account from "./pages/Account";
// import Edit from "./pages/Edit";
 import Blog from "./pages/Blog";  
import TravelComp from "./pages/TravelComp";


function App() {
  return (
   
    <Routes>
      {/* Routes using MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
         <Route path="/blog" element={<Blog />} />
         
        {/* <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/account" element={<Account />} />
        <Route path="/edit" element={<Edit />} />

        <Route path="/create" element={<PostBlog />} />
        <Route path="/women-jobs" element={<WomenJobs />} />*/}

         <Route path="/login" element={<Login />} /> 
         <Route path="/profile" element={<Profile />} /> 
         <Route path="/speedlist" element={<SpeedList />} /> 
         <Route path="/create" element={<Create />} /> 
       
        <Route path="/women-jobs" element={<WomenJobs />} /> */}
         <Route path="/create" element={<PostBlog />} />
        
        <Route path="*" element={<h1 className='text-center mt-10 text-2xl font-semibold'>404 - Page Not Found</h1>} />
      </Route>

      {/* SOS full page (no layout) */}
      {/* <Route path="/sos" element={<SOS />} /> */}
       <Route path="/travel" element={<TravelComp/>} />
    </Routes>
   
  );
}

export default App;
