import { atom } from 'recoil';

export const selectedChatState = atom({
  key: 'selectedChat',
  default: null,
});
