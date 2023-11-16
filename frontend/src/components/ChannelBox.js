import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../slices/channels';
import { useSelector, useDispatch } from 'react-redux';
import { switchChannel } from '../slices/currentChannel';
import { Button } from 'react-bootstrap';
import AddChannelModal from "./modals/addChannel";


const ChannelBox = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelId = useSelector((state) => {
    return state.currentChannel;
  });
  const channels = useSelector(channelsSelectors.selectAll);

  const list = channels.map((channel) => {
    const handleSwitchChannel = () => dispatch(switchChannel(channel.id));

    return (
      <li className="nav-item w-100" key={channel.id}>
        <button type="button" className={`w-100 
        rounded-0
        text-start
        btn
        ${channel.id === channelId ? "btn-secondary" : ""}`
        }
        onClick={handleSwitchChannel}
        >
          <span  className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    )
  });

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channelBox.channels')}</b>
        <Button type="button" className="p-0 text-primary btn btn-group-vertical" variant="link" onClick={openModal}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="21" height="21" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
        <AddChannelModal show={modalIsOpen} close={closeModal}/>
      </div>
      <ul id="channel-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        { list }
      </ul>
    </div>
  );
};

export default ChannelBox;
