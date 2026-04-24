
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const recentUsers = users.slice(-3).reverse();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">

        <div className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-gray-800">
          <h1 className="text-xl font-bold">CRUD Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
          >
            Toggle Theme
          </button>
        </div>
      
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            Welcome to CRUD Manager
          </motion.h1>
          <p className="mb-6">Manage users with a modern React + Tailwind UI</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/all")}
              className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              View Users
            </button>
            <button
              onClick={() => navigate("/add")}
              className="border border-white px-6 py-2 rounded-lg hover:scale-105 transition"
            >
              Add User
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold">{users.length}</h2>
                <p>Total Users</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold">{recentUsers.length}</h2>
                <p>Recently Added</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold">{users.length > 0 ? "Active" : "0"}</h2>
                <p>Status</p>
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transition"
              >
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              "Add Users",
              "Edit Users",
              "Delete Users",
              "Responsive Design",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-indigo-400 dark:bg-indigo-900 rounded-xl text-center font-semibold"
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
          Built with React, Tailwind CSS, Material UI & JSON Server
        </div>
      </div>
    </div>
  );
}
export default Home;
