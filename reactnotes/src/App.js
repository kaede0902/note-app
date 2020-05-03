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
    this.ref = firebase.firestore().collection('notes');
    this.unsubscribe = null;
    this.state = {notes: []};
  }
  onCollectionUpdate = (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach(doc =>{
      const noteContent = doc.data().noteContent;
      const created_at = doc.data().created_at;
      notes.push({
        created_at,
        noteContent,
        doc,
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
    const prevNote = note;
    const created_at = new Date(); 
    // add to firestore notes
    this.ref.add({
      created_at: created_at,
      noteContent: prevNote,
    });
  }
//  render should be in func?
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
                      key={note.created_at}
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
