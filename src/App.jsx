// import './App.css'
import './TodoList.css'
import viteLogo from '/vite.svg'
import ListIcon from '@mui/icons-material/List';

import TodoList from './TodoList.jsx';

function App() {
 return( <div>
  <h2 className='heading'> <ListIcon style={{ verticalAlign:"middle",fontSize:"40px" ,marginRight:"8px" }}/>Todo App</h2>
        <TodoList/>
</div>
  )
};

export default App;
