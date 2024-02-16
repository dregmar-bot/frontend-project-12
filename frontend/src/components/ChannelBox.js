import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../slices/channels.js';
import { switchChannel, openModal } from '../slices/ui.js';
import ChannelsModal from './modals/index.js'

const ChannelBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.ui.currentChannel);
  const channels = useSelector(channelsSelectors.selectAll);


  const handleOpenModal = (type, channel = null) => {
    dispatch(openModal({ type, channel }))
  };

  const list = channels.map((channel) => {
    const handleSwitchChannel = () => dispatch(switchChannel(channel.id));
    if (!channel.removable) {
      return (
        <Nav.Item as="li" className="w-100" key={channel.id} id={channel.id}>
          <Button
            variant={channel.id === channelId ? 'secondary' : ''}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleSwitchChannel}
          >
            <span className="me-1">
              #
            </span>
            {channel.name}
          </Button>
        </Nav.Item>
      );
    }

    return (
      <Nav.Item as="li" className="w-100" key={channel.id} id={channel.id}>
        <Dropdown as={ButtonGroup} className="d-flex" key={channel.id}>
          <Button
            variant={channel.id === channelId ? 'secondary' : ''}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleSwitchChannel}
          >
            <span className="me-1">
              #
            </span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            type="button"
            as="button"
            split
            variant="light"
            className={`btn flex-grow-0 ${channel.id === channelId ? 'btn-secondary' : ''}`}
          >
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item id={channel.id} href="#" onClick={() => handleOpenModal('remove', channel.id)}>{t('chatPage.channelBox.remove')}</Dropdown.Item>
            <Dropdown.Item id={channel.id} href="#" onClick={() => handleOpenModal('rename', channel.id)}>{t('chatPage.channelBox.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  });

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channelBox.channels')}</b>
        <Button className="p-0 text-primary btn-group-vertical" variant="link" onClick={() => handleOpenModal('add')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="21" height="21" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" id="channel-box" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {list}
      </Nav>
      <ChannelsModal />
    </div>
  );
};

export default ChannelBox;
