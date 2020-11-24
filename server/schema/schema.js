const graphql =require("graphql");
const_=require("lodash");
const Book=require('../models/book');
const Author=require('../models/author');
const { GraphQLObjectType,GraphQLString,GraphQLSchema ,GraphQLID,GraphQLInt,GraphQLList}=graphql;
// var books=[
//   {name:'name of the wind',genre:'fantsy',id :'1',authorid:'1'},
//   {name:'name of the empire',genre:'sci fic',id :'2',authorid:'2'},
//   {name:'name of the shore',genre:'novel',id :'3',authorid:'3'},  
//   {name:'name of the fore',genre:'fantasy',id :'3',authorid:'3'}, 
// ];
// var authors=[
//   {name:'usama',age:'19',id :'1'},
//   {name:'usamah',age:'11',id :'2'},
//   {name:'usamahasankhan',age:'66',id :'3'},

// ];

var _ = require('underscore');


const BookType = new GraphQLObjectType({
  name: "Book",
  fields:()=>({
    id: { type:GraphQLID},
    name: { type:GraphQLString},
    genre: { type:GraphQLString},
    author:{
      type:AuthorType,
      resolve(parent,args){
        // return _.find(authors,{id:parent.authorid});
        return Author.findById(parent.authorid);
      }
    }
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields:()=>({
    id: { type:GraphQLID},
    name: { type:GraphQLString},
    age: { type:GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        // return _.filter(books,{authorid:parent.id});
 return Book.find({authorid:parent.id});
      }
    }
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        // return _.find(books,{id:args.id});
        // console.log(typeof(args.id));
        return Book.findById(args.id);
      },
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        // return _.find(authors,{id:args.id});
     return Author.findById(args.id) 
      }
    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        // return books
        return Book.find({})

      }
    }
    ,
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
        // return authors
        return  Author.find({});
      }
 
  
    }
  },
});
const Mutation=new GraphQLObjectType(
  {
    name:'Mutation',
    fields:{
      addAuthor:{
      type:AuthorType,
      args:{
        name:{type:GraphQLString},
        age:{type:GraphQLInt}},
        resolve(parent,args){
          let author=new Author({
            name:args.name,
            age:args.age
          });
         return author.save();
        }
      },
      addBook:{
        type:BookType,
        args:{
          name:{type:GraphQLString},
          genre:{type:GraphQLString},
          authorid:{type:GraphQLID}
        },
        resolve(parent,args){
           let book=new Book(
             {
               name:args.name,
               genre:args.genre,
               authorid:args.authorid
             }
           );
           return book.save(); 
        }
      }
    }}
  
)
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation 
});
