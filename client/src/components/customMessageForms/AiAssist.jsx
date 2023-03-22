import { usePostAiAssistMutation } from '@/state/api';
import React, { useEffect, useState } from 'react';
import MessageFormUI from './MessageFormUI';

// it will be auto support when u stop typing message
// 文章の途中で入力が止まると(1sec)、続きの文章を補完してくれる
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState('');

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage('');
    setAttachment('');
  };

  // it will be auto support when u stop typing message
  // 文章の途中で入力が止まると、続きの文章を補完してくれる
  const debouncedValue = useDebounce(message, 1000); // 1000 は 1 秒入力が止まっている時

  // useEffect は重複して使える // useEffect 重複 1
  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]); // eslint-disable-line

  // whey type a message, support message display different color
  // 入力文字と、補完文字の色を変える
  const handleKeyDown = (e) => {
    // handle enter and tab
    // enter key is 9, tab key is 13
    // input 内に input を作って、enter or tub を押して確定しない限り、入力文章と補完文章は確定されない
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText('');
  };

  // useEffect は重複して使える // useEffect 重複 2
  useEffect(() => {
    if (resultAssist.data?.text) {
      // resultAssist.data?.text　補完メッセージがあるならという事
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); // eslint-disable-line

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
