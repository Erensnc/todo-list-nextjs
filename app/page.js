'use client'
import { useState, useEffect } from "react";

export default function Home() {
  // Başlangıçta localStorage'dan veriyi al
  const [mainTask, setMainTask] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (index) => {
    let copyTask = [...mainTask];
    copyTask.splice(index, 1);
    setMainTask(copyTask);
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => {
      return (
        <li key={index} className="flex items-center justify-between mb-5">
          <div className="items-center flex justify-between mb-5 w-2/3">
            <h5 className="text-2xl font-semibold">{task.title}</h5>
            <h6 className="text-lg font-medium">{task.desc}</h6>
          </div>
          <button 
            onClick={() => deleteHandler(index)}
            className="bg-red-400 text-white px-4 py-2 rounded font-bold"
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <div>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">Eren TODO List</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5">
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>
          {renderTask}
        </ul>
      </div>
    </div>
  );
}
