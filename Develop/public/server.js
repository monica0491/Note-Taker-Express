//REQUIRED MODULES
var express = require("express");
var fs = require("fs");
var path = require("path");

var noteJSON = require("../db/db.json")

//CALLING THE EXPRESS METHOD 
var app = express();

//PORT THE SERVER IS LISTENING TO
var PORT = 3000;

//MIDDLEWARE
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//HTML ROUTES
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "notes.html"));
});

//API ROUTES

app.get("/api/notes/", function(req, res) {
    return res.json(noteJSON);
});

//WRITE NOTES TO JSON FILE.
app.post("/api/notes", function(req,res){
    const lastId = noteJSON.length ? Math.max(...(noteJSON.map(note => note.id))) : 0;
    const id = lastId + 1;
    noteJSON.push( { id, ...req.body} );
    res.json(noteJSON.slice(-1));
});

    // DELETING NOTES
app.delete('/api/notes/:id', (req, res) => {
    let note = noteJSON.find( ({ id }) => id === JSON.parse(req.params.id));
    // removes object at index of note id
    noteJSON.splice( noteJSON.indexOf(note), 1);
    res.end("Note deleted");
});


//STARTING THE SERVER
app.listen(PORT, function(){
    console.log("SERVER IS LISTENING PORT: " + PORT);
});

