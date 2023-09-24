import * as Types from "../../types";

import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
const defaultOptions = {} as const;
export type VerifyQueryVariables = Types.Exact<{
  request: Types.VerifyRequest;
}>;

export type VerifyQuery = { __typename?: "Query"; verify: boolean };

export type ChallengeQueryVariables = Types.Exact<{
  request: Types.ChallengeRequest;
}>;

export type ChallengeQuery = {
  __typename?: "Query";
  challenge: { __typename?: "AuthChallengeResult"; id: any; text: string };
};

export type AuthenticateMutationVariables = Types.Exact<{
  request: Types.SignedAuthChallenge;
}>;

export type AuthenticateMutation = {
  __typename?: "Mutation";
  authenticate: {
    __typename?: "AuthenticationResult";
    accessToken: any;
    refreshToken: any;
  };
};

export type ProfilesQueryVariables = Types.Exact<{
  request: Types.ProfilesRequest;
}>;

export type ProfilesQuery = {
  __typename?: "Query";
  profiles: {
    __typename?: "PaginatedProfileResult";
    items: Array<{ __typename?: "Profile"; id: any }>;
    pageInfo: {
      __typename?: "PaginatedResultInfo";
      next?: any | null;
      prev?: any | null;
    };
  };
};

export const VerifyDocument = gql`
  query Verify($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

/**
 * __useVerifyQuery__
 *
 * To run a query within a React component, call `useVerifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useVerifyQuery(
  baseOptions: Apollo.QueryHookOptions<VerifyQuery, VerifyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VerifyQuery, VerifyQueryVariables>(
    VerifyDocument,
    options
  );
}
export function useVerifyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VerifyQuery, VerifyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VerifyQuery, VerifyQueryVariables>(
    VerifyDocument,
    options
  );
}
export type VerifyQueryHookResult = ReturnType<typeof useVerifyQuery>;
export type VerifyLazyQueryHookResult = ReturnType<typeof useVerifyLazyQuery>;
export type VerifyQueryResult = Apollo.QueryResult<
  VerifyQuery,
  VerifyQueryVariables
>;
export const ChallengeDocument = gql`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      id
      text
    }
  }
`;

/**
 * __useChallengeQuery__
 *
 * To run a query within a React component, call `useChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useChallengeQuery(
  baseOptions: Apollo.QueryHookOptions<ChallengeQuery, ChallengeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    options
  );
}
export function useChallengeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChallengeQuery,
    ChallengeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    options
  );
}
export type ChallengeQueryHookResult = ReturnType<typeof useChallengeQuery>;
export type ChallengeLazyQueryHookResult = ReturnType<
  typeof useChallengeLazyQuery
>;
export type ChallengeQueryResult = Apollo.QueryResult<
  ChallengeQuery,
  ChallengeQueryVariables
>;
export const AuthenticateDocument = gql`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;
export type AuthenticateMutationFn = Apollo.MutationFunction<
  AuthenticateMutation,
  AuthenticateMutationVariables
>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAuthenticateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateMutation,
    AuthenticateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AuthenticateMutation,
    AuthenticateMutationVariables
  >(AuthenticateDocument, options);
}
export type AuthenticateMutationHookResult = ReturnType<
  typeof useAuthenticateMutation
>;
export type AuthenticateMutationResult =
  Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateMutation,
  AuthenticateMutationVariables
>;
export const ProfilesDocument = gql`
  query Profiles($request: ProfilesRequest!) {
    profiles(request: $request) {
      items {
        id
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;

/**
 * __useProfilesQuery__
 *
 * To run a query within a React component, call `useProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfilesQuery(
  baseOptions: Apollo.QueryHookOptions<ProfilesQuery, ProfilesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfilesQuery, ProfilesQueryVariables>(
    ProfilesDocument,
    options
  );
}
export function useProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfilesQuery,
    ProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfilesQuery, ProfilesQueryVariables>(
    ProfilesDocument,
    options
  );
}
export type ProfilesQueryHookResult = ReturnType<typeof useProfilesQuery>;
export type ProfilesLazyQueryHookResult = ReturnType<
  typeof useProfilesLazyQuery
>;
export type ProfilesQueryResult = Apollo.QueryResult<
  ProfilesQuery,
  ProfilesQueryVariables
>;
