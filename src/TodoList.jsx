  import { v4 as uuidv4 } from 'uuid';
  import {useState,useEffect} from "react";
  import "./TodoList.css"
  import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp'; 
 export default function TodoList(){
    let [todos,setTodos]=useState([]);

    let [newTodo,setNewTodo]=useState("");
    let [darkMode, setDarkMode] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    // ⬅️ Load from localStorage ONCE on mount
useEffect(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    try {
      setTodos(JSON.parse(storedTodos));
    } catch (err) {
      console.error("Error parsing todos from localStorage", err);
    }
  }
}, []);

// ⬅️ Save to localStorage whenever todos change
useEffect(() => {
  if (todos.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}, [todos]);

function toggleMode() {
  setDarkMode((prev) => !prev);
}


    function AddNewTodo(){
        setTodos((prevTodo)=>{
            return [...prevTodo,{task:newTodo, id:uuidv4(),isDone:false}]
        });
        setNewTodo("");
    }
    let UpdateTodo=(event)=>{
        setNewTodo(event.target.value);
    }
    function deleteTodo(id){
        setTodos((prevTodo)=>todos.filter((prevTodo)=>prevTodo.id  != id));
    }
    function markAsDone1(id){
        setTodos((prevTodos)=>prevTodos.map((todo)=>{
            if(todo.id==id){
            return {
                ...todo,
                isDone:true,
            }
        }else{
            return todo;
        }
        })
    )
    }
    function markAsDoneAll(){
    setTodos(todos.map((todo)=>{
        return {
            ...todo,
            isDone:true,
        };
    }));
}

function startEditing(id, task) {
  setEditingId(id);
  setEditedTask(task);
}

function saveEditedTask(id) {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, task: editedTask } : todo
    )
  );
  setEditingId(null);
  setEditedTask("");
}

    
    return (
    <div className={`todo-container ${darkMode ? 'dark' : 'light'}`}>
     <button className="mode-toggle" onClick={toggleMode}>
  {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
</button>

        <input placeholder="Add  a new task..." className="todo-input" onChange={UpdateTodo} value={newTodo}/>
        <br></br><br></br>
        <Button   variant="outlined"className="todo-btn" onClick={AddNewTodo}> Add Task  &nbsp;<AddCircleOutlineSharpIcon/></Button>
         <br></br><br></br><br></br><br></br> 
        <hr></hr>
         {todos.length === 0 && <p>No tasks left. ✅</p>}
        <h4>Tasks to be done :- </h4>
        <ul>
            {todos.map((todo) => (
    <li className="task-item" key={todo.id}>
      {editingId === todo.id ? (
        <>
          <input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={() => saveEditedTask(todo.id)}>Save</button>
        </>
      ) : (
        <>
          <span style={todo.isDone ? { textDecorationLine: 'line-through' } : {}}>
            {todo.task}
          </span>
          <div className="task-actions">
            {/* <button className="task-btn delete" onClick={() => deleteTodo(todo.id)}>
              🗑 Delete
            </button> */}
             <Button className="task-btn delete" variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteTodo(todo.id)}>
        Delete
      </Button>
           
            <Button variant="contained" color="success" className="task-btn done" onClick={() => markAsDone1(todo.id)} startIcon={<TaskAltSharpIcon/> }>
         Done
      </Button>
            
            <button className="task-btn" onClick={() => startEditing(todo.id, todo.task)}>
              <EditNoteSharpIcon/> Edit
            </button>
          </div>
        </>
      )}
    </li>
  ))}
           
        </ul>
        <br></br><br></br><br></br>
        {todos.length > 0 && (
        <button className="todo-btn" style={{ marginTop: '20px' }}  onClick={markAsDoneAll}>Mark As Done All <EventAvailableSharpIcon style={{ verticalAlign:"middle",fontSize:"30px" ,marginLeft:"8px" }}/> </button>
        )}
    </div>
    );
};