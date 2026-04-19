// Import the Board component — this is the root of our UI
import Board from "./components/board/board";

// Import global styles
import "./app.css";


// ─────────────────────────────────────────
// App COMPONENT
// This is the root component of the entire application.
// It's the top of the component tree — everything lives inside it.
//
// Component tree:
//   App
//     └── Board
//           ├── StatsBar
//           └── TaskCard (x many)
// ─────────────────────────────────────────
function App() {
  return (
    <div className="app">
      <Board />
    </div>
  );
}

export default App;