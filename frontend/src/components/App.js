import  '../styles.scss';
import  'bootstrap';
import React from 'react';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from "./ChatPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound/>} />
        <Route path='/' element={<ChatPage/>} />
        <Route path='login' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
