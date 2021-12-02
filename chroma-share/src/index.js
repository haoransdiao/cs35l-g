import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from "./About";
import Signup from './Signup';
import Home from './Home';
import Signin from './Signin';
import Upload from './Upload';
import Search from './Search';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/home' element={<Home/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/upload" element={<Upload/>} />
      <Route path="/search" element={<Search/>} />
  </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

  

