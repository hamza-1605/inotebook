import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/noteContext';

const Noteitem = (props) => {

  const context = useContext(NoteContext)
  const {deleteNote} = context ;

  const {note, updateNote} = props
  return (
    <div className='col-md-3 my-3'>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{(note.tags === "") ? "General" : note.tags}</h6>
                <p className="card-text">{note.description}</p>
                <button className="btn btn-primary mx-1" onClick={ ()=>{ updateNote(note) }}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btn btn-danger mx-1" onClick={ ()=>{ deleteNote(note._id) }}><i className="fa-solid fa-trash"></i></button>
                
            </div>
        </div>
    </div>
  )
}

export default Noteitem
