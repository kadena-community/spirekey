const getGraphqlHost = (networkId: string) => {
  if (networkId === 'development') return 'http://localhost:8080/graphql';
  if (networkId === 'testnet04')
    return 'https://graph.testnet.kadena.network/graphql';
  return 'https://graph.kadena.network/graphql';
};
export const getGraphClient = async (
  networkId: string,
  query: string,
  variables: any,
) => {
  const res = await fetch(getGraphqlHost(networkId), {
    method: 'POST',
    headers: {
      accept:
        'application/graphql-response+json, application/json, multipart/mixed',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      extensions: {},
      query,
      variables,
    }),
  });

  const { data } = await res.json();
  if (!data)
    throw new Error(
      `Could not query: ${query} with: ${JSON.stringify(variables)}`,
    );
  return data;
};
