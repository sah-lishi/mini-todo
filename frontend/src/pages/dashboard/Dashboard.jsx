import TaskCard from "../../components/Todo/TaskCard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {user} = useSelector((state) => state.auth)
  console.log(user);
  
  const todos = useSelector((state) => state.todo.todos)
  const highPriorityTodos = todos.filter(todo => todo.priority === "high");
  return (
    <div className="min-h-screen bg-[#f5f7fb] relative">
     
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 transition-all duration-300">
          {/* Welcome */}
          <h2 className="text-2xl font-semibold mb-4">
            Welcome back, <span className="text-[#ff8b82]">{user?.username}</span> 👋
          </h2>

          {/* Grid area */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* To-Do Section */}
            <div className="bg-white p-5 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#ff8b82]">Incompleted To-Do</h3>
                <button className="text-sm text-blue-500 hover:underline">
                  + Add Task
                </button>
              </div>
              {todos.map((todo) => {
                if (todo.priority !== "high")
                 return (<TaskCard key={todo._id} todo={todo}/>)
                })
              } 
              
            </div>

            {/* Hign-priority Todo Section */}
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-green-600 mb-4">
                High-priority Todo
              </h3>
              {highPriorityTodos.map((todo) => (
                <TaskCard key={todo._id} todo={todo}/>
              ))
              } 
            </div>
          </div>
        </main>
      </div>
   
  );
};

export default Dashboard;
