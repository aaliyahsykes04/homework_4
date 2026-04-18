// useState lets us store and update data inside React 
// when state changes, React automatically re-renders the UI 

import {useState} from "React";

//Import the startung task list  just created
import initialTasks from "../data/initialtasks";

//a custom hookk is just a function that starts with 'use'
// it bundles all the state logic in one place so board.jsx stays clean
function useTasks() {
    //Tasks - the current array of task objects
    //setTasks - the function called to update that array 
    //initalTasks - the starting value (imported above)

    const [tasks, setTasks] = useState(initialTasks);

    //mark as completed 
    // .map() loops every task and return a new array 
    // the matching task gets a new copy with status: 'done'
    // all others are returned unchanged 
    function markComplete(id) {
        setTasks(tasks.map(task => 
            task.id ===id ? {...task, status:'done'} : task
        ));
    }

    //move a task back to todo 
    //same pattern - just flips status back to todo
    function markTodo(id) {
        setTasks (tasks.map(task => 
            task.id === id ? {... task, status: 'todo'} : task
        ));
    }

    //toggle description visible/hidden 
    // !task.expanded flips true->false or false->true
    function toggleExpanded(id) {
        setTasks (tasks.map(task =>
            task.id === id ? {...task, expanded: !task.expanded} : task
        ));
    }

    //remove a task 
    // .filter() keeps only tasks where the id doe NOT match 
    // the clicked task is left out  -> effectively deleted 
    function removeTask(id) {
        setTasks(tasks.filter ( task => task.id !== id));
    }

    //add a new task 
    // spreads the existing array and adds a new object at th end 
    // date.now() gives a unique id based on the current timestamp
    function addtask(title, description)  {
        setTasks([...tasks, {
            id: Date.now(),
            title,
            description,
            status: 'todo',
            expanded: false,
        }]);
    }

    //return everything board.jsx will need
    // -the tasks array (to render cards)
    // -all the functions (to pass as props to taskcard)
    return {
        tasks,
        markComplete,
        markTodo,
        toggleExpanded,
        removeTask,
        addtask
    };
}

export default useTasks;