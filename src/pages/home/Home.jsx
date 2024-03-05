import React, { useEffect, useState } from "react";
import AddItemForm from "../../components/form/AddItemForm";
import ToDoList from "../../components/list/ToDoList";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// import { db } from "../firebase";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import utc from "@dayjs/plugin/utc";
// import timezone from "@dayjs/plugin/timezone";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [shownTodos, setShownTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [on, setOn] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editedId, setEditedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [datetimeState, setdatetimeState] = useState(dayjs());
  // const [dataChangeState, setDataChangeState] = useState("");

  // useEffect(() => {
  //   console.log("SET");
  //   localStorage.setItem("todolist", JSON.stringify(todos));

  //   console.log("triggered on ", dataChangeState);
  // }, [dataChangeState]);

  useEffect(() => {
    const currTodoFromStorage = localStorage.getItem("todolist");
    console.log("curr todo from useeffect 1 : ", currTodoFromStorage);
    if (currTodoFromStorage) {
      setTodos(JSON.parse(currTodoFromStorage));
    }
  }, []);

  useEffect(() => {
    // const currTodoFromStorage = localStorage.getItem("todolist");
    // console.log("curr todo : ", currTodoFromStorage);

    let filteredTodos = todos;

    switch (filterStatus) {
      case "All":
        console.log("Selected All");
        filteredTodos = todos;
        break;
      case "Complete":
        console.log("Selected Complete");
        filteredTodos = todos.filter((obj) => {
          if (obj.completed) {
            return obj;
          }
        });
        break;
      case "Incomplete":
        console.log("Selected Incomplete");
        filteredTodos = todos.filter((obj) => {
          if (!obj.completed) {
            return obj;
          }
        });
        break;
    }

    setShownTodos(filteredTodos);
  }, [todos, filterStatus]);

  const navigate = useNavigate();

  const navtoSplash = () => {
    navigate("/");
  };

  const handleDateChange = (newValue) => {
    setdatetimeState(newValue);
  };

  const toggle = () => {
    setOn((on) => !on); // everytime this function triggered it will change the modal apperance
  };

  function handleSubmit(e) {
    e.preventDefault(); // prevent website from refreshing

    // add new task to the actual task list (no filter)
    setTodos((currentTodos) => {
      // duplicate the current todos and add the new one
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
          datetime: datetimeState.format("ddd, YYYY-MM-DD HH:mm"),
        },
      ];
    });

    const newData = JSON.stringify([
      ...todos,
      {
        id: crypto.randomUUID(),
        title: newItem,
        completed: false,
        datetime: datetimeState.format("ddd, YYYY-MM-DD HH:mm"),
      },
    ]);

    localStorage.setItem("todolist", newData);

    setNewItem(""); // set the box into "" after clicking add button
    setdatetimeState(dayjs());
    // setDataChangeState("submit");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });

    const newData = JSON.stringify(
      todos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed };
        }

        return todo;
      })
    );

    localStorage.setItem("todolist", newData);
  }

  function editTodo(id, title) {
    setEditedId(id);
    setEditedValue(title);
    toggle();
  }

  function confirmEdit(newValue) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id == editedId) {
          return { ...todo, title: newValue };
        }

        return todo;
      });
    });

    const newData = JSON.stringify(
      todos.map((todo) => {
        if (todo.id == editedId) {
          return { ...todo, title: newValue };
        }

        return todo;
      })
    );

    localStorage.setItem("todolist", newData);

    setEditedValue("");

    toggle();

    // setDataChangeState("edit");
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });

    // setDataChangeState("delete");

    const newData = JSON.stringify(todos.filter((todo) => todo.id !== id));

    localStorage.setItem("todolist", newData);
  }

  return (
    <>
      <button
        className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4"
        onClick={navtoSplash}
      >
        Back
      </button>

      <AddItemForm
        handleSubmit={handleSubmit}
        newItem={newItem}
        setNewItem={setNewItem}
        setdatetimeState={handleDateChange}
      />

      <ToDoList
        todos={shownTodos}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
        toggle={toggle}
        deleteTodo={deleteTodo}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {on && (
        <Modal
          toggle={toggle}
          editedValue={editedValue}
          setEditedValue={setEditedValue}
          confirmEdit={confirmEdit}
        />
      )}
    </>
  );
}
