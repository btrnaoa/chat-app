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
  createdBy?: Maybe<User>;
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
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
  createMessage: Scalars['ID'];
  loginUser: UserConversation;
  startConversation: Scalars['ID'];
};

export type MutationCreateMessageArgs = {
  content: Scalars['String'];
  conversationId: Scalars['ID'];
};

export type MutationLoginUserArgs = {
  conversationName?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type MutationStartConversationArgs = {
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  conversation?: Maybe<Conversation>;
  conversations: Array<Conversation>;
  usersOnline: Array<User>;
};

export type QueryConversationArgs = {
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

export type CreateMessageMutationVariables = Exact<{
  content: Scalars['String'];
  conversationId: Scalars['ID'];
}>;

export type CreateMessageMutation = { __typename?: 'Mutation' } & {
  messageId: Mutation['createMessage'];
};

export type LoginUserMutationVariables = Exact<{
  conversationName?: Maybe<Scalars['String']>;
  username: Scalars['String'];
}>;

export type LoginUserMutation = { __typename?: 'Mutation' } & {
  userConversation: { __typename?: 'UserConversation' } & {
    conversation: { __typename?: 'Conversation' } & Pick<Conversation, 'id'>;
    user: { __typename?: 'User' } & Pick<User, 'id'>;
  };
};

export type StartConversationMutationVariables = Exact<{
  userId: Scalars['String'];
}>;

export type StartConversationMutation = { __typename?: 'Mutation' } & {
  conversationId: Mutation['startConversation'];
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
