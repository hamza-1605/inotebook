const express = require('express') ;
const router = express.Router() ;
const Note = require('../models/NotesSchema')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser') ;
const { route } = require('./auth');


//  Route 1: Read all notes  |   using GET: /api/notes/fetchnotes   |   Login Required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user})
        res.json({notes}) ;
        console.log("-- Notes are Displayed --")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error | Fetching Notes failed!")
    }
})




//  Route 2: Create a new note  |   using POST: /api/notes/createnote   |   Login Required
router.post('/createnote' , fetchuser, [
    body('title', "Please enter a valid title (min. 3 characters)").isLength({min:3}),
    body('description', "Please enter a valid description (min. 5 characters)").isLength({min:5}) 
] , async(req, res) => {
    // validating information about notes & return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    }
    
    try {
        // acquiring the values from the body
        const {title, description, tags} = req.body ;

        // Create a new note
        const createNote = new Note({
            title, description, tags, user: req.user
        })
        const newNote = await createNote.save() ;

        res.json({newNote});
        console.log("-- A note has been added! --");

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error - At Note Creation")
    }
} )




//  Route 3: Update an existing note  |   using PUT: /api/notes/updatenote/:id   |   Login Required
router.put('/updatenote/:id' , fetchuser , async (req, res) => {
    try {
        const {title, description, tags} = req.body ;
        
        // an empty new note object
        const newNote = {} 
        // updating the items only which are received
        if(title){ newNote.title = title};
        if(description){ newNote.description = description};
        if(tags){ newNote.tags = tags};
        
        // getting the note's id from the parameters and fetching the note from the database
        let fetchNote = await Note.findById(req.params.id) ;
        
        // Note exists or not?
        if(!fetchNote){ 
            return res.status(404).send("Note Not Found");
        }
        // Matching of:     The editor's id  &  Note's Owner id
        if(fetchNote.user.toString() !== req.user){
            return res.status(401).send("Request Not Allowed!");
        }
        // Updating the fetched Note
        fetchNote = await Note.findByIdAndUpdate(fetchNote.id, {$set: newNote}, {new: true} )
        // Sending the updated note
        res.json(fetchNote);
        console.log("-- Note has been updated --");
        
    } catch (error) {
        console.error(error.message) ;
        res.status(500).send("Internal Server Error - Updation Failed");
    }
})



//  Route 4: Delete an existing note  |   using DELETE: /api/notes/deletenote/:id   |   Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try{
        let delNote = await Note.findById(req.params.id) ;

        if(!delNote){
            return res.status(404).send("This note doesn't exists.")
        }
        
        if(delNote.user.toString() !== req.user){
            return res.status(401).send("Access Denied! You can't delete this note.")
        }

        delNote = await Note.findByIdAndDelete(req.params.id) ;
        res.json({"Deleted Note" : delNote}) ;
        console.log("-- The note has been deleted --") ;

    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error - Deletion of the note failed")
    }
})


module.exports = router