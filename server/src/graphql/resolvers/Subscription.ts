import { withFilter } from 'apollo-server-express';

export default {
  newMessage: {
    subscribe: (rootValue: any, args: any, context: any) =>
      withFilter(
        () => context.pubsub.asyncIterator('MESSAGE_CREATED'),
        (payload, variables) =>
          payload.newMessage.conversation.id ===
          Number(variables.conversationId),
      )(rootValue, args, context),
  },
};
