const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://gautam:test123@react-graphql.trvcu8t.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log("mongdb is connected");
  }
);

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.use(cors());

app.listen(4000, () => {
  console.log("Server running");
});
