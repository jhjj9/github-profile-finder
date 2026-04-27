const BASE_URL = "https://api.github.com/users";

export const fetchUser = async (username) => {
  const res = await fetch(`${BASE_URL}/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

export const fetchRepos = async (username) => {
  const res = await fetch(`${BASE_URL}/${username}/repos`);
  if (!res.ok) throw new Error("Repo fetch failed");
  return res.json();
};