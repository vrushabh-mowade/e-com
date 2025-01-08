import { useState } from "react";

const FilterCheckboxItem = ({ label }: { label: string }) => {
  return (
    <>
      <li id="" className="flex items-center">
        <input
          type="checkbox"
          className="appearance-none w-3 h-3 mx-2 border-1 border-slate-600 rounded-sm checked:bg-amber-600 checked:border-amber-600 hover:border-amber-600 
                                    checked:before:content-['✓'] checked:before:text-white checked:before:block checked:before:text-center checked:before:font-bold flex items-center justify-center "
        />
        <span>{label}</span>
      </li>
    </>
  );
};

const CategoryFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="relative flex items-center h-42 w-full shadow-md">
        <button
          onClick={toggleDropdown}
          className="flex items-center mx-2 gap-2"
        >
          {isDropdownOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
          <span className="font-mono font-medium text-lg">Category</span>
        </button>
        {isDropdownOpen && (
          <>
            <div className=" absolute left-0 top-6 px-11 py-2 w-full bg-white shadow-md">
              <ul>
                <FilterCheckboxItem label="Men" />
                <FilterCheckboxItem label="Womans" />
                <FilterCheckboxItem label="Boys" />
                <FilterCheckboxItem label="Infant" />
                <FilterCheckboxItem label="Girls" />
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryFilter;
