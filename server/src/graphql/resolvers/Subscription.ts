import { withFilter } from 'apollo-server-express';
import Conversation from '../../entities/Conversation';
import Message from '../../entities/Message';

export default {
  newMessage: {
    subscribe: (rootValue: any, args: any, context: any) =>
      withFilter(
        () => context.pubsub.asyncIterator('MESSAGE_CREATED'),
        (
          payload: { newMessage: Message },
          variables: { conversationId: Conversation['id'] },
        ) => payload.newMessage.conversation.id === variables.conversationId,
      )(rootValue, args, context),
  },
};
