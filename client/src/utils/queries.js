import { gql } from '@apollo/client';

//GET_ME query
export const QUERY_ME =gql`
query me {
    user{
        _id
        username
        email
        password
        bookCount
        savedBooks
    }
}
`;

