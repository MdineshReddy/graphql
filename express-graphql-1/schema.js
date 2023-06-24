const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLSchema,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

let students = [
  {
    id: "1",
    name: "Dinesh Reddy",
    age: 24,
    isAdmin: false,
    group: "CSE",
    likes: ["Gaming", "Music"],
  },
];

const StudentType = new GraphQLObjectType({
  name: "student",
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    isAdmin: {
      type: GraphQLBoolean,
    },
    group: {
      type: GraphQLString,
    },
    likes: {
      type: new GraphQLList(GraphQLString),
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent) {
        return students;
      },
    },
    student: {
      type: StudentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return students.find((student) => student.id === args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        group: {
          type: new GraphQLEnumType({
            name: "StudentGroup",
            values: {
              CSE: { value: "Computer Science & Engineering" },
              ECE: { value: "Electrical and Electronics Engineering" },
              BT: { value: "Bio Technology" },
            },
          }),
          defaultValue: "Computer Science & Engineering",
        },
      },
      resolve(parent, args) {
        let student = {
          id: new Date().toTimeString(),
          name: args.name,
          age: args.age,
          isAdmin: false,
          group: args.group,
          likes: [],
        };
        students.push(student);
        return student;
      },
    },
    deleteStudent: {
      type: StudentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        let student = students.find((student) => student.id === args.id);
        students = students.filter((student) => student.id !== args.id);
        return student;
      },
    },
    addLikes: {
      type: StudentType,
      args: {
        id: {
          type: GraphQLID,
        },
        like: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        let stud;
        students = students.map((student) => {
          if (student.id === args.id) {
            stud = { ...student, likes: [...student.likes, args.like] };
            return stud;
          }
          return student;
        });
        return stud;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery,
});
