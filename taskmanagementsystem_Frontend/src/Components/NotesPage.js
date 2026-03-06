import React, { useEffect, useState } from "react";
import { getNotes } from "../Api/NoteApi";
import AddNote from "../Components/AddNote";
import NotesList from "../Components/NotesList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";

import "../Styles/NotesPage.css";

function NotesPage() {

  const { t } = useTranslation();
  const [notes, setNotes] = useState([]);

  const loadNotes = () => {
    getNotes().then(res => {
      setNotes(res.data);
    });
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="notes-page">

      <h1 className="notes-title">
        <FontAwesomeIcon icon={faNoteSticky} className="notes-icon" />
        {t("Notes")}
      </h1>

      <AddNote refresh={loadNotes} />

      <NotesList notes={notes} refresh={loadNotes} />

    </div>
  );
}

export default NotesPage;