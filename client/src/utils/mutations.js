import { gql } from '@apollo/client';

//login user
export const LOGIN_USER =gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
          _id
          username  
        }   
    }
}
`;

//adduser
export const ADD_USER =gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password){
        token
        user{
            _id
            username
        }
    }
}
`;

//savebook
export const SAVE_BOOK=gql`
mutation saveBook($bookInput: BookInput!){
    saveBook(bookInput: $bookInput){
        _id
        username
        email
        savedBooks{
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`;

//remove book
export const REMOVE_BOOK=gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId){
        _id
        username
        email
        savedBooks{
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`;