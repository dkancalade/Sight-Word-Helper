const graphql = require('graphql');
const { buildSchema } = graphql;

// const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema} = graphql;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// // urls

// const UrlType = new GraphQLObjectType({
//   name: 'Word',
//   fields: () => {
//     return {
//       id: { type: GraphQLInt },
//       url: { type: GraphQLString}
//     }
//   }
// });
// // //Lists

// const ListType = new GraphQLObjectType({
//   name: 'List',
//   fields: () => {
//     return {
//       id: { type: GraphQLInt },
//       name: { type: GraphQLString }
//     }
//   }
// });

// // create relationships between types

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     list: {
//       type: ListType,
//       args: {id: {type: GraphQLInt}},
//       resolve(parent, args) {
//         //code to get data from db / other sources
//         console.log('hi');
//       }
//     }
//   }

// });



module.exports = schema;