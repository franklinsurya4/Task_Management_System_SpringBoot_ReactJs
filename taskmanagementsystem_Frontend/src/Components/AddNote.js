import React, { useState } from "react";
import { addNote } from "../Api/NoteApi";
import { useTranslation } from "react-i18next";

function AddNote({ refresh }) {

  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {

    if (!title || !content) return;

    addNote({ title, content }).then(() => {

      setTitle("");
      setContent("");

      refresh();

    });

  };

  return (

    <div className="add-note">

      <input
        placeholder={t("Title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder={t("Content")}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {t("Add Note")}
      </button>

    </div>

  );

}

export default AddNote;