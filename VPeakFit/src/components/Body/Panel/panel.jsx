import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./panel.css";

const Panel = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <div className="panel_container">
        {/* daily goals here */}

        <div
          className="p-1 m-2 w-1/2 border-2 min-h-[60vh]  border-blue-600 rounded-m daily_goal"
          id="daily_goal"
        >
          <div className="title flex gap-2 items-center">
            <h1 className="font-bold text-3xl text-blue-500 my-2 mx-1 p-2">
              Daily Goals
            </h1>
            <i class="fa-solid fa-fire font-bold text-3xl text-blue-500 my-2 p-1"></i>
          </div>
          <hr />
          <br />
          <div className="daily-txt w-full mx-2 p-2">
            <div className="exercise font-bold text-lg">Schedule: </div>
            <div className="calories font-bold text-lg">Calories Burned: </div>
          </div>
        </div>

        {/* todo from here */}

        <div
          className="container my-6 rounded-md p-4 pl-7 border-2 border-blue-600 min-h-[60vh] w-1/2 todo_list"
          id="todo_list"
        >
          <div className="title flex gap-3 items-center mb-2">
            <i class="fa-solid fa-list font-bold text-3xl text-blue-500 my-2 p-1"></i>
            <h1 className="font-bold text-3xl text-blue-500 my-2 ">
              To Do List
            </h1>
          </div>
          <hr />
          <br />
          <div className="addTodo">
            <h1 className="font-bold text-xl">Add To Do Here</h1>
            <br />
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="w-1/2 px-1 outline-none my-5 border-blue-500 border-2"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-700 p-2 font-bold text-sm py-1 mx-6 text-white rounded-md save_btn"
              id="save_btn"
            >
              Save
            </button>
          </div>
          <br />
          <h2 className="text-xl font-bold">Your To Do's</h2>
          <br />
          <div className="m-5"></div>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5">No Todos to Display</div>
            )}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex w-1/4 my-3 justify-between"
                  id="output"
                >
                  {/* it is for checkbox and output*/}
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handleCheckbox}
                      value={item.isCompleted}
                    />
                    <div
                      className={item.isCompleted ? "line-through" : ""}
                      id="todo_output"
                    >
                      {item.todo}
                    </div>
                  </div>

                  {/* this is for edit and delete button */}
                  <div className="ED_button">
                    <div id="buttons">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 p-2 font-bold text-sm py-1 mx-1 text-white rounded-md "
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 p-2 font-bold text-sm py-1 mx-1 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;
