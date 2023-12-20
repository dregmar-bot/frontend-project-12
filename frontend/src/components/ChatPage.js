import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { addMessages } from '../slices/messages';
import { addChannels } from '../slices/channels';
import { switchChannel } from '../slices/currentChannel';
import Navbar from './Navbar';
import ChannelBox from './ChannelBox';
import MessagesBox from './MessagesBox';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const response = await axios.get('api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addMessages(response.data.messages));
    dispatch(addChannels(response.data.channels));
    dispatch(switchChannel(response.data.currentChannelId));
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      try {
        fetchData();
      } catch {
        toast.error(t('chatPage.toast.fetchError'));
      }
    }
  });

  return (
    <div className="h-100 d-flex flex-column" id="chat">
      <Navbar />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelBox />
          <div className="col p-0 h-100">
            <MessagesBox />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatPage;
