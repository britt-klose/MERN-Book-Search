import { gql } from '@apollo/client';

//login user
export const LOGIN_USER =gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        _id
        email
        password
    }
}
`;

//adduser
export const ADD_USER =gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username:$username, email: $email, password: $password){
        _id
        username
        email
        password
    }
}
`;

//savebook
export const SAVE_BOOK=gql`
mutation saveBook($){
    saveBook(input: BookInput){

    }
}
`;

//remove book
export const REMOVE_BOOK=gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $ bookId){
        bookId
    }
}
`;