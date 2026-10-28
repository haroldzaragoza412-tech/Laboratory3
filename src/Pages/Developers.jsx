
import { Link } from "react-router-dom";

// OFFICIAL GROUP MEMBERS
const developers = [
  {
    id: 1,
    name: "Harold G. Zaragoza",
    initials: "HZ",
    role: "Frontend Developer",
    contribution:
      "Responsible for the website interface, responsive layout, navigation design, and frontend development.",
  },
  {
    id: 2,
    name: "Karl Tristan D. Mendoza",
    initials: "KM",
    role: "Application Developer",
    contribution:
      "Responsible for application logic, React state management, task functionality, and category management.",
  },
  {
    id: 3,
    name: "Benh Levard Gumban",
    initials: "BG",
    role: "Tester and Documentation",
    contribution:
      "Responsible for testing website features, verifying functionality, identifying errors, and preparing documentation.",
  },
  {
    id: 4,
    name: "Chezel C. Aspero",
    initials: "CA",
    role: "Tester and Documentation",
    contribution:
      "Responsible for responsive testing, checking page navigation, validating task functions, and assisting with documentation.",
  },
];

function Developers() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <section className="rounded-3xl bg-white p-5 shadow-xl sm:p-10">

        {/* PAGE HEADER */}
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
            Laboratory 3
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet the Developers
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Meet the team behind TaskFlow, our React-based
            To-Do List Website.
          </p>
        </header>

        {/* DEVELOPERS GRID */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {developers.map((developer) => (
            <article
              key={developer.id}
              className="flex flex-col items-center rounded-2xl border border-purple-100 bg-purple-50 p-6 text-center transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* AVATAR */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-200 text-2xl font-bold text-purple-800">
                {developer.initials}
              </div>

              {/* MEMBER NAME */}
              <h2 className="mt-5 text-xl font-bold text-gray-900">
                {developer.name}
              </h2>

              {/* ROLE */}
              <p className="mt-2 font-semibold text-purple-700">
                {developer.role}
              </p>

              {/* CONTRIBUTION */}
              <p className="mt-4 text-sm leading-7 text-gray-600">
                {developer.contribution}
              </p>
            </article>
          ))}
        </div>

        {/* PROJECT INFORMATION */}
        <section className="mt-10 rounded-2xl bg-purple-100 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-purple-800">
            About Our Project
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            TaskFlow is a React-based To-Do List Website
            developed for Laboratory 3 in DCIT 26:
            Application Development and Emerging
            Technologies.
          </p>

          <p className="mt-4 leading-7 text-gray-700">
            Our website uses React, Tailwind CSS, and
            React Router DOM. It allows users to create,
            complete, and delete tasks, organize tasks
            into groups, view dashboard statistics,
            and navigate between different pages.
          </p>
        </section>

        {/* BACK BUTTON */}
        <div className="mt-8 text-center">
          <Link
            to="/home"
            className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Back to Dashboard
          </Link>
        </div>

      </section>
    </main>
  );
}

export default Developers;
