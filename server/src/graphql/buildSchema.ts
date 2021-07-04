import path from 'path';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import ConversationResolver from './resolvers/ConversationResolver';
import MessageResolver from './resolvers/MessageResolver';
import UserResolver from './resolvers/UserResolver';

const fn = () =>
  buildSchema({
    resolvers: [ConversationResolver, MessageResolver, UserResolver],
    container: Container,
    emitSchemaFile: path.join(__dirname, 'schema.gql'),
  });

fn();

export default fn;
