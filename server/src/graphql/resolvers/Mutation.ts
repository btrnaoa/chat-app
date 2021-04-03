import { createConversation, createMessage, createUser, getAllMessages } from '../../api';

export default {
  createConversation: async (_parent, { isPrivate }) => {
    const conversation_id = await createConversation(isPrivate);
    return conversation_id;
  },
  createMessage: async (_parent, { userId, content, conversationId }, { pubsub }) => {
    const message_id = await createMessage(userId, content, conversationId);
    pubsub.publish('ALL_CHAT', { messages: await getAllMessages() });
    return message_id;
  },
  createUser: async (_parent, { name }) => {
    const user_id = await createUser(name);
    return user_id;
  },
};
