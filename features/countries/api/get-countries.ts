import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      currency
      languages {
        name
      }
      states {
        name
      }
      continent {
        code
        name
      }
    }
    continents {
      code
      name
    }
  }
`;
