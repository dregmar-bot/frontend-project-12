import  '../styles.scss';
import  'bootstrap';
import React from 'react';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='login' element={<LoginPage/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
