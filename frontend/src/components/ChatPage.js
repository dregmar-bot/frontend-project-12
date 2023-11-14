import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { addMessages } from '../slices/messages';
import { addChannels } from '../slices/channels';
import { switchChannel } from '../slices/currentChannel';
import Navbar from './Navbar';
import ChannelBox from './ChannelBox';
import MessagesBox from './MessagesBox';


const ChatPage = () => {

  useEffect(() => {
    const token = localStorage.getItem('goossengerToken');
    if (!token) {
      window.location.replace('/login');
    }

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

    try {
      fetchData();
    } catch (e) {
      setError(e.code);
    }
  })

  const [_error, setError] = useState(null);
  const dispatch = useDispatch();

  return (
    <div className="h-100" id="chat">
      <Navbar/>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelBox/>
          <div className="col p-0 h-100">
            <MessagesBox/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
