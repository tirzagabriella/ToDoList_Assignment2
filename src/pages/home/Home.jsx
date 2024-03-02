import React, { useEffect, useState } from "react";
import AddItemForm from "../../components/form/AddItemForm";
import ToDoList from "../../components/list/ToDoList";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
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

  useEffect(() => {
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
    navigate("/ToDoList_TAWeek2/");
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

    setNewItem(""); // set the box into "" after clicking add button
    setdatetimeState(dayjs());
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

    setEditedValue("");

    toggle();
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
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
