import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, edittodo, removeTodo } from './config/redux/reducers/todoSlice';

const App = () => {
  const todoVal = useRef();
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const dispatch = useDispatch();

  const selector = useSelector(state => state.todos.todo);
  console.log(selector);

  const addTodoInRedux = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      dispatch(edittodo({
        index: editIndex,
        title: todoVal.current.value
      }));
      setEditIndex(null);
      setEditTitle('');
    } else {
      dispatch(addTodo({
        title: todoVal.current.value
      }));
    }
    todoVal.current.value = '';
  };

  const deleteItemFromRedux = (index) => {
    console.log("delete todo", index);
    dispatch(removeTodo({ index }));
  };

  const edit = (index) => {
    console.log("edit", index);
    const itemToEdit = selector[index];
    todoVal.current.value = itemToEdit.title;
    setEditIndex(index);
  };

  return (
    <>
    <h1>ToDo App Using Redux</h1>
      <form>
        <input
          type="text"
          ref={todoVal}
          placeholder="Enter a todo"
        />
        <button onClick={addTodoInRedux}>
          {editIndex !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
      <ul>
        {selector.length > 0 ? selector.map((item, index) => (
          <li key={item.id}>
            {item.title}
            <button className="btn-edit" onClick={() => deleteItemFromRedux(index)}>Delete</button>
            <button className="btn-delete" onClick={() => edit(index)}>Edit</button>
          </li>
        )) : <h1>No Value Found!</h1>}
      </ul>
    </>
  );
};

export default App;
