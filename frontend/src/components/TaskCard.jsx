const TaskCard = ({
  title,
  desc,
  priority,
  status,
  color = "blue",
  onClick,
  children,
}) => {
  const colorClasses = {
    red: "border-red-400 text-red-600",
    blue: "border-blue-400 text-blue-600",
    green: "border-green-400 text-green-600",
    yellow: "border-yellow-400 text-yellow-600",
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gray-50 p-4 rounded-lg mb-4 shadow hover:shadow-md transition cursor-pointer border-l-4 ${colorClasses[color]?.split(" ")[0]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>

          <div className="text-xs mt-2 text-gray-500">
            Priority:{" "}
            <span className={`${colorClasses[color]?.split(" ")[1]} font-medium`}>
              {priority}
            </span>{" "}
            |
            Status:{" "}
            <span className={`${colorClasses[color]?.split(" ")[1]} font-medium`}>
              {status}
            </span>
          </div>
        </div>

        {/* Slot for edit/delete buttons */}
        {children}
      </div>
    </div>
  );
};

export default TaskCard;

// // Reusable task card
// const TaskCard = ({ title, desc, priority, status, color }) => (
//   <div className={`border-l-4 border-${color}-400 bg-gray-50 p-4 rounded-md mb-3`}>
//     <h4 className="font-semibold">{title}</h4>
//     <p className="text-sm text-gray-600">{desc}</p>
//     {priority && (
//       <div className="text-xs mt-2 text-gray-500">
//         Priority:{" "}
//         <span className={`text-${color}-500 font-medium`}>{priority}</span> |
//         Status:{" "}
//         <span className={`text-${color}-600 font-medium`}>{status}</span>
//       </div>
//     )}
//     {!priority && (
//       <div className="text-xs mt-2 text-gray-500">
//         Status:{" "}
//         <span className={`text-${color}-600 font-medium`}>{status}</span>
//       </div>
//     )}
//   </div>
// );

// export default TaskCard