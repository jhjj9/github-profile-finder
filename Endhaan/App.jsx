import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

function App() {
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
      } catch (err) {
        setError(true);
        setUser(null);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="container">
      <h1>GitHub Profile Finder</h1>

      <input
        className="search-box"
        placeholder="Search GitHub username..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <div className="loader"></div>}
      {error && <p className="message">User not found</p>}

      {user && (
        <div className="profile-card">
          <img src={user.avatar_url} />
          <div className="profile-info">
            <h2>{user.name || user.login}</h2>
            <p>{user.bio}</p>

            <div className="stats">
              <span className="stat">👥 {user.followers}</span>
              <span className="stat">📦 {user.public_repos}</span>
            </div>
          </div>
        </div>
      )}

      <div className="repo-grid">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h3>{repo.name}</h3>

            <div className="repo-meta">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>

            {repo.language && (
              <span className="badge">{repo.language}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;