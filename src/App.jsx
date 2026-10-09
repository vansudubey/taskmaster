import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ name: '', title: '', description: '' });
  const [editId, setEditId] = useState(null);
  
  // Is state se hum decide karenge ki Home Page dikhana hai ya Task Manager
  const [isTaskMasterOpen, setIsTaskMasterOpen] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { 
    if (isTaskMasterOpen) fetchTodos(); 
  }, [isTaskMasterOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: '', title: '', description: '' });
    fetchTodos();
  };

  // --- 1. HOME PAGE COMPONENT ---
  if (!isTaskMasterOpen) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        {/* Header/Navbar */}
        <nav className="w-full py-6 px-10 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
            TaskMaster.com
          </h1>
          <div className="space-x-6 hidden md:block text-gray-600 font-medium">
            <a href="#" className="hover:text-indigo-600">
              Features
            </a>
            <a href="#" className="hover:text-indigo-600">
              Pricing
            </a>
            <a href="#" className="hover:text-indigo-600">
              Contact
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl">
          {/* <div className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-sm font-bold mb-6">
            New Version 2.0 is out! 🚀
          </div> */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Manage Your Tasks More Effectively{" "}
            <span className="text-indigo-600"></span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
            A simple yet powerful platform to track your daily goals. Get
            started now and boost your productivity by 2x.
          </p>

          {/* Main Action Button (Jo Task Master page kholega) */}
          <button
            onClick={() => setIsTaskMasterOpen(true)}
            className="group relative px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2"
          >
            Open Task Master
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          {/* <div className="mt-16 grid grid-cols-3 gap-8 border-t pt-10 w-full opacity-60">
            <div><p className="font-bold text-2xl text-gray-800">10k+</p><p className="text-sm">Active Users</p></div>
            <div><p className="font-bold text-2xl text-gray-800">50k+</p><p className="text-sm">Tasks Created</p></div>
            <div><p className="font-bold text-2xl text-gray-800">4.9/5</p><p className="text-sm">User Rating</p></div>
          </div> */}
        </main>

        <footer className="py-10 text-gray-400 text-sm italic">
          © Plan it. Do it. Get it done. 🚀
        </footer>
      </div>
    );
  }

  // --- 2. TASK MASTER PAGE (CRUD SECTION) ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Mini Dashboard Navbar */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsTaskMasterOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            title="Go back to Home"
          >
            ⬅️
          </button>
          <h2 className="text-xl font-bold text-indigo-600">Task Dashboard</h2>
        </div>
        <p className="text-sm text-gray-500 hidden sm:block">Welcome back, User!</p>
      </nav>

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Form Side */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {editId ? "📝 Update Task" : "➕ Add New Task"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                  placeholder="Your Name" 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  required 
                />
                <input 
                  className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                  placeholder="Task Title" 
                  value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})} 
                  required 
                />
                <textarea 
                  className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                  placeholder="Task Description" 
                  rows="4"
                  value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})} 
                  required 
                />
                <button className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition transform active:scale-95 ${editId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                  {editId ? "Update Task Details" : "Create Task Now"}
                </button>
              </form>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-2">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
                <span className="bg-white border px-4 py-1 rounded-full text-sm font-semibold text-gray-600 shadow-sm">
                  Total: {todos.length}
                </span>
             </div>

            {todos.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400">Abhi tak koi task nahi hai. Naya banayein!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todos.map(todo => (
                  <div key={todo._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-2 w-12 bg-indigo-500 rounded-full"></div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">BY {todo.name}</p>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{todo.title}</h4>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{todo.description}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {setEditId(todo._id); setForm(todo); window.scrollTo({top: 0, behavior:'smooth'})}} 
                        className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition font-bold text-sm"
                      >Edit</button>
                      <button 
                        onClick={async () => { if(window.confirm("Delete karein?")) { await axios.delete(`${API_URL}/${todo._id}`); fetchTodos(); } }} 
                        className="flex-1 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition font-bold text-sm"
                      >Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;