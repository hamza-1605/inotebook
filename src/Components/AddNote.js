import React, { useState, useContext } from 'react'
import NoteContext from '../Context/Notes/noteContext'
import AlertContext from '../Context/Alert/alertContext'

const AddNote = () => {

    const aContext = useContext(AlertContext)
    const { alertContent , triggerAlert  } = aContext

    const context = useContext(NoteContext) ;
    const { addNote } = context ;

    const [note, setNote] = useState({title: "" , description: "", tags: ""})

    const onChange = (e) => {
        setNote({...note , [e.target.name]: e.target.value}) ;
    }

    const submitNote = (e) => {
        e.preventDefault(); 
        addNote( note.title , note.description , note.tags );
        setNote({title: "" , description: "", tags: ""}) ;
        triggerAlert( 'add' , "The note has been added successfully!")
    }

  return (
    <>
      {alertContent}
      {
        localStorage.getItem('token') &&
        <div className='container mt-4'>
          <h2 className='text-center'>Add a Note</h2>
          <form className='my-3' onSubmit={submitNote}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title* <small className='mx-4'><i>(min. length: 3)</i></small></label>
              <input type="text" className="form-control" id="title" name="title" value={note.title}  minLength={3} required onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description* <small className='mx-4'><i>(min. length: 5)</i></small></label>
              <input type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} required onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Tags <small><i>(Optional)</i></small></label>
              <input type="text" className="form-control" id="tags" name="tags" value={note.tags} onChange={onChange}/>
            </div>
            <button type='submit' className="btn btn-primary">Add Note</button>
          </form>
      </div>
      }
    </>
  )
}

export default AddNote
