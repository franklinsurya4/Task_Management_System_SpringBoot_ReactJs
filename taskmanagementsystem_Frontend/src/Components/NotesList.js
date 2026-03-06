import React from "react";
import { deleteNote } from "../Api/NoteApi";
import { useTranslation } from "react-i18next";

function NotesList({ notes, refresh }) {

  const { t } = useTranslation();

  const handleDelete = (id) => {
    deleteNote(id).then(() => {
      refresh();
    });
  };

  return (
    <div className="notes-container">

      {notes.map((note) => (

        <div className="note-card" key={note.id}>

          <h3>{note.title}</h3>

          <p>{note.content}</p>

          <button onClick={() => handleDelete(note.id)}>
            {t("Delete")}
          </button>

        </div>

      ))}

    </div>
  );
}

export default NotesList;