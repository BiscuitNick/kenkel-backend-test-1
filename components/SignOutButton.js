export const SignOutButton = ({ setUser }) => {
  return <button onClick={() => setUser(null)}>SignOut</button>;
};
