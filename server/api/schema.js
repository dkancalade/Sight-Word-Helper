const graphql = require('graphql');

const { buildSchema } = graphql;

// const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQL} = graphql;

const schema = buildSchema(

  `type Words {
    id: ID!
    name: String!
    url: String!
  }

  type Course {
    course_id: [ID!]!
    name: [String!]!
  }

  type WordList {
    id: [ID!]!
    name: [String!]!
    course_id: [Int!]!
  }


  type Query {
    course(name: String!): WordList!
    courses: [String!]!
    words(listName: String!): [Words!]!
  }`

);


// const WordListType = new GraphQLObjectType({
//   name: 'WordList',
//   description: 'The lists that make up a course',
//   fields: {
//     id: { type: GraphQLInt},
//     name: { type: GraphQLString },
//     course_id: { type: GraphQLInt }
//   }
// });

// const CourseType = new GraphQLObjectType({
//   name: 'CourseList',
//   description: 'Retrieves the list of courses available to take',
//   fields: {
//     id: { type: GraphQLInt },
//     name: {type: GraphQLString}
//   }
// });

// const RootQueryType = new GraphQLObjectType({
//   name: 'Query',
//   description: 'Root Query',
//   fields: {
//     course: {
//       type: WordListType,
//       args: { name: {type: GraphQLString} },
//       resolve: (course, args, context, info) => {
//         const obj = { 'course': course.name };
//         return obj;
//       }
//     },
//     courses: {
//       type: CourseType,
//       resolve: (courses, args, context, info) => {
//         let obj = {'courses': courses.name}
//         return obj;
//       }
//     }
//   }
// });

// const schema = new GraphQLSchema({query: RootQueryType});

module.exports = schema;



// getListsfromCourse(course: String!): [ String ]
//       getWordsFromList(list: String!): [ String ]

