import React, { useState, useEffect } from "react";
import "./main.css";

interface Task {
  id: number;
  name: string;
  status: string;
}

function ToDoList() {
  const [listTasks, setListTasks] = useState<Task[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const initData = () => {
    if (!localStorage.getItem("listTasks")) {
      const listTasksData: Task[] = [
        {
          id: 1,
          name: "Quét nhà",
          status: "uncomplete",
        },
        {
          id: 2,
          name: "Lau nhà",
          status: "complete",
        },
        {
          id: 3,
          name: "Sơn nhà",
          status: "uncomplete",
        },
        {
          id: 4,
          name: "Giặt quần áo",
          status: "uncomplete",
        },
      ];
      localStorage.setItem("listTasks", JSON.stringify(listTasksData));
      return listTasksData;
    } else {
      return JSON.parse(localStorage.getItem("listTasks") || "[]");
    }
  };

  useEffect(() => {
    setListTasks(initData());
  }, []);

  const saveData = (updatedTasks: Task[]) => {
    localStorage.setItem("listTasks", JSON.stringify(updatedTasks));
  };

  const handleRemove = (id: number) => {
    const updatedTasks = listTasks.filter((task) => task.id !== id);
    setListTasks(updatedTasks);
    saveData(updatedTasks);
  };

  const handleCheck = (id: number) => {
    const updatedTasks = listTasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === "complete" ? "uncomplete" : "complete",
          }
        : task
    );
    setListTasks(updatedTasks);
    saveData(updatedTasks);
  };

  const handleCheckAll = () => {
    const updatedTasks = listTasks.map((task) => ({
      ...task,
      status: "complete",
    }));
    setListTasks(updatedTasks);
    saveData(updatedTasks);
  };

  const handleDeleteAll = () => {
    const updatedTasks = listTasks.filter((task) => task.status !== "complete");
    setListTasks(updatedTasks);
    saveData(updatedTasks);
  };

  const handleRenderAll = () => {
    const allTasks = initData();
    setListTasks(allTasks);
  };

  const handleRenderUncomplete = () => {
    const filterUncomplete = listTasks.filter(
      (task) => task.status === "uncomplete"
    );
    setListTasks(filterUncomplete);
  };

  const handleRenderCompleted = () => {
    const filterCompleted = listTasks.filter(
      (task) => task.status === "complete"
    );
    setListTasks(filterCompleted);
  };

  const handleAdd = () => {
    const inputText = document.querySelector("#input-todo") as HTMLInputElement;
    const inputTask = inputText.value;

    if (inputTask) {
      const findId = listTasks.map((task) => task.id);
      const maxId = Math.max(...findId);
      const newTask: Task = {
        id: maxId + 1,
        name: inputTask,
        status: "uncomplete",
      };

      setListTasks([...listTasks, newTask]);
      saveData([...listTasks, newTask]);
      inputText.value = "";
    }
  };

  const handleUpdate = () => {
    const inputText = document.querySelector("#input-todo") as HTMLInputElement;
    const updatedTasks = listTasks.map((task) =>
      task.id === editTaskId ? { ...task, name: inputText.value } : task
    );

    if (inputText.value.trim() === "") {
      alert("Vui lòng nhập vào!");
      return;
    }

    setListTasks(updatedTasks);
    saveData(updatedTasks);
    inputText.value = "";

    setIsEditMode(false);
    setEditTaskId(null);
  };

  const handleEdit = (id: number) => {
    const inputText = document.querySelector("#input-todo") as HTMLInputElement;
    const task = listTasks.find((task) => task.id === id);
    if (task) {
      inputText.value = task.name;
    }

    setIsEditMode(true);
    setEditTaskId(id);
  };

  const countComplete = () => {
    return listTasks.filter((task) => task.status === "complete").length;
  };

  return (
    <main>
      <div className="form">
        <h1>
          <i className="fa-solid fa-table-list list-todo-icon"></i>Todo List
        </h1>
        <div className="search-bar">
          <div className="input-todolist">
            <div className="input-group">
              <i className="fa-solid fa-list-check"></i>
              <input type="text" placeholder="Add your todo" id="input-todo" />
            </div>
            <button
              className="add-btn"
              onClick={isEditMode ? handleUpdate : handleAdd}
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div className="taskbar">
          <div className="complete-task" onClick={handleCheckAll}>
            <i className="fa-solid fa-check-double"></i>
            <span>Complete all tasks</span>
          </div>

          <span className="delete-all-tasks" onClick={handleDeleteAll}>
            Delete all complete tasks
          </span>
        </div>

        <ul className="list-task">
          {listTasks.map((task) => (
            <li className="list-task-detail" key={task.id}>
              <div className="list-checktodo">
                <input
                  type="checkbox"
                  className={`input-checkbox-${task.id} input-check`}
                  onClick={() => handleCheck(task.id)}
                  checked={task.status === "complete"}
                />
                <span className={`line-through line-through-${task.status}`}>
                  {task.name}
                </span>
              </div>
              <div>
                <i
                  className="fa-solid fa-pen-to-square edit-btn"
                  onClick={() => handleEdit(task.id)}
                ></i>
                <i
                  className="fa-solid fa-trash-can remove-btn"
                  onClick={() => handleRemove(task.id)}
                ></i>
              </div>
            </li>
          ))}
        </ul>

        <div className="form-footer">
          <div className="dropdown">
            <button className="filter-btn">Filter</button>
            <div className="list-filter">
              <a onClick={handleRenderAll}>All</a>
              <a onClick={handleRenderUncomplete}>Uncompleted</a>
              <a onClick={handleRenderCompleted}>Completed</a>
            </div>
          </div>

          <span>
            Complete: <span>{countComplete()}</span>
          </span>

          <span>
            Total Tasks: <span>{listTasks.length}</span>
          </span>
        </div>
      </div>
    </main>
  );
}

export default ToDoList;
