import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
        Manage your tasks <span className="text-indigo-600">Effortlessly</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-lg mb-8">
        Ek simple aur powerful tool jo aapke daily tasks, projects aur goals ko track karne mein madad karta hai.
      </p>
      
      {/* To-Do List Button */}
      <Link to="/tasks">
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
          Go to To-Do List 🚀
        </button>
      </Link>
    </div>
  );
}

export default Home;