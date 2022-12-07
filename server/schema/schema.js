const qraphql = require("graphql");
const _ = require("lodash");

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID } = qraphql;

var dummyBooks = [
  { name: "book1", id: "1" },
  { name: "book2", id: "2" },
  { name: "book3", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to fetch data from db
        return _.find(dummyBooks, { id: args.id });
      },
    },
  },
});

exports.schema = new GraphQLSchema({
  query: RootQuery,
});
