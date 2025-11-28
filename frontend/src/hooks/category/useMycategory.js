import { useDispatch } from "react-redux"
import categoryService from "../../services/categoryService"
import { setCategory, addCategory as add, deleteCategory as del, updateCategory as update } from "../../features/category/categorySlice"

function useMycategory() {
  const dispatch = useDispatch()
    const getLatestCat = async() => {
      try {
        const res = await categoryService.fetchAllCategory()
        dispatch(setCategory(res.data))
      } catch (error) {
        console.log(error);
      }
    }
    const deleteCat = async(id) => {
      try {
        await categoryService.deleteCategory(id)
        dispatch(del(id))
      } catch (error) {
        console.log(error);
      }
    }
    const editCat = async (id, categoryData) => {
      try {
        const res = await categoryService.updateCategory(id, categoryData)
        dispatch(update(res.data));
      } catch (error) {
          console.log(error.message);
      }
    }
    const addCat = async (categoryData) => {
      try {
        const res = await categoryService.addNewCategory(categoryData)
        dispatch(add(res.data))
      } catch (error) {
          console.log(error.message);
      }
    }

  return {getLatestCat, deleteCat, editCat, addCat}
}

export default useMycategory
