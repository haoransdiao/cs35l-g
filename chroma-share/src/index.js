import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from "./About";
import Faq from "./Faq";
import Signup from './Signup';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/faq' element={<Faq/>} />
      <Route path='/signup' element={<Signup/>} />
  </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

  

