import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

const Home = () => {

  return (
    <div id="background">
      <AddNote />
      <div className="container">
        <Notes />
      </div>
    </div>
  )
}

export default Home
