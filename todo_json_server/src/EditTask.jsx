import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
function EditTask({ editModal, setEditModal, Id }) {
  const queryClient = useQueryClient();
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
  const editTask = async (task) => {
    axios.put(`http://localhost:3000/tasks/${Id}`, task);
  };
  const mutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  // const editTask = () => {
  //   //e.preventdefault();
  //   axios
  //     .put(`http://localhost:3000/tasks/${Id}`, newTask)
  //     .then((res) => {
  //       console.log(res.data, tasks, "put resp data");
  //       const { id, task, completed } = res.data;
  //       const temp = tasks.map((task) => {
  //         return task.id === Id ? newTask : task;
  //       });
  //       setTasks(temp);
  //       console.log(id, Id, tasks, "in edit");

  //       closeModal(true);
  //     })
  //     .catch((err) => console.log(err, "error while put request"));
  // };
  return (
    <Modal
      isOpen={editModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="w-full bg-[#eed6a7]">
        <form className="   px-8 pt-6 pb-8 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[20px] font-bold mb-2"
              for="username"
            >
              Task
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
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
              className="w-8 h-8 text-[#e4ae6d] bg-gray-100 border-gray-300 "
              onChange={(e) => {
                setNewTask({ ...newTask, completed: e.target.checked });
                console.log(e.target.checked, "radio");
              }}
            ></input>
            <label
              for="default-radio-1"
              className="ms-2 text-[20px] font-medium text-gray-900 "
            >
              Is it Completed?
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#e38e27] hover:bg-[#e6840b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-[20px]"
              type="button"
              onClick={() => {
                mutation.mutate(newTask);
                setEditModal(false);
              }}
            >
              Save
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

export default EditTask;
