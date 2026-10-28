
import { Link } from "react-router-dom";

const instructions = [
  {
    title: "1. Create a Task Group",
    steps: [
      "Click Groups in the navigation bar.",
      "Enter a group name in the input field.",
      "Click Add Group.",
      "Select your new group to view its tasks.",
    ],
  },
  {
    title: "2. Add a New Task",
    steps: [
      "Open the Todo List page or select a group.",
      "Type your task in the input field.",
      "Click the Add Task button.",
      "Your new task will appear in the task list.",
    ],
  },
  {
    title: "3. Mark a Task as Done or Not Done",
    steps: [
      "Find the task you want to update.",
      "Click its checkbox to mark it as Done.",
      "A completed task will have a line through its name.",
      "Uncheck it to change the status back to Not Done.",
    ],
  },
  {
    title: "4. Delete a Task",
    steps: [
      "Find the task you want to remove.",
      "Click the Delete button beside the task.",
      "The task will be removed from your list.",
    ],
  },
  {
    title: "5. Navigate Between Pages",
    steps: [
      "Click Dashboard to view task statistics.",
      "Click Todo List to manage your tasks.",
      "Click Groups to view task categories.",
      "Select a group to manage its assigned tasks.",
      "Use Back to Groups to return to the categories.",
    ],
  },
];

function Instructions() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-purple-600">
          Instructions / User Guide
        </h1>

        <p className="mt-2 text-gray-500">
          Learn how to use TaskFlow and organize your tasks.
        </p>

        <div className="mt-8 space-y-5">
          {instructions.map((section) => (
            <article
              key={section.title}
              className="rounded-xl bg-purple-50 p-6"
            >
              <h2 className="text-xl font-bold text-purple-700">
                {section.title}
              </h2>

              <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">
                {section.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Go to Todo List
          </Link>

          <Link
            to="/groups"
            className="rounded-lg bg-purple-100 px-5 py-3 font-semibold text-purple-700 hover:bg-purple-200"
          >
            View Groups
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Instructions;
