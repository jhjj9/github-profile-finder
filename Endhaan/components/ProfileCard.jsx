export default function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <img src={user.avatar_url} alt="avatar" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <div>
        👥 {user.followers} | Following {user.following}
      </div>
    </div>
  );
}