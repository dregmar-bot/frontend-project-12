import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { messageSelectors } from '../slices/messages';
import { channelsSelectors } from '../slices/channels';
import ApiContext from '../contexts/apiContext';

const MessagesBox = () => {
  const [text, setText] = useState('');
  const { t } = useTranslation();
  const { sendMessage } = useContext(ApiContext);

  const channelId = useSelector((state) => state.currentChannel);
  const channel = useSelector((state) => channelsSelectors.selectById(state, channelId));
  const messages = useSelector(messageSelectors.selectAll)
    .filter((message) => message.channelId === channelId);

  const username = localStorage.getItem('username');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = { body: text, channelId, username };
      const { status } = await sendMessage(message);
      if (status !== 'ok') {
        toast.error(t('modals.toast.unknownError'));
      } else {
        setText('');
      }
    } catch {
      toast.error(t('socketErrors.timeout'));
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const messagesHistory = messages
    .map((message) => (
      <div className="text-break mb-2" key={message.id}>
        <b>{message.username}</b>
        :
        {filter.clean(message.body)}
      </div>
    ));

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channel ? channel.name : ''}`}</b>
        </p>
        <span>{t('chatPage.messagesBox.key', { count: messages.length })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messagesHistory}
      </div>
      <div className="mt-auto px-5 py-3">
        <form noValidate onSubmit={handleSubmit} className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input name="body" aria-label="Новое сообщение" onChange={handleChange} placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={text} />
            <button type="submit" disabled={!text} className="btn btn-group-vertical border-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessagesBox;
