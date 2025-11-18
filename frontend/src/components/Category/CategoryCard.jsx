const CategoryCard = ({name, children, onClick}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-50 p-4 rounded-lg mb-4 shadow hover:shadow-md transition cursor-pointer border-l-4 `}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{name}</h4>
        </div>

        {/* Slot for edit/delete buttons */}
        {children}
      </div>
    </div>
  );
};

export default CategoryCard;
