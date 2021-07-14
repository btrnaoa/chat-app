import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as Types from './types.generated';

const defaultOptions = {};

export const CreateMessageDocument = gql`
  mutation CreateMessage($content: String!, $conversationId: ID!) {
    messageId: createMessage(content: $content, conversationId: $conversationId)
  }
`;
export type CreateMessageMutationFn = Apollo.MutationFunction<
  Types.CreateMessageMutation,
  Types.CreateMessageMutationVariables
>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateMessageMutation,
    Types.CreateMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CreateMessageMutation,
    Types.CreateMessageMutationVariables
  >(CreateMessageDocument, options);
}
export type CreateMessageMutationHookResult = ReturnType<
  typeof useCreateMessageMutation
>;
export type CreateMessageMutationResult = Apollo.MutationResult<Types.CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateMessageMutation,
  Types.CreateMessageMutationVariables
>;
export const LoginUserDocument = gql`
  mutation LoginUser($conversationName: String, $username: String!) {
    userConversation: loginUser(
      conversationName: $conversationName
      username: $username
    ) {
      conversation {
        id
      }
      user {
        id
      }
    }
  }
`;
export type LoginUserMutationFn = Apollo.MutationFunction<
  Types.LoginUserMutation,
  Types.LoginUserMutationVariables
>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      conversationName: // value for 'conversationName'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.LoginUserMutation,
    Types.LoginUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.LoginUserMutation,
    Types.LoginUserMutationVariables
  >(LoginUserDocument, options);
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>;
export type LoginUserMutationResult = Apollo.MutationResult<Types.LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  Types.LoginUserMutation,
  Types.LoginUserMutationVariables
>;
export const StartConversationDocument = gql`
  mutation StartConversation($userId: String!) {
    conversationId: startConversation(userId: $userId)
  }
`;
export type StartConversationMutationFn = Apollo.MutationFunction<
  Types.StartConversationMutation,
  Types.StartConversationMutationVariables
>;

/**
 * __useStartConversationMutation__
 *
 * To run a mutation, you first call `useStartConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startConversationMutation, { data, loading, error }] = useStartConversationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useStartConversationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.StartConversationMutation,
    Types.StartConversationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.StartConversationMutation,
    Types.StartConversationMutationVariables
  >(StartConversationDocument, options);
}
export type StartConversationMutationHookResult = ReturnType<
  typeof useStartConversationMutation
>;
export type StartConversationMutationResult = Apollo.MutationResult<Types.StartConversationMutation>;
export type StartConversationMutationOptions = Apollo.BaseMutationOptions<
  Types.StartConversationMutation,
  Types.StartConversationMutationVariables
>;
export const GetConversationDocument = gql`
  query GetConversation($id: ID!) {
    conversation(id: $id) {
      id
      name
      users {
        id
        name
      }
      messages {
        id
        content
        createdAt
        user {
          name
        }
      }
    }
  }
`;

/**
 * __useGetConversationQuery__
 *
 * To run a query within a React component, call `useGetConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetConversationQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetConversationQuery,
    Types.GetConversationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetConversationQuery,
    Types.GetConversationQueryVariables
  >(GetConversationDocument, options);
}
export function useGetConversationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetConversationQuery,
    Types.GetConversationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetConversationQuery,
    Types.GetConversationQueryVariables
  >(GetConversationDocument, options);
}
export type GetConversationQueryHookResult = ReturnType<
  typeof useGetConversationQuery
>;
export type GetConversationLazyQueryHookResult = ReturnType<
  typeof useGetConversationLazyQuery
>;
export type GetConversationQueryResult = Apollo.QueryResult<
  Types.GetConversationQuery,
  Types.GetConversationQueryVariables
>;
export const GetConversationsDocument = gql`
  query GetConversations {
    conversations {
      id
      name
      users {
        id
        name
      }
    }
  }
`;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetConversationsQuery,
    Types.GetConversationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetConversationsQuery,
    Types.GetConversationsQueryVariables
  >(GetConversationsDocument, options);
}
export function useGetConversationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetConversationsQuery,
    Types.GetConversationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetConversationsQuery,
    Types.GetConversationsQueryVariables
  >(GetConversationsDocument, options);
}
export type GetConversationsQueryHookResult = ReturnType<
  typeof useGetConversationsQuery
>;
export type GetConversationsLazyQueryHookResult = ReturnType<
  typeof useGetConversationsLazyQuery
>;
export type GetConversationsQueryResult = Apollo.QueryResult<
  Types.GetConversationsQuery,
  Types.GetConversationsQueryVariables
>;
export const GetUsersOnlineDocument = gql`
  query GetUsersOnline {
    usersOnline {
      id
      name
    }
  }
`;

/**
 * __useGetUsersOnlineQuery__
 *
 * To run a query within a React component, call `useGetUsersOnlineQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersOnlineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersOnlineQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersOnlineQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetUsersOnlineQuery,
    Types.GetUsersOnlineQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetUsersOnlineQuery,
    Types.GetUsersOnlineQueryVariables
  >(GetUsersOnlineDocument, options);
}
export function useGetUsersOnlineLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUsersOnlineQuery,
    Types.GetUsersOnlineQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetUsersOnlineQuery,
    Types.GetUsersOnlineQueryVariables
  >(GetUsersOnlineDocument, options);
}
export type GetUsersOnlineQueryHookResult = ReturnType<
  typeof useGetUsersOnlineQuery
>;
export type GetUsersOnlineLazyQueryHookResult = ReturnType<
  typeof useGetUsersOnlineLazyQuery
>;
export type GetUsersOnlineQueryResult = Apollo.QueryResult<
  Types.GetUsersOnlineQuery,
  Types.GetUsersOnlineQueryVariables
>;
export const OnNewMessageDocument = gql`
  subscription OnNewMessage($conversationId: ID!) {
    newMessage(conversationId: $conversationId) {
      id
      content
      createdAt
      user {
        name
      }
    }
  }
`;

/**
 * __useOnNewMessageSubscription__
 *
 * To run a query within a React component, call `useOnNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewMessageSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useOnNewMessageSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    Types.OnNewMessageSubscription,
    Types.OnNewMessageSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    Types.OnNewMessageSubscription,
    Types.OnNewMessageSubscriptionVariables
  >(OnNewMessageDocument, options);
}
export type OnNewMessageSubscriptionHookResult = ReturnType<
  typeof useOnNewMessageSubscription
>;
export type OnNewMessageSubscriptionResult = Apollo.SubscriptionResult<Types.OnNewMessageSubscription>;
