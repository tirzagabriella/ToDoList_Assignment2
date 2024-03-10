export const DashboardUserDetail = (props) => {
  const { profilePic, user, onClickUser } = props;

  return (
    <div
      className="flex flex-row items-center p-4 cursor-pointer"
      onClick={() => onClickUser()}
    >
      <img className="user-pic" src={profilePic} alt="Profile" />
      <span className="px-4">Hi {user?.displayName}!</span>
    </div>
  );
};
