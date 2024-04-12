document.addEventListener('DOMContentLoaded', function() {
  const addNoteBtn = document.getElementById('add-note-btn');
  const canvas = document.getElementById('canvas');
  const socket = io();

  addNoteBtn.addEventListener('click', function() {
    const note = createNote();
    canvas.appendChild(note);
    syncNotes();
  });

  function createNote() {
    const note = document.createElement('div');
    note.classList.add('note');
    note.contentEditable = true;
    note.addEventListener('input', function() {
      syncNotes();
    });
    return note;
  }

  function syncNotes() {
    const notes = [];
    const noteElements = document.querySelectorAll('.note');
    noteElements.forEach(function(noteElement) {
      notes.push(noteElement.innerHTML);
    });
    socket.emit('sync', notes);
  }

  socket.on('sync', function(notes) {
    canvas.innerHTML = '';
    notes.forEach(function(noteContent) {
      const note = createNote();
      note.innerHTML = noteContent;
      canvas.appendChild(note);
    });
  });
});
