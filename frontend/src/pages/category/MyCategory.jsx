import CommonCategoryModal from '../../components/Category/CommonCategoryModal'
import CategoryCard from '../../components/Category/CategoryCard'
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import FloatingButton from "../../components/Button/FloatingButton";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import { setCategory, addCategory, deleteCategory, updateCategory } from '../../features/category/categorySlice'; 
import categoryService from '../../services/categoryService';
function MyCategory() {
  const [openModal, setOpenModal] = useState(false)
  const [editCategoryData, setEditCategoryData] = useState(null)
  const dispatch = useDispatch()
  const category = useSelector((state) =>state.category.categories)

  useEffect(() => {
    const fetchCategory = async() => {
      try {
        const res = await categoryService.fetchAllCategory()
        dispatch(setCategory(res.data))
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategory()
  }, [])
  const handleAddClick = () => {
    setOpenModal(true)
    setEditCategoryData(null)
  }
  const handleSubmit = async(categoryData) => {
    // editCategoryData !== null -> old data update
    if (editCategoryData) {
      try {
        const res = await categoryService.updateCategory(categoryData)
        dispatch(updateCategory(res.data))
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // editCategoryData === null -> new data add
      try {
        const res = await categoryService.addNewCategory(categoryData)
        dispatch(addCategory(res.data))
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  const handleDeleteClick = async(id) => {
    try {
      await categoryService.deleteCategory(id)
      dispatch(deleteCategory(id))
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditClick = (categ) => {
    setEditCategoryData(categ)
    setOpenModal(true)
  }
  return (
    <div className="min-h-screen bg-[#f5f7fb] relative">
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 transition-all duration-300">
          {category?.length > 0 && (
            <FloatingButton icon={<FaPlus/>} onClick={handleAddClick} name="Add Category" />
          )}
          {/* CategoryModal for add/edit todo */}
          <CommonCategoryModal
              isOpen={openModal}
              onClose={() => {setOpenModal(false)}}
              initialData={editCategoryData}
              onSubmit={handleSubmit}
          />
          {/* Page title */}
          <h2 className="text-xl sm:text-2xl text-[#ff8b82] font-semibold mb-4">My Categories</h2>
        
          {/* Grid area */}
          <div className="grid gap-4">
            {category?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
                
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3m0 0h3m-3 0v3m0-3V9m9 3A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-semibold text-gray-700">
                  No Catgeory Yet
                </h2>

                <p className="text-sm text-gray-500 max-w-xs mt-1">
                  Looks like you haven't created any category. Start by adding your first one!
                </p>

                <button
                  onClick={handleAddClick}
                  className="mt-6 bg-[#ff8b82] text-white px-6 py-2 rounded-xl hover:bg-[#ff7166] transition-all"
                >
                  Create Category
                </button>

              </div>

            )}
            {category?.length > 0 && category.map((cat) => (
              <CategoryCard
                  key={cat._id}
                  category={cat}
              >
                  {/* edit/delete buttons must NOT trigger modal → stopPropagation() */}
                  <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  <button
                      className="p-2 sm:p-2 text-gray-800 rounded-md flex flex-col items-center hover:bg-[#ff8b82] transition-all duration-200"
                      onClick={() => handleEditClick(cat)}
                  >
                      <FaEdit className="text-gray-800" size={16} />
                      Edit
                  </button>

                  <button
                      className="p-2 sm:p-2 text-gray-800 rounded-md flex flex-col items-center hover:bg-[#ff8b82] transition-all duration-200"
                      onClick={() => handleDeleteClick(cat._id)}
                  >
                      <FaTrash className="text-gray-800" size={16}/>
                      Delete
                  </button>
                  </div>
                </CategoryCard>
              ))
            }
          </div>
        </main>
    </div>
  )
}

export default MyCategory