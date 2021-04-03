import { getAllMessages } from '../../api';

export default {
  messages: {
    subscribe: async (_parent, _args, { pubsub }) => {
      const channel = 'ALL_CHAT';
      setTimeout(async () => pubsub.publish(channel, { messages: await getAllMessages() }), 0);
      return pubsub.asyncIterator([channel]);
    },
  },
};
