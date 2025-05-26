export interface UserProfileProps {
  uuid: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ uuid }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="font-bold text-2xl">User Profile</h1>
      <p className="text-lg">UUID: {uuid}</p>
    </div>
  );
};

export default UserProfile;
