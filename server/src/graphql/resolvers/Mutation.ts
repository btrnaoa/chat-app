import { createMessage, createUser } from '../../api';
import { updateSubscriptions } from '../subscriptions';

export default {
  createMessage: async (_parent, { userId, content }) => {
    const { message_id } = await createMessage(userId, content);
    updateSubscriptions();
    return message_id;
  },
  createUser: async (_parent, { name }) => {
    const { user_id } = await createUser(name);
    return user_id;
  },
};
