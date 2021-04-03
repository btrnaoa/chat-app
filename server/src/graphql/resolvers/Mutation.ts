import { createMessage, createUser, getAllMessages } from '../../api';

export default {
  createMessage: async (_parent, { userId, content }, { pubsub }) => {
    const { message_id } = await createMessage(userId, content);
    pubsub.publish('ALL_CHAT', { messages: await getAllMessages() });
    return message_id;
  },
  createUser: async (_parent, { name }) => {
    const { user_id } = await createUser(name);
    return user_id;
  },
};
