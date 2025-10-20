import React, { useContext, useEffect, useState, useRef } from 'react'
import {Link} from 'react-router-dom'
import NoteContext from '../Context/Notes/noteContext'
import Noteitem from './Noteitem';
import AlertContext from '../Context/Alert/alertContext';


const Notes = () => {
  const aContext = useContext(AlertContext)
  const { triggerAlert  } = aContext

  const context = useContext(NoteContext) ;
  const { notes, getNotes, editNote } = context ; 

  const [note, setNote] = useState({ id: "" , etitle: "" , edescription: "", etags: "" })

  const onChange = (e) => {
    setNote({...note , [e.target.name]: e.target.value}) ;
  }
  
  const ref = useRef(null)
  const closeRef = useRef(null)
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id , etitle: currentNote.title , edescription: currentNote.description, etags: currentNote.tags })
  }
  
  const editNoteBtn = () => {
    // console.log("Updating note: " + note.id ) ;
    editNote( note.id, note.etitle, note.edescription, note.etags )
    closeRef.current.click();
    triggerAlert( 'update' , "The note has been updated!")
  }
  
  useEffect(() => {
    if( localStorage.getItem('token') ){
      getNotes();
    }
    // eslint-disable-next-line
  }, [])
  
  // console.log('Notes:', notes)
  return (
    <>
    { localStorage.getItem('token') ? 
      <div className="row my-4 py-4">
        <h2 className='my-3 text-center'>Your Notes</h2>
        
        {/* edit note modal - till line#76*/}
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launching Edit Modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                

              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title* <small>(min. length: 3)</small></label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={ note.etitle } minLength={3} required onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description*</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={ note.edescription } minLength={5} required onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags (Optional)</label>
                <input type="text" className="form-control" id="etags" name="etags" value={ note.etags } onChange={onChange}/>
              </div>


              </div>
              <div className="modal-footer">
                <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={editNoteBtn}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
        {
          (notes.length===0) ? <p>You have no notes.</p> :
          notes.map( (note) =>{
            return <Noteitem key={note._id} note={note} updateNote={updateNote}/>
          })
        }
      </div>
      : 
      <div className='container my-4'>
        <h1 className='text-center my-4'> Please Login to continue using iNotebook</h1>
        <p>Don't have an account? <Link to="/signup">Create an account here</Link></p>
        <p>Already have an account? <Link to="/login">Login Here</Link></p>
      </div> }
    </>
  )
}

export default Notes
