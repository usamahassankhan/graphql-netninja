import React, { useState } from 'react';
// import {gql} from 'apollo-boost';

import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';
// const getBooksQuery=gql`
// {
//     books{
//         name
//         id
//     }
// }
// `
function BookList(props) {
    // console.log(props);
    const [state,setState]=useState({
        selected:null
    });
   function displayBooks(){
   var  data=props.data;
    if(data.loading){
        return (<div>Loading books....</div>)
    }else{
        return data.books.map(book=>{
            return(
                <li key={book.id} onClick={(e)=>{setState({selected:book.id})}}>{book.name}</li>
            );
        })
    }}
    return(
        <div>
            <ul className="book-list">
              {displayBooks()}
          
            </ul>
            <BookDetails bookid={state.selected}/>
        </div>
    )
}

export default  graphql(getBooksQuery)(BookList)
