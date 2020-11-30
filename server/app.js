const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema=require('./schema/schema');
const mongoose=require('mongoose');
const app =express();
const cors=require('cors');
mongoose.connect("mongodb+srv://usama:se2017120@cluster0.lqkdl.mongodb.net/<dbname>?retryWrites=true&w=majority");

mongoose.connection.once('open',()=>{
  console.log("connected to database");
})

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema:schema,
    graphiql:true
   
  }),
);
app.listen(4000,()=>{
  console.log('now listning request on port 4000')
});