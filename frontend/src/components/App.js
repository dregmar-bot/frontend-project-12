import '../styles.scss';
import 'bootstrap';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import ChatPage from './ChatPage';
import SignupPage from './SignupPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/" element={<ChatPage/>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="signup" element={<SignupPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
