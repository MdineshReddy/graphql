const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = `
    enum Group{
        CSE
        ECE
        BT
    }

    type Student {
        id: ID!
        name: String!
        age: Int!
        isAdmin: Boolean!
        group: Group!
        likes: [String!]
    }

    type Query {
        students: [Student]
        student (id: ID!): Student
    }

    type Mutation {
        addStudent (name: String!, age: Int!, group: String!, isAdmin: Boolean): Student
    }
`;

const resolvers = {
  Query: {
    students: (obj, args, context, info) => context.students,
    student: (_, { id }, context) =>
      context.students.find((student) => student.id === id),
  },
  Mutation: {
    addStudent: (_, args, context) => {
      const student = {
        id: new Date().toTimeString(),
        name: args.name,
        age: args.age,
        group: args.group,
        isAdmin: args.isAdmin || false,
        likes: [],
      };
      context.students = [...context.students, student];
      return student;
    },
  },
};

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = executableSchema;
