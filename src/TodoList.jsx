  import { v4 as uuidv4 } from 'uuid';
  import {useState,useEffect} from "react";
  import "./TodoList.css"
  
 export default function TodoList(){
    let [todos,setTodos]=useState([{task :"Sample" , id:uuidv4(),isDone:false}]);
    let [newTodo,setNewTodo]=useState("");
    let [darkMode, setDarkMode] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    // ⬇️ This runs ONCE when component loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // ⬇️ This runs whenever "todos" changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
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
        <button className="todo-btn" onClick={AddNewTodo}>Add Task</button>
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
            <button className="task-btn delete" onClick={() => deleteTodo(todo.id)}>
              🗑 Delete
            </button>
            <button className="task-btn done" onClick={() => markAsDone1(todo.id)}>
              ✔ Done
            </button>
            <button className="task-btn" onClick={() => startEditing(todo.id, todo.task)}>
              ✏ Edit
            </button>
          </div>
        </>
      )}
    </li>
  ))}
           
        </ul>
        <br></br><br></br><br></br>
        {todos.length > 0 && (
        <button className="todo-btn" style={{ marginTop: '20px' }}  onClick={markAsDoneAll}>Mark As Done All </button>
        )}
    </div>
    );
};