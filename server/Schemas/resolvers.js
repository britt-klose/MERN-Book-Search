
const {AuthenticationError}=require ('apollo-server-express');
const {signToken}=require ('../utils/auth');
const {User, Book} = require('../models');

const resolvers = {
    Query: {
        user: async (parent, {username}) => {
            return User.findOne({username}).populate('savedBooks');
          },
          savedBooks: async (parent, { username }) => {
            const params = username ? {username} : {};
            return Book.find(params).sort({createdAt: -1});
          },
          me: async (parent, args, context)=>{
            if(context.user){
              return User.findOne({_id: context.user_id}).populate('savedBooks');
            }
            throw new AuthenticationError('Must login to interact.');
          },
    },
    Mutation: {
        addUser: async (parent,{username, email, password}) => {
          const user = await User.create({username, email, password});
          const token=signToken(user);
          return {token, user};
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({email});
          if(!user){
            throw new AuthenticationError('No user found with this email');
          }
          const correctPw=await user.isCorrectPassword(password);
          if (!correctPw){
            throw new AuthenticationError('incorrect password or email')
          }
            const token =signToken(user);
          return {token, user};
        },
        saveBook: async(
          parent, {input}, context) => {
          if (context.user){
            const updateList=await User.findOneAndUpdate(
              {_id: context.user._id},
              {$addToSet: {savedBooks: input}},
              {new: true, runvalidators: true}
            );
            return updateList;
          }
          throw new AuthenticationError('You must be logged in.');
        },
        removeBook: async (parent, {bookId}, context) =>{
          if ( context.user){
            const updateListbook =await User.findOneAndUpdate(
              {_id: context.user._id},
              {$pull: {savedBooks: {bookId: bookId}}},
              {new: true}
            );
            return updateList;
          }
          throw new AuthenticationError ('You must be logged in.');
        },
    },
};
module.exports = resolvers;