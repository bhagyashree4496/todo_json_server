import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
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
function EditTask({ editModal, setEditModal, Id, tasks, setTasks }) {
  const [newTask, setNewTask] = useState({
    id: Id,
    task: "",
    completed: null,
  });
  useEffect(() => {
    setNewTask({
      id: Id,
      task: "",
      completed: null,
    });
  }, [Id]);
  console.log(Id, "##########edit");
  const closeModal = () => {
    // e.preventdefault();
    setEditModal(false);
  };
  const editTask = () => {
    //e.preventdefault();
    axios
      .put(`http://localhost:3000/tasks/${Id}`, newTask)
      .then((res) => {
        console.log(res.data, tasks, "put resp data");
        const { id, task, completed } = res.data;
        const temp = tasks.map((task) => {
          return task.id === Id ? newTask : task;
        });
        setTasks(temp);
        console.log(id, Id, tasks, "in edit");

        closeModal(true);
      })
      .catch((err) => console.log(err, "error while put request"));
  };
  return (
    <Modal
      isOpen={editModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="w-full ">
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
                console.log(e.target.checked, "radio");
              }}
            ></input>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value={newTask.completed}
              name="default-radio"
              className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => {
                setNewTask({ ...newTask, completed: e.target.checked });
                console.log(e.target.checked, "radio");
              }}
            ></input>
            <label
              for="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Is it Complted?
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={editTask}
            >
              Save
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

export default EditTask;
