import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/authContext.js';
import { addMessages } from '../slices/messages';
import { addChannels } from '../slices/channels';
import { switchChannel } from '../slices/ui';
import ChannelBox from './ChannelBox';
import MessagesBox from './MessagesBox';
import Layout from './Layout';
import routes from '../routes';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader, deauthorize } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.serverApi.dataPath(), {
          headers: getAuthHeader(),
        });
        dispatch(addMessages(response.data.messages));
        dispatch(addChannels(response.data.channels));
        dispatch(switchChannel(response.data.currentChannelId));
      } catch (e) {
        if (!e.isAxiosError) {
          toast.error(t('chatPage.toast.undefinedError'));
        } else if (e.response?.status === 401) {
          toast.error(t('chatPage.toast.tokenError'));
          deauthorize();
        } else {
          toast.error(t('chatPage.toast.fetchError'));
        }
      }
    };
    fetchData();
  }, [t, dispatch, getAuthHeader]);

  return (
    <Layout>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelBox />
          <div className="col p-0 h-100">
            <MessagesBox />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
