const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

let data = {
  students: [
    {
      id: "1",
      name: "Rex",
      age: 22,
      isAdmin: false,
      group: "ECE",
      likes: ["Gaming", "Music"],
    },
  ],
};

const PORT = process.env.PORT || 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    context: data,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
