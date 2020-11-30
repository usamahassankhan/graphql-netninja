import React from 'react';
// import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';
// const getBooksQuery=gql`
// {
//     books{
//         name
//         id
//     }
// }
// `
function BookDetails(props) {
   console.log(props)
  function displayBookDetails(){
     const {book}=props.data
     if(book){
       return (
         <div>
           <h2>{book.name}</h2>
           <p>{book.genre}</p>
           <p>{book.author.name}</p>
<p> All boook by this author</p>
<ul className="other-book">
  {book.author.books.map(item=>{
    return <li>{item.name}</li>
  })}
</ul>
         </div>
       )
     }
     else{
       return(
         <div>No Books Selected</div>
       )
     }
   }
    return (
       
        <div id="book-details">
  {displayBookDetails()}
        </div>
    )
}

export default  graphql(getBookQuery,{options:(props)=>{
  return{
    variables:{
      id:props.bookid  
    }
  }
}})(BookDetails);
