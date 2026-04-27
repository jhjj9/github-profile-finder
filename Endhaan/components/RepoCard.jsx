import LanguageBadge from "./LanguageBadge";

export default function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>

      <div className="repo-meta">
        ⭐ {repo.stargazers_count}
        🍴 {repo.forks_count}
      </div>

      {repo.language && <LanguageBadge language={repo.language} />}
    </div>
  );
}
