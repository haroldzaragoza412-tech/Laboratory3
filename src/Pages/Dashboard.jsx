
function Dashboard({ tasks = [] }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-600">
          Welcome to TaskFlow!
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your tasks and stay productive.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-purple-100 rounded-xl p-6">
            <p className="text-purple-600">Total Tasks</p>
            <h2 className="text-3xl font-bold">
              {totalTasks}
            </h2>
          </div>

          <div className="bg-green-100 rounded-xl p-6">
            <p className="text-green-600">Completed</p>
            <h2 className="text-3xl font-bold">
              {completedTasks}
            </h2>
          </div>

          <div className="bg-orange-100 rounded-xl p-6">
            <p className="text-orange-600">Pending</p>
            <h2 className="text-3xl font-bold">
              {pendingTasks}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
