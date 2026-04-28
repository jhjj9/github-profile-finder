import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  return (
    <input
      type="text"
      placeholder="Search GitHub username..."
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
        onSearch(e.target.value);
      }}
      className="search-box"
    />
  );
}