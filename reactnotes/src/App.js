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
      const noteContent = doc.data().noteContent;
      notes.push({
        id: doc.data().id,
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
  }
  //
// <Note noteContent={note.noteContent} 
//  noteId={note.id} key={note.id}/>

//  ListItem(props) {
//    return <li>props.value</li>;
//  } 
//  NumberList(props) {
//    const numbers = props.numbers;
//    const listItems = numbers.map((number) => 
//      <ListItem key={number.id}>{number} />
//    );
//  }


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
                console.log(note);
                return(
                    <Note noteContent=
                      {note.noteContent} 
                      noteId={note.id} 
                      key={note.id}
                    />     
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
