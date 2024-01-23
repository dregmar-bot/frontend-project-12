import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { addMessages } from '../slices/messages';
import { addChannels, switchChannel } from '../slices/channels';
import Navbar from './Navbar';
import ChannelBox from './ChannelBox';
import MessagesBox from './MessagesBox';
import AuthContext from '../contexts/authContext.js';
import routes from '../routes';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeUser, getAuthHeader } = useContext(AuthContext);

  useEffect(() => {
    if (!activeUser) {
      navigate(routes.loginPath());
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(routes.serverApi.dataPath(), {
            headers: getAuthHeader(),
          });
          dispatch(addMessages(response.data.messages));
          dispatch(addChannels(response.data.channels));
          dispatch(switchChannel(response.data.currentChannelId));
        } catch {
          toast.error(t('chatPage.toast.fetchError'));
        }
      };
      fetchData();
    }
  }, [activeUser, navigate, t, dispatch, getAuthHeader]);

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
