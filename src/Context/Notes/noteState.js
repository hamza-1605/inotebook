import { useContext, useState } from 'react';
import NoteContext from './noteContext.js' ;
import AlertContext from '../Alert/alertContext.js';

const NoteState = (props)=> {
  const aContext = useContext(AlertContext)
  const {triggerAlert} = aContext

  const host = "http://localhost:5000/api"

    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    const getNotes = async () => {
      const response = await fetch( host + "/notes/fetchnotes", {
        method: 'GET' ,
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      const json = await response.json();
      // console.log(json.notes);

      setNotes(json.notes);
    } 



    // Add a Note Function
    const addNote = async ( title, description, tags ) => {
      // API call for adding note
      const response = await fetch( `${host}/notes/createnote`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tags: (tags==="") ?"General" : tags })
      });
      
      // adding note functionality
      const jsonResponse = await response.json() ; 
      const addedNote = jsonResponse.newNote ;
      setNotes( notes.concat(addedNote) ) ;

    }



    // Delete a Note Function
    const deleteNote = async ( id ) => {
      // API call for deleting a note
      const response = await fetch( host + "/notes/deletenote/" + id , {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      console.log(await response.json()) ;

      // deleting note functionality
      console.log("Deleting note with id: " , id) ;
      const filteredNotes = notes.filter( (note) => { return note._id!== id }) ;
      setNotes( filteredNotes ) ;
      triggerAlert( 'delete' , "The note has been deleted!")
    }



    // Edit a Note Function
    const editNote = async ( id, title, description, tags) => {
      // API call for editing note
      const response = await fetch( `${host}/notes/updatenote/${id}` , {
        method: 'PUT' ,
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tags }) 
      });
      console.log( await response.json() ) ;

      // editing note functionality
      for(let i=0 ; i<notes.length ; i++){
        const checkNote = notes[i] ;
        if( checkNote._id === id ){
          notes[i].title = title ;
          notes[i].description = description ;
          notes[i].tags = tags ;
          break;
        }
      }
      const newNotes = JSON.parse( JSON.stringify( notes ) )
      setNotes( newNotes ) ;
    }


    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState