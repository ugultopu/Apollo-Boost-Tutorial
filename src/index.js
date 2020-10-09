import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';
import 'dotenv/config';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      }
    })
  }
});

// Below is a "tagged template". The expression (usually a function)
// preceding a template literal (where that expression is the imported
// "gql" variable here) gets called with the template literal.
//
// More info at Template Literals page on MDN.
const GET_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

client
  .query({
    query: GET_ORGANIZATION,
  })
  .then(console.log);
