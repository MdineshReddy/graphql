const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
