const colors = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  TypeScript: "#2b7489",
  C: "#555555",
  Cpp: "#f34b7d",
};

export default function LanguageBadge({ language }) {
  return (
    <span
      style={{
        backgroundColor: colors[language] || "#999",
        padding: "4px 8px",
        borderRadius: "8px",
        color: "#fff",
      }}
    >
      {language}
    </span>
  );
}