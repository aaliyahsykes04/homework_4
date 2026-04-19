// Import React's useState hook for managing the task list
import { useState } from "react";

// Import our custom hook — this gives us the tasks array
// and all the functions to update it
import useTasks from "../../hooks/useTasks";

// Import the child components Board will render
import TaskCard from "../taskcard/taskcard";
import StatsBar from "../statsbar/statsbar";

// Import the CSS file for this component
import "./board.css";


// ─────────────────────────────────────────
// Board COMPONENT
// This is the "parent" component — it owns the state
// and passes data + functions down to its children.
//
// Data flows ONE WAY in React:
//   Board (state lives here)
//     ↓ props
//   TaskCard / StatsBar (receive data, can't change it directly)
//     ↓ callbacks
//   Board (children call functions to request state changes)
// ─────────────────────────────────────────
function Board() {
  // ─────────────────────────────────────────
  // Pull everything out of our custom hook.
  // useTasks() handles all the state logic so
  // this component stays clean and readable.
  // ─────────────────────────────────────────
  const {
    tasks,
    markComplete,
    markTodo,
    toggleExpanded,
    removeTask,
    addTask,
  } = useTasks();
  
  // ─────────────────────────────────────────
  // LOCAL UI STATE
  // This only controls whether the "add task" form is visible.
  // It lives here (not in useTasks) because it's a UI concern,
  // not a data concern.
  // ─────────────────────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");


  // ─────────────────────────────────────────
  // HANDLE FORM SUBMIT
  // Called when the user clicks "Add" in the form.
  // Validates input, calls addTask(), then resets the form.
  // ─────────────────────────────────────────
  function handleAddTask() {
    // Don't add a task if the title is empty
    if (newTitle.trim() === "") return;

    // Call the function from our custom hook
    addTask(newTitle, newDescription);

    // Reset form fields and hide the form
    setNewTitle("");
    setNewDescription("");
    setShowForm(false);
  }
  // ─────────────────────────────────────────
  // DERIVED STATE
  // Filter the tasks array into two separate lists.
  // These are calculated fresh every render — not stored in state.
  // ─────────────────────────────────────────
  const todoTasks = tasks.filter(task => task.status === "todo");
  const doneTasks = tasks.filter(task => task.status === "done");


  return (
    <div className="board">

      {/* ── HEADER ── */}
      <div className="board-header">
        <h1 className="board-title">Task Board</h1>

        {/* Toggle the add-task form on/off */}
        <button
          className="btn-add"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* ── ADD TASK FORM ──
          Only renders when showForm is true.
          The && pattern: "if showForm is true, render this block." */}
      {showForm && (
        <div className="add-task-form">

          <input
            type="text"
            placeholder="Task title..."
            value={newTitle}
            // onChange fires on every keystroke and updates newTitle state
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-input"
          />

          <textarea
            placeholder="Task description (optional)..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="form-textarea"
          />

          <button className="btn-submit" onClick={handleAddTask}>
            Add Task
          </button>

        </div>
      )}

      {/* ── STATS BAR ──
          Pass the full tasks array as a prop.
          StatsBar will derive all its numbers from it. */}
      <StatsBar tasks={tasks} />


      {/* ── COLUMNS ── */}
      <div className="board-columns">

        {/* ── TODO COLUMN ── */}
        <div className="column">
          <div className="column-header">
            <span className="column-title">To Do</span>
            {/* Show count of tasks in this column */}
            <span className="column-count">{todoTasks.length}</span>
          </div>

                   {/* ── .map() TO RENDER A LIST OF CARDS ──
              Loop over todoTasks and render one TaskCard per task.
              key={task.id} is required — it helps React track which
              card is which when the list changes. Never use the index
              as a key if items can be removed or reordered. */}
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={markComplete}
              onTodo={markTodo}
              onRemove={removeTask}
            />
          ))}

          {/* Show a hint if the column is empty */}
          {todoTasks.length === 0 && (
            <p className="empty-hint">No tasks yet</p>
          )}
        </div>


        {/* ── DONE COLUMN ── */}
        <div className="column">
          <div className="column-header">
            <span className="column-title">Done</span>
            <span className="column-count">{doneTasks.length}</span>
          </div>

          {doneTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={markComplete}
              onTodo={markTodo}
              onRemove={removeTask}
            />
          ))}

          {doneTasks.length === 0 && (
            <p className="empty-hint">Nothing completed yet</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Board; 