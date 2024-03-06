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
import { auth, logout } from "../../services/firebase-auth";
import { addTask, deleteTask, editTask, getTasks } from "../../services/todo";

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
  const [loggedInUser, setLoggedInUser] = useState();

  const navigate = useNavigate();

  const navtoSplash = () => {
    navigate("/");
  };

  const populateTodolist = async (user) => {
    const tasks = await getTasks(user);
    setTodos(tasks);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser(user);
        populateTodolist(user);
      } else {
        onSignOut();
      }
    });
  }, []);

  useEffect(() => {
    let filteredTodos = todos;

    switch (filterStatus) {
      case "All":
        filteredTodos = todos;
        break;
      case "Complete":
        filteredTodos = todos.filter((obj) => {
          if (obj.completed) {
            return obj;
          }
        });
        break;
      case "Incomplete":
        filteredTodos = todos.filter((obj) => {
          if (!obj.completed) {
            return obj;
          }
        });
        break;
    }

    setShownTodos(filteredTodos);
  }, [todos, filterStatus]);

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

    // add to firebase
    addTask(
      newItem,
      datetimeState.format("ddd, YYYY-MM-DD HH:mm"),
      loggedInUser.uid
    );

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

    // update at firebase
    todos.forEach((todo) => {
      if (todo.id == id) {
        editTask(id, todo.title, completed);
      }
    });
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

    // edit task at firebase
    todos.forEach((todo) => {
      if (todo.id == editedId) {
        editTask(editedId, newValue, todo.completed);
      }
    });

    setEditedValue("");

    toggle();
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });

    deleteTask(id);
  }

  const onSignOut = () => {
    logout();
    localStorage.removeItem("authToken");
    navtoSplash();
  };

  return (
    <>
      <div
        className="flex flex-row cursor-pointer m-4"
        onClick={() => onSignOut()}
      >
        <span>Sign Out</span>
      </div>

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
