
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./Pages/Dashboard.jsx";
import Groups from "./Pages/Groups.jsx";
import GroupTasks from "./Pages/GroupTasks.jsx";
import Instructions from "./Pages/Instructions.jsx";
import Developers from "./Pages/Developers.jsx";

import "./App.css";

// DEFAULT GROUPS
const defaultGroups = [
  { id: "school", name: "School Activities" },
  { id: "personal", name: "Personal Tasks" },
  { id: "projects", name: "Projects" },
  { id: "daily", name: "Daily Tasks" },
];

function App() {
  // 1. LOAD SAVED TASKS
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("todo-tasks") || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  // 2. LOAD SAVED GROUPS
  const [groups, setGroups] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("task-groups") || "null"
      );

      return Array.isArray(saved) ? saved : defaultGroups;
    } catch {
      return defaultGroups;
    }
  });

  // 3. INPUT AND FILTER STATE
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // 4. AUTOMATIC TASK SAVING
  useEffect(() => {
    localStorage.setItem(
      "todo-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // 5. AUTOMATIC GROUP SAVING
  useEffect(() => {
    localStorage.setItem(
      "task-groups",
      JSON.stringify(groups)
    );
  }, [groups]);

  // 6. ADD TASK
  const addTask = (event) => {
    event.preventDefault();

    const name = input.trim();
    if (!name) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: name,
      completed: false,
      groupId: null,
    };

    setTasks((previous) => [...previous, newTask]);
    setInput("");
  };

  // 7. ADD TASK TO A GROUP
  const addGroupTask = (taskName, groupId) => {
    const name = taskName.trim();

    if (!name) return;

    const groupExists = groups.some(
      (group) => group.id === groupId
    );

    if (!groupExists) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: name,
      completed: false,
      groupId,
    };

    setTasks((previous) => [...previous, newTask]);
  };

  // 8. MARK TASK DONE / NOT DONE
  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // 9. DELETE TASK
  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  };

  // 10. CREATE GROUP
  const addGroup = (name) => {
    const cleanName = name.trim();

    if (!cleanName) return false;

    const alreadyExists = groups.some(
      (group) =>
        group.name.toLowerCase() ===
        cleanName.toLowerCase()
    );

    if (alreadyExists) return false;

    setGroups((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        name: cleanName,
      },
    ]);

    return true;
  };

  // 11. TASK FILTERS
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // 12. REMAINING COUNTER
  const remaining = tasks.filter(
    (task) => !task.completed
  ).length;

  // 13. NAVIGATION STYLING
  const navigationStyle = ({ isActive }) =>
    `rounded-lg px-4 py-2 font-semibold transition ${
      isActive
        ? "bg-purple-600 text-white"
        : "text-purple-600 hover:bg-purple-100"
    }`;

  return (
    <>
      {/* MAIN NAVIGATION */}
      <nav
        className="flex flex-wrap justify-center gap-4 bg-white p-4 shadow-sm"
        aria-label="Main navigation"
      >
        <NavLink to="/home" className={navigationStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/" end className={navigationStyle}>
          Todo List
        </NavLink>

        <NavLink to="/groups" className={navigationStyle}>
          Groups
        </NavLink>

        <NavLink to="/guide" className={navigationStyle}>
          User Guide
        </NavLink>

        <NavLink to="/developers" className={navigationStyle}>
          Developers
        </NavLink>
      </nav>

      {/* WEBSITE ROUTES */}
      <Routes>
        {/* DASHBOARD */}
        <Route
          path="/home"
          element={<Dashboard tasks={tasks} />}
        />

        {/* MAIN TODO LIST */}
        <Route
          path="/"
          element={
            <main className="todo-container">
              <h1 className="text-center text-4xl font-bold text-purple-600">
                My Todo List
              </h1>

              <p className="subtitle">
                Organize your day, one task at a time.
              </p>

              <form onSubmit={addTask} className="add-form">
                <input
                  type="text"
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="What do you need to do?"
                  aria-label="New task"
                />

                <button type="submit">
                  Add Task
                </button>
              </form>

              {/* TASK FILTER BUTTONS */}
              <div className="filters">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                >
                  All
                </button>

                <button
                  type="button"
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>

                <button
                  type="button"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
              </div>

              {/* TASK LIST */}
              <ul className="task-list">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className={task.completed ? "done" : ""}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.text} as ${
                        task.completed
                          ? "not done"
                          : "done"
                      }`}
                    />

                    <span>{task.text}</span>

                    <button
                      type="button"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>

              {filteredTasks.length === 0 && (
                <p className="empty">
                  No tasks to show.
                </p>
              )}

              <p className="remaining">
                {remaining} task(s) remaining
              </p>
            </main>
          }
        />

        {/* GROUPS */}
        <Route
          path="/groups"
          element={
            <Groups
              groups={groups}
              addGroup={addGroup}
            />
          }
        />

        {/* INDIVIDUAL GROUP TASKS */}
        <Route
          path="/groups/:groupId"
          element={
            <GroupTasks
              groups={groups}
              tasks={tasks}
              addGroupTask={addGroupTask}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          }
        />

        {/* USER GUIDE */}
        <Route
          path="/guide"
          element={<Instructions />}
        />

        {/* DEVELOPERS PAGE */}
        <Route
          path="/developers"
          element={<Developers />}
        />

        {/* PAGE NOT FOUND */}
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-2xl p-8 text-center">
              <h1 className="text-2xl font-bold">
                Page not found
              </h1>

              <NavLink
                to="/home"
                className="mt-4 inline-block text-purple-600"
              >
                Back to Dashboard
              </NavLink>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
