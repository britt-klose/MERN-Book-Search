

const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks:[Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput{
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }
  
  type Query {
    users:[User]
    user(username: String!): User
    savedBooks(username: String): [Book]
    me: User
  }

  type Auth{
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!):Auth
    addUser(username:String!, email: String!, password: String!):Auth
    saveBook(input: BookInput): Book
    removeBook(bookId: ID!):Book
  }
`;


module.exports = typeDefs;