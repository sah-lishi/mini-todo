import { useState, useEffect } from "react";

export default function CommonCategoryModal({ isOpen, onClose, onSubmit, initialData }) {
  // If initialData exists → prefill, else empty fields
  const [form, setForm] = useState({
    name: ""
  });

  const [errors, setErrors] = useState({});

  // Load initial data into form (useful in edit mode)
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || ""
      });
    }
  }, [initialData]);

  if (!isOpen) return null; // modal hidden

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if(!validate()) return
    onSubmit(form); // send data back
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Category" : "Add New Category"}
          </h2>
          <button onClick={onClose} className="text-sm underline">Go Back</button>
        </div>
        <div className="border-2 border-gray-200 p-4">
        {/* Title */}
        <div className="mb-3">
          <label className="block font-semibold">Category Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
