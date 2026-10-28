
import { useState } from "react";
import { Link } from "react-router-dom";

function Groups() {
  const [groups, setGroups] = useState(() => {
    const defaultGroups = [
      { id: "school", name: "School Activities" },
      { id: "personal", name: "Personal Tasks" },
      { id: "projects", name: "Projects" },
      { id: "daily", name: "Daily Tasks" },
    ];

    try {
      const saved = localStorage.getItem("task-groups");
      if (!saved) return defaultGroups;

      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : defaultGroups;
    } catch {
      return defaultGroups;
    }
  });

  const [groupName, setGroupName] = useState("");

  const addGroup = (event) => {
    event.preventDefault();

    const name = groupName.trim();
    if (!name) return;

    const newGroup = {
      id: crypto.randomUUID(),
      name: name,
    };

    const updatedGroups = [...groups, newGroup];

    setGroups(updatedGroups);
    localStorage.setItem(
      "task-groups",
      JSON.stringify(updatedGroups)
    );

    setGroupName("");
  };

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-purple-600">
          Task Groups
        </h1>

        <p className="mt-2 text-gray-500">
          Organize your tasks into categories.
        </p>

        <form
          onSubmit={addGroup}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={groupName}
            onChange={(event) =>
              setGroupName(event.target.value)
            }
            placeholder="Enter group name"
            className="min-w-0 flex-1 rounded-lg border p-3"
          />

          <button type="submit">
            Add Group
          </button>
        </form>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="block rounded-xl bg-purple-50 p-6 transition hover:bg-purple-100"
            >
              <h2 className="text-xl font-bold text-purple-700">
                {group.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                View tasks in this group
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Groups;
