import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoCard from "./components/RepoCard";

function App() {   // ✅ EVERYTHING inside this function

  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const userRes = await axios.get(
          `https://api.github.com/users/${debouncedQuery}`
        );

        const repoRes = await axios.get(
          `https://api.github.com/users/${debouncedQuery}/repos`
        );

        const sortedRepos = repoRes.data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5);

        setUser(userRes.data);
        setRepos(sortedRepos);
      } catch {
        setError(true);
        setUser(null);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <div className="container">
      <h1>GitHub Profile Finder</h1>

      <SearchBar onSearch={setQuery} />

      {loading && <div className="loader"></div>}
      {error && <p>User not found</p>}

      {user && <ProfileCard user={user} />}

      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default App;