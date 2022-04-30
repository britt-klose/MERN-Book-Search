//Define the query and mutation functionality to work with the Mongoose models.
//Hint: Use the functionality in the user-controller.js as a guide.

const { User} = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return Tech.find({});
          },
          matchups: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Matchup.find(params);
          },
    },
    Mutation: {
        createMatchup: async (parent, args) => {
          const matchup = await Matchup.create(args);
          return matchup;
        },
        createVote: async (parent, { _id, techNum }) => {
          const vote = await Matchup.findOneAndUpdate(
            { _id },
            { $inc: { [`tech${techNum}_votes`]: 1 } },
            { new: true }
          );
          return vote;
        },
      },
}
module.exports = resolvers;