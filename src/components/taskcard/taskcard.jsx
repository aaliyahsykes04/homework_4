// import react and usestate hook 
// usestate is used here for local state (expanded) that only this card needs 
import { useState } from "react";

//import the CSS file for this component 
//styles defined here only apply to taskcard 
import './taskcard.css';

//taskcard component 
//receives one tasks object and the handler functoins as props 
// props are passed down from board.jsc when it renders each card 
function taskcard ({ task, onComplete, onTodo, onRemove}) {
    // local state - only this card cares about expanded 
    //don't need to store this in the board's task array 
    // when the user clicks 'show details' only this card re-renders 
    const [expanded, setExpanded] = useState(false);

  return (
    // Apply "done" class conditionally — triggers strikethrough CSS
    <div className={`task-card ${task.status === "done" ? "done" : ""}`}>

      {/* ── TITLE ── */}
      <h3 className="task-title">{task.title}</h3>

      {/* ── DESCRIPTION ──
          Only renders when expanded is true.
          This is conditional rendering — a core React pattern.
          The && operator means: "if expanded is true, show this." */}
      {expanded && (
        <p className="task-description">{task.description}</p>
      )}

      {/* ── ACTION BUTTONS ── */}
      <div className="task-actions">

        {/* Toggle description visible / hidden */}
        <button
          className="btn-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {/* Change label based on current expanded value */}
          {expanded ? "Hide details" : "Show details"}
        </button>

        {/* ── CONDITIONAL RENDERING ──
            Show "Mark complete" if todo, show "Move to todo" if done.
            task.status comes from the Board's state via props. */}
        {task.status === "todo" ? (
          <button
            className="btn-complete"
            onClick={() => onComplete(task.id)}
          >
            ✓ Mark complete
          </button>
        ) : (
          <button
            className="btn-todo"
            onClick={() => onTodo(task.id)}
          >
            ↩ Move to todo
          </button>
        )}

        {/* Remove this task entirely.
            Passes task.id up to Board so it knows which one to delete. */}
        <button
          className="btn-remove"
          onClick={() => onRemove(task.id)}
        >
          ✕ Remove
        </button>

      </div>
    </div>
  );
}

export default TaskCard;
