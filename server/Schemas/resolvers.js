const { User} = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return Tech.find({});
          },
    }
module.exports = resolvers;