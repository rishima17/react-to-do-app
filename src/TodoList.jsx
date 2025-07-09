  import { v4 as uuidv4 } from 'uuid';
  import {useState} from "react";
  import "./TodoList.css"
  
 export default function TodoList(){
    let [todos,setTodos]=useState([{task :"Sample" , id:uuidv4(),isDone:false}]);
    let [newTodo,setNewTodo]=useState("");
    let [darkMode, setDarkMode] = useState(true);

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
            }

        })
    )
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
            {todos.map((todo)=>(
            <li className="task-item" key={todo.id}>
                <span style={todo.isDone ? {textDecorationLine:'line-through'}:{}}>{todo.task}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="task-actions">
                <button className="task-actions" onClick={()=>deleteTodo(todo.id)}>🗑 Delete</button>
                <button  className="task-actions" onClick={()=>markAsDone1(todo.id)}> ✔ Mark as done </button>
                </div>
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