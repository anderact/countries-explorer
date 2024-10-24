import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountry {
    countries {
      code
      name
      capital
      languages {
        code
        name
        native
      }
      currency
      states {
        name
      }
    }
  }
`;
