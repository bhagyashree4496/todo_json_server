import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import AddTask from "./AddTask";
import EditTask from "./EditTask";

function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), task: "finish header section", completed: true },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [Id, setId] = useState(null);
  const date = new Date();
  console.log(date);
  const today = String(date).slice(0, 15);
  console.log(today);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
      console.log(res.data);
      const temp = tasks.filter((task) => {
        return task.id !== id;
      });
      console.log(temp);
      setTasks(temp);
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data, "response");
      })
      .catch((err) => {
        console.log("error!!!", err);
      });
  }, []);

  return (
    <div className="w-full h-screen p-[10px] py-[50px] md:p-[50px] bg-[#778899]  ">
      <h1 className="text-xl md:text-4xl font-bold text-center">
        {today} -- Tasks
      </h1>

      {tasks.map((task, i) => {
        return (
          <div
            key={task.id}
            className="m-[10px] bg-[#303030] py-[5px] px-[20px] md:px-[30px]
          md:py-[15px]  rounded-tr-[40px] rounded-bl-[40px] rounded-tl-[5px] rounded-br-[5px]  flex items-center gap-5  justify-between"
          >
            <div className="flex items-center gap-5">
              <div
                className={`w-[15px] h-[15px] md:w-[30px] md:h-[30px]  rounded-full ${
                  task.completed ? "bg-blue-700" : "bg-black"
                }`}
              ></div>
              <div
                className={`md:text-[25px] text-white ${
                  task.completed
                    ? "line-through decoration-red-600 decoration-4"
                    : ""
                }`}
              >
                {task.task}
              </div>
            </div>
            <div className="cursor-pointer flex gap-2">
              <div
                onClick={() => {
                  setEditModal(true);
                  console.log(task.id, "###########");
                  setId(task.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
              <div
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="m-[10px] bg-[#303030] py-[5px] px-[20px] md:px-[30px]
          md:py-[15px]  rounded-tr-[40px] rounded-bl-[40px] rounded-tl-[5px] rounded-br-[5px]  flex items-center gap-2  justify-center cursor-pointer"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div className={`text-4xl text-white `}>+</div>
        <div className={`md:text-[25px] text-white `}>Add New Task</div>
      </div>
      <AddTask
        openModal={openModal}
        setOpenModal={setOpenModal}
        setTasks={setTasks}
        tasks={tasks}
      ></AddTask>
      <EditTask
        editModal={editModal}
        setEditModal={setEditModal}
        setTasks={setTasks}
        tasks={tasks}
        Id={Id}
        setId={setId}
      ></EditTask>
    </div>
  );
}

export default App;
