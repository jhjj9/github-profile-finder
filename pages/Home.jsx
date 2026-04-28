import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { fetchUser, fetchRepos } from "../services/githubApi";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import RepoCard from "../components/RepoCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query);

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (!debounced) return;

    const load = async () => {
      try {
        const userData = await fetchUser(debounced);
        const repoData = await fetchRepos(debounced);

        const sorted = repoData
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        setUser(userData);
        setRepos(sorted);
      } catch (err) {
        setUser(null);
        setRepos([]);
      }
    };

    load();
  }, [debounced]);

  return (
    <div>
      <SearchBar onSearch={setQuery} />

      {user && <ProfileCard user={user} />}

      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}