import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    //marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "0px",
  },
};
function AddTask({ openModal, setOpenModal, setTasks, tasks }) {
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    task: "",
    completed: null,
  });
  const closeModal = () => {
    setOpenModal(false);
  };
  const createTask = () => {
    axios
      .post("http://localhost:3000/tasks", newTask)
      .then((res) => {
        console.log(res.data);
        setTasks([...tasks, res.data]);
        setNewTask({
          id: uuidv4(),
          task: "",
          completed: false,
        });
        setOpenModal(false);
      })
      .catch((err) => {
        console.log("error post!");
      });
  };
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="w-full  ">
        <form className="bg-white   px-8 pt-6 pb-8 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Task
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="task"
              onChange={(e) => {
                setNewTask({ ...newTask, task: e.target.value });
                console.log(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => {
                setNewTask({ ...newTask, completed: e.target.checked });
                console.log(e.target.checked);
              }}
            ></input>
            <label
              for="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Is is Complted?
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={createTask}
            >
              Create
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
              onClick={closeModal}
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddTask;
