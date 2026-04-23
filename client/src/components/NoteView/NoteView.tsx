import { FC } from "react";
import { Note } from "../../api/types";
import "./NoteView.css";

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface NoteViewProps {
  note: Note,
}

export const NoteView: FC<NoteViewProps> = ({ note }) => {
  return (
    <div className="note-view">
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(note.createdAt)}</p>
        <p className="note-view__title">{note.text}</p>
      </div>

      <p className="note-view__text">
        {`Какой-то очень большой текст`.repeat(10)}
      </p>
    </div >
  );
};
