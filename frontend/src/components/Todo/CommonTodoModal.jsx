import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const priorities = [
  { label: "High", value: "high", color: "bg-red-500" },
  { label: "Moderate", value: "moderate", color: "bg-blue-500" },
  { label: "Low", value: "low", color: "bg-green-500" },
];

const statuses = [
  { label: "Pending", value: "pending", color: "bg-yellow-500" },
  { label: "In Progress", value: "in progress", color: "bg-purple-500" },
  { label: "Completed", value: "completed", color: "bg-green-600" },
];

export default function CommonTodoModal({ isOpen, onClose, onSubmit, initialData }) {
  // If initialData exists → prefill, else empty fields
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
    completedAt: "",
    category: ""
  });
  const categories= useSelector((state) => state.category.categories)
  categories.map((cat)=> console.log(cat.name)
  )  
  const [errors, setErrors] = useState({});

  // Load initial data into form (useful in edit mode)
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "",
        status: initialData.status || "",
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
        completedAt: initialData.completedAt ? initialData.completedAt.split("T")[0] : "",
        category: initialData.category || "none"
      });
    }
  }, [initialData]);

  if (!isOpen) return null; // modal hidden

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.priority) newErrors.priority = "Priority is required.";
    if (!form.status) newErrors.status = "Status is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if(!validate()) return
    onSubmit(form); // send data back
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-[600px] p-6 rounded-lg shadow-lg max-h-[96vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {initialData ? "Edit Task" : "Add New Task"}
          </h2>
          <button onClick={onClose} className="text-sm underline">Go Back</button>
        </div>
        <div className="border-2 border-gray-200 p-4 rounded">
          {/* Title */}
          <div className="mb-3">
            <label className="flex justify-between items-center font-semibold mb-1">
              <span>Title</span>
              {/* CATEGORY DROPDOWN */}
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="">Select Category</option>
                <option value="none">
                  No Category
                </option>
            
                {categories?.length > 0 && categories?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 p-2 rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Priority */}
          <div className="mb-3">
            <label className="block font-semibold mb-2">Priority</label>
            <div className="flex flex-wrap gap-4">
              {priorities.map((p) => (
                <div
                  key={p.value}
                  onClick={() => setForm({ ...form, priority: p.value })}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 cursor-pointer 
                  ${form.priority === p.value ? "bg-gray-200" : "border-gray-200"}`}
                >
                  <span className={`w-3 h-3 rounded-full ${p.color}`}></span>
                  {p.label}
                </div>
              ))}
            </div>
            {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="block font-semibold mb-2">Status</label>
            <div className="flex flex-wrap gap-4">
              {statuses.map((s) => (
                <div
                  key={s.value}
                  onClick={() => setForm({ ...form, status: s.value })}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 cursor-pointer 
                  ${form.status === s.value ? "bg-gray-200" : "border-gray-200"}`}
                >
                  <span className={`w-3 h-3 rounded-full ${s.color}`}></span>
                  {s.label}
                </div>
              ))}
            </div>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="border-2 border-gray-200 p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">Completed At</label>
              <input
                type="date"
                name="completedAt"
                value={form.completedAt}
                onChange={handleChange}
                className="border-2 border-gray-200 p-2 w-full rounded"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border-2 border-gray-200 p-2 rounded"
              placeholder="Start writing..."
            ></textarea>
          </div>
        </div>    
        {/* Submit */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>
  );
}
