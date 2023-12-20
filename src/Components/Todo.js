import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  };



 const addTodo = () => {
  if (todo.trim() !== '') {
    const isDuplicate = todos.some((item) => item.list.toLowerCase() === todo.toLowerCase());

    if (isDuplicate) {
      setErrorMessage('Duplicate todo. Please enter a unique value.');
    } else {
      
      setTodos([ { list: todo, id: Date.now(), status: false },...todos]);
      console.log(todos);
      setTodo('');
      setErrorMessage('');
    }
  } else {
    setErrorMessage('Please enter a non-empty value');
  }

  if (editId) {
    const editTodo = todos.find((item) => item.id === editId);
    const updateTodo = todos.map((to) =>
      to.id === editTodo.id ? { id: to.id, list: todo } : { id: to.id, list: to.list }
    );
    setTodos(updateTodo);
    setEditId(0);
    setTodo('');
  }
};


  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });


  const onDelete =(id)=>{
    setTodos(todos.filter((todo) => todo.id !==id))
  }


  const onComplete = (id) =>{
    let complete = todos.map((list)=>{
        if(list.id === id){
            return ({...list , status : !list.status})
        }
        return list
    })
    setTodos(complete)
  }

  const onEdit = (id) =>{
    const editTodo = todos.find((item)=> item.id === id)
    if (!editTodo.status) {
    setTodo(editTodo.list)
    setEditId(editTodo.id)
    setErrorMessage("");
    }
    else {
      setTodo("");
      setEditId(0);
      setErrorMessage("Cannot edit a completed todo");
    }

  }

  const onDeleteAll = () =>{
    
    setTodos([]);
  
  }



  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'}</button>
        
        {errorMessage && <p style={{ color: 'white' }}>{errorMessage}</p>}
        
      </form>
      <div className="list">
        <ul>
          {todos.map((todo) => (
            <li className="list-items">
              <div className="list-item-list" id={todo.status ? 'list-item' : ''}>{todo.list}</div>

              <span>
                <FaCheckCircle
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(todo.id)}
                />
                <AiFillEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={()=>onEdit(todo.id)}
                />
                <AiFillDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(todo.id)}
                />
                
              </span>
              
            </li>
            
          ))}
          
          {todos.length > 0 && (
            <AiOutlineDelete
              className="list-item-icon1"
              id="allDelete"
              title="Delete all"
              onClick={onDeleteAll}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
