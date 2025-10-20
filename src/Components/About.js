import React from 'react' 
import security from './security.jpg'
import cloud from './cloud.jpg'
import '../index.css'

const About = () => {

  return (
    <div id="background">
      <div className="container py-4">
        <h1 className='text-center pb-4'>Welcome to iNotebook!</h1>

        <div className="d-flex my-4 pt-3 shadow-sm p-3 mb-5 bg-body rounded">
          <img src="https://media.istockphoto.com/id/1039829056/photo/directly-above-shot-of-black-spiral-notebook-and-pen-on-wooden-table.jpg?s=612x612&w=0&k=20&c=z3UDBbYeIEnuePtPIqrUP6P0mX9Wyjg4auocebM9voE=" className="rounded me-2" alt="notebook_image" style={{width: "27vw" , paddingRight: "20px"}} />
          <div className='d-flex flex-column justify-content-center p-4'>
            <h5>What is iNotebook?</h5>
            <p>iNotebook is a versatile note-taking application designed to help users effortlessly organize, manage, and access their personal notes anytime, anywhere. It caters to individuals seeking a seamless experience for noting down ideas, tasks, and important information.</p>
          </div>
        </div>
        
        <div className="d-flex my-4 pt-3 shadow-sm p-3 mb-5 bg-body rounded">
          <div className='d-flex flex-column justify-content-center p-4'>
            <h5>Why use iNotebook?</h5>
            <p>Your privacy is our priority. iNotebook provides robust security measures, including encrypted storage and secure authentication, ensuring that your notes are safe from unauthorized access. You can confidently store sensitive information, knowing that it is protected.</p>
          </div>
          <img src={security} className="rounded me-2" alt="notebook_image" style={{width: "27vw" , paddingLeft: "20px"}} />
        </div>

        <div className="d-flex my-4 pt-3 shadow-sm p-3 mb-5 bg-body rounded">
          <img src={cloud} className="rounded me-2" alt="notebook_image" style={{width: "27vw" , paddingRight: "20px"}} />
          <div className='d-flex flex-column justify-content-center p-4'>
            <h5>Cloud based storage</h5>
            <p>iNotebook offers seamless cloud storage capabilities, allowing you to access your notes from any device, anywhere, at any time. With automatic backups and synchronization, you can rest assured that your valuable information is always safe and readily available.</p>
          </div>
        </div>

        <div className="d-flex my-4 pt-3 shadow-sm p-3 mb-5 bg-body rounded">
          <div className='d-flex flex-column justify-content-center p-4'>
            <h5>User-Friendly Interface</h5>
            <p>The application boasts a clean and modern interface, providing an enjoyable experience for users of all ages. With easy navigation and customizable options, iNotebook adapts to your unique needs, allowing you to focus on what matters most—your ideas.</p>
          </div>
          <img src="https://media.istockphoto.com/id/814593928/photo/office-wood-table-with-blank-notepad-pencil.jpg?s=612x612&w=0&k=20&c=0rO_EfdKzSV5XX6tpPSyHKc9mtI7DZhvEQxxVQ6t2lc=" className="rounded me-2" alt="notebook_image" style={{width: "29vw" , paddingLeft: "20px"}} />
        </div>

      </div>
    </div>
  )
}

export default About
