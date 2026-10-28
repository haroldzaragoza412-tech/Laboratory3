
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function GroupTasks({
  groups = [],
  tasks = [],
  addGroupTask,
  toggleTask,
  deleteTask,
}) {
  const { groupId } = useParams();

  const [input, setInput] = useState("");

  const selectedGroup = groups.find(
    (group) => group.id === groupId
  );

  const groupTasks = tasks.filter(
    (task) => task.groupId === groupId
  );

  const completedCount = groupTasks.filter(
    (task) => task.completed
  ).length;

  const handleSubmit = (event) => {
    event.preventDefault();

    const taskName = input.trim();
    if (!taskName) return;

    addGroupTask(taskName, groupId);
    setInput("");
  };

  if (!selectedGroup) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <section className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-purple-600">
            Group not found
          </h1>

          <p className="mt-2 text-gray-500">
            This task group does not exist.
          </p>

          <Link
            to="/groups"
            className="mt-5 inline-block font-semibold text-purple-600"
          >
            Back to Groups
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <section className="rounded-2xl bg-white p-8 shadow-lg">
        <Link
          to="/groups"
          className="font-semibold text-purple-600 hover:underline"
        >
          ← Back to Groups
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-purple-600">
          {selectedGroup.name}
        </h1>

        <p className="mt-2 text-gray-500">
          Manage tasks in this category.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="rounded-lg bg-purple-100 px-3 py-2">
            Total: {groupTasks.length}
          </span>

          <span className="rounded-lg bg-green-100 px-3 py-2">
            Completed: {completedCount}
          </span>

          <span className="rounded-lg bg-orange-100 px-3 py-2">
            Pending: {groupTasks.length - completedCount}
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Enter a task for this group"
            aria-label="New group task"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 p-3"
          />

          <button type="submit">
            Add Task
          </button>
        </form>

        <ul className="mt-6 space-y-3">
          {groupTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-xl bg-purple-50 p-4"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                aria-label={`Mark ${task.text} as ${
                  task.completed ? "not done" : "done"
                }`}
              />

              <span
                className={`min-w-0 flex-1 wrap-break-word ${
                  task.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </span>

              <button
                type="button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {groupTasks.length === 0 && (
          <p className="mt-8 text-center text-gray-500">
            No tasks in this group yet.
          </p>
        )}
      </section>
    </main>
  );
}

export default GroupTasks;
