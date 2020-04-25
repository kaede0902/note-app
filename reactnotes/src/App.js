import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import 'firebase/firestore';
import { firestore } from './Config/config';
import firebase from 'firebase/app';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.app = firebase.app();
    this.ref = firebase.firestore().collection('notes');
    this.unsubscribe = null;
    this.state = {notes: []};
  }
  onCollectionUpdate = (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach(doc =>{
      const noteContent = doc.data();
      notes.push({
        key: doc.id,
        doc,
        noteContent,
      });
    });
    this.setState({notes});
  }
  componentWillMount() {
    this.unsubscribe = this.ref.onSnapshot(
      this.onCollectionUpdate
    );
    //const previousNotes = this.state.notes;
    //this.db.on('child_added', snap => {
    //  previousNotes.push({
    //    id: snap.key,
    //    noteContent: snap.val().noteContent,
    //  });
    //  this.setState({
    //    notes: previousNotes,
    //  })
    //})
  }

  addNote(note) {
    this.db.push().set(
      { noteContent: note }
    )
    console.log(this.state.notes);
  }
  //
  //                <Note noteContent={note.noteContent} 
  //                noteId={note.id} key={note.id}/>

  render() {
    return (
      <div className = "notesWrapper">
        <div className="notesHeader">
          <div className="heading">
            React and Firebase Note App
          </div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map(
              (note) => {
                return(
                  <h1>{note.key}</h1>
                  <h2 key={note.id}>{note.noteContent}</h2>
                )
              }
            )
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App;
