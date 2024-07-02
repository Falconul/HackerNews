import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "flowbite";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action
    navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) onSearch(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', padding:'10px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="search here"
        style={{ marginLeft: "50px", color: "gray", borderRadius: "5px" }}
      />
      <button
        type="submit"
        style={{ marginLeft: "10px" }}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Search
      </button>
    </form>
  );
  
}
