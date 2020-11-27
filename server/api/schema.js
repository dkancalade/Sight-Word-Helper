const graphql = require('graphql');

const { buildSchema } = graphql;

// const { GraphQLSchema GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;

const schema = buildSchema(

  `type Words {
    id: ID!
    name: String!
    url: String!
  }

  type WordList {
    id: [ID!]!
    name: [String!]!
    course_id: Int!
  }

  type Course {
    course_id: ID!
    name: String!
  }

  type Query {
    course(name: String!): WordList!
    courses: [String!]!
  }`

);

// const schema = new GraphQLSchema({query: queryType})

// const CourseType = new GraphQLObjectType({
//   name: 'Course',
//   fields:
//     courseName: { type: GraphQLString},
//     courseId: { type: GraphQLInt}
// });

// const queryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     course: {
//       type: courseType,
//       args: {

//       },
//       resolve: (root, args, context, info) {

//       }
//     }
//   }

// });


module.exports = schema;



// getListsfromCourse(course: String!): [ String ]
//       getWordsFromList(list: String!): [ String ]

