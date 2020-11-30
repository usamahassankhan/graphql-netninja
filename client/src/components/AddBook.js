import React,{useState} from 'react';
import * as compose from 'lodash.flowright';
import {graphql} from 'react-apollo';
import {getAuthorsQuery,addBookMutation,getBooksQuery} from '../queries/queries';
// const getAuthorsQuery=gql`
// {
//     authors{
//         name
//         id
//     }
// }
// `
function AddBook(props) {
  const [state,setState]=useState({
      name:'',
      genre:'',
      authorid:'',
  }); 
function displayAuthors(){
        var data=props.getAuthorsQuery
        console.log(props)
        if(data.loading){
            return(<option>loading authors</option>);
        }
        else{
           return data.authors.map((author)=>{
               return(<option key={author.id} value={author.id}>{author.name}</option>);

           })
        }
    }
    // function submitForm(e){
    //     
    // }
    const submitForm=(e)=>{
           e.preventDefault();
         console.log(state); 
        props.addBookMutation({
            variables:{
                name:state.name,
                genre:state.genre,
                authorid:state.authorid
            },
        refetchQueries:[{query:getBooksQuery}]}
        );

    }
    return (
       
        <form id="add-book" onSubmit={submitForm}>
<div className="field">
<label>Book name</label>
<input type="text" onChange={(e)=>setState({...state,name:e.target.value})
    }/>
</div>
<div className="field">
<label>Genre</label>
<input type="text" onChange={(e)=>setState({...state,genre:e.target.value})}/>
</div>
<div className="field">
<label>Author</label>
<select onChange={(e)=>setState({...state,authorid:e.target.value})}>
    <option>Select author</option>
    {displayAuthors()}
    </select>
</div>
<button onClick={submitForm}>+</button>

        </form>
    )
}

// export default graphql(getAuthorsQuery)(AddBook)
export default compose (
graphql(getAuthorsQuery,{name:'getAuthorsQuery'}),
graphql(addBookMutation,{name:'addBookMutation'}))
(AddBook);