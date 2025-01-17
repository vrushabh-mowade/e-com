import { useState, useEffect } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    console.log(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="flex items-center object-cover rounded-lg border border-black focus:border-blue-500">
      <div className="relative">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-64 px-4 py-1 h-8 text-sm text-gray-900 bg-searchbarbgcolor rounded-lg"
        />
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-black hover:text-amber-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
