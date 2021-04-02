import { addSubscription } from '../subscriptions';
import { getAllMessages } from '../../api';

export default {
  messages: {
    subscribe: (_parent, _args, { pubsub }) => {
      const channel = Math.random().toString(36).slice(2, 15);
      const publish = async () => pubsub.publish(channel, { messages: await getAllMessages() });
      addSubscription(publish);
      return pubsub.asyncIterator(channel);
    },
  },
};
