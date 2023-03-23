import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    toast(`${yeniTask.title} Yapılacaklara eklendi`);
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
    toast(`${yeniKisi} takıma eklendi`);
  }

  function handleComplete(id) {
    // OPT 1
    // const newTasks = tasks.map((el) => {
    //   return el.id === id ? { ...el, status: "yapıldı" } : el;
    // });
    // setTasks(newTasks);
    // toast(`Görev tamamlandı`);
    // OPT 2 : tek satırda yazıldı, return yok
    // const newTasks = tasks.map((el) =>
    //   el.id === id ? { ...el, status: "yapıldı" } : el
    // );
    // setTasks(newTasks);
    // toast(`Görev tamamlandı`);
    // OPT 3 : Direkt içinde güncellendi
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, status: "yapıldı" } : task
    //   )
    // );
    // OPT 4 : Direkt içinde güncellendi, callback func yazıldı.
    // setTasks((prevTasks) =>
    //   prevTasks.map((task) =>
    //     task.id === id ? { ...task, status: "yapıldı" } : task
    //   )
    // );
    // OPT 5: Ayrı bir array oluşturuldu, ek olarak görev title yakalandı
    // const newTasks = [...tasks];
    // const completedTask = newTasks.find((el) => el.id === id);
    // if (completedTask) {
    //   completedTask.status = "yapıldı";
    // }
    // setTasks(newTasks);
    // toast(`${completedTask.title} tamamlandı`);

    // OPT 6: Toastlı hali
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          toast(`${task.title} tamamlandı`);
          return { ...task, status: "yapıldı" };
        } else {
          return task;
        }
      })
    );
  }

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
