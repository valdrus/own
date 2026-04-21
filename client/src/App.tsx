import "./App.css";
import { Account } from "./components/Account/Account";
import { FetchNoteListView } from "./components/NotesListView/FetchNoteListView";

function App() {
  return (
    <div className="app">
      <Account />
      <FetchNoteListView />
    </div>
  );
}

export default App;
