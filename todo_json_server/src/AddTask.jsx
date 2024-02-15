import { useMutation, useQueryClient } from "@tanstack/react-query";
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

    transform: "translate(-50%, -50%)",
    width: "60%",
    padding: "0px",
  },
};
function AddTask({ openModal, setOpenModal }) {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    task: "",
    completed: null,
  });

  const closeModal = () => {
    setOpenModal(false);
  };
  const createTask = async (task) => {
    axios.post("http://localhost:3000/tasks", task);
    setNewTask({
      id: uuidv4(),
      task: "",
      completed: false,
    });
  };
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // const createTask = () => {
  //   axios
  //     .post("http://localhost:3000/tasks", newTask)
  //     .then((res) => {
  //       console.log(res.data);
  //       setTasks([...tasks, res.data]);
  //       setNewTask({
  //         id: uuidv4(),
  //         task: "",
  //         completed: false,
  //       });
  //       setOpenModal(false);
  //     })
  //     .catch((err) => {
  //       console.log("error post!");
  //     });
  // };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      {mutation.isPending && <h3>adding task</h3>}
      <div className="w-full bg-[#eed6a7]">
        <form className=" px-8 pt-6 pb-8 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[20px] font-bold mb-2"
              for="username"
            >
              Task
            </label>
            <input
              className="shadow appearance-none border  w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              id="username"
              type="text"
              placeholder="task"
              onChange={(e) => {
                setNewTask({ ...newTask, task: e.target.value });
              }}
            ></input>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              className="w-8 h-8 text-[#e4ae6d] bg-gray-100 border-gray-300  "
              onChange={(e) => {
                setNewTask({ ...newTask, completed: e.target.checked });
                console.log(e.target.checked);
              }}
            ></input>
            <label
              for="default-radio-1"
              className="ms-2 text-[20px] font-medium "
            >
              Is it Completed?
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#e38e27] hover:bg-[#e6840b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-[20px]"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate(newTask);
                setOpenModal();
              }}
            >
              Create
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 text-[20px]"
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
