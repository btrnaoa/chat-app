export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID'];
  messages: Array<Message>;
  name?: Maybe<Scalars['String']>;
  userConversations: Array<UserConversation>;
  users: Array<User>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  conversation: Conversation;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToConversation: Scalars['ID'];
  createConversation: Scalars['ID'];
  createMessage: Scalars['ID'];
  createUser: Scalars['ID'];
};

export type MutationAddUserToConversationArgs = {
  conversationId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type MutationCreateConversationArgs = {
  name?: Maybe<Scalars['String']>;
};

export type MutationCreateMessageArgs = {
  content: Scalars['String'];
  conversationId: Scalars['ID'];
};

export type MutationCreateUserArgs = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  conversation?: Maybe<Conversation>;
  conversations: Array<Conversation>;
  findConversationByUser?: Maybe<Conversation>;
  usersOnline: Array<User>;
};

export type QueryConversationArgs = {
  id: Scalars['ID'];
};

export type QueryFindConversationByUserArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type SubscriptionNewMessageArgs = {
  conversationId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  conversations: Array<UserConversation>;
  id: Scalars['ID'];
  isOnline: Scalars['Boolean'];
  name: Scalars['String'];
  userConversations: Array<UserConversation>;
};

export type UserConversation = {
  __typename?: 'UserConversation';
  conversation: Conversation;
  user: User;
};

export type AddUserToConversationMutationVariables = Exact<{
  conversationId: Scalars['ID'];
  userId: Scalars['ID'];
}>;

export type AddUserToConversationMutation = { __typename?: 'Mutation' } & {
  conversationId: Mutation['addUserToConversation'];
};

export type CreateConversationMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
}>;

export type CreateConversationMutation = { __typename?: 'Mutation' } & {
  conversationId: Mutation['createConversation'];
};

export type CreateMessageMutationVariables = Exact<{
  content: Scalars['String'];
  conversationId: Scalars['ID'];
}>;

export type CreateMessageMutation = { __typename?: 'Mutation' } & {
  messageId: Mutation['createMessage'];
};

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  userId: Mutation['createUser'];
};

export type FindConversationByUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FindConversationByUserQuery = { __typename?: 'Query' } & {
  conversation?: Maybe<
    { __typename?: 'Conversation' } & Pick<Conversation, 'id'>
  >;
};

export type GetConversationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetConversationQuery = { __typename?: 'Query' } & {
  conversation?: Maybe<
    { __typename?: 'Conversation' } & Pick<Conversation, 'id' | 'name'> & {
        users: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>;
        messages: Array<
          { __typename?: 'Message' } & Pick<
            Message,
            'id' | 'content' | 'createdAt'
          > & { user: { __typename?: 'User' } & Pick<User, 'name'> }
        >;
      }
  >;
};

export type GetConversationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetConversationsQuery = { __typename?: 'Query' } & {
  conversations: Array<
    { __typename?: 'Conversation' } & Pick<Conversation, 'id' | 'name'> & {
        users: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>;
      }
  >;
};

export type GetUsersOnlineQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersOnlineQuery = { __typename?: 'Query' } & {
  usersOnline: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>;
};

export type OnNewMessageSubscriptionVariables = Exact<{
  conversationId: Scalars['ID'];
}>;

export type OnNewMessageSubscription = { __typename?: 'Subscription' } & {
  newMessage: { __typename?: 'Message' } & Pick<
    Message,
    'id' | 'content' | 'createdAt'
  > & { user: { __typename?: 'User' } & Pick<User, 'name'> };
};
