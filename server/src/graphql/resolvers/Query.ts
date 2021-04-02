import { getAllMessages } from '../../api';

export default {
  messages: async () => await getAllMessages(),
};
