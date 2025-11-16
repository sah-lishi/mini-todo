import TaskCard from "../../components/TaskCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb] relative">
     
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 transition-all duration-300">
          {/* Welcome */}
          <h2 className="text-2xl font-semibold mb-4">
            Welcome back, <span className="text-[#ff8b82]">Sundar</span> 👋
          </h2>

          {/* Grid area */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* To-Do Section */}
            <div className="bg-white p-5 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#ff8b82]">To-Do</h3>
                <button className="text-sm text-blue-500 hover:underline">
                  + Add Task
                </button>
              </div>

              <TaskCard
                title="Attend Nischal’s Birthday Party"
                desc="Buy gifts on the way and pick up cake from the bakery. [6 PM | Fresh Elements]"
                priority="Moderate"
                status="Not Started"
                color="red"
              />
              <TaskCard
                title="Landing Page Design for TravelDays"
                desc="Get the work done by EOD and discuss with client before leaving."
                priority="Moderate"
                status="In Progress"
                color="blue"
              />
            </div>

            {/* Completed Section */}
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-green-600 mb-4">
                Completed Tasks
              </h3>
              <TaskCard
                title="Walk the Dog"
                desc="Take the dog to the park and bring treats."
                status="Completed"
                color="green"
              />
              <TaskCard
                title="Conduct Meeting"
                desc="Meet with the client and finalize requirements."
                status="Completed"
                color="green"
              />
            </div>
          </div>
        </main>
      </div>
   
  );
};

export default Dashboard;
