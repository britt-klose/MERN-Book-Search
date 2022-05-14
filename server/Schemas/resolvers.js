
const {AuthenticationError}=require ('apollo-server-express');
const {signToken}=require ('../utils/auth');
const {User} = require('../models');

const resolvers = {
    Query: {
          me: async (parent, args, context)=>{
            if(context.user){
            const userData= User.findOne({_id: context.user_id}).select('-__v -password');
            return userData;
            }
            throw new AuthenticationError('Must login to interact.');
          },
    },
    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
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
          parent, {bookInput}, context) => {
          if (context.user){
            const updatedUser=await User.findByIdAndUpdate(
              {_id: context.user._id},
              {$push: {savedBooks: bookInput}},
              {new: true}
            );
            return updatedUser;
          }
          throw new AuthenticationError('You must be logged in.');
        },
        removeBook: async (parent, {bookId}, context) =>{
          if ( context.user){
            const updatedUser =await User.findOneAndUpdate(
              {_id: context.user._id},
              {$pull: {savedBooks: {bookId}}},
              {new: true}
            );
            return updatedUser;
          }
          throw new AuthenticationError ('You must be logged in.');
        },
    },
};
module.exports = resolvers;