import Image from "next/image";

interface UserPictureWithNameProps {
  username: string;
  pictureUrl?: string;
}

export const UserPictureWithName = ({
  username,
  pictureUrl = "https://randomuser.me/api/portraits/men/21.jpg", // Default picture URL if none provided
}: UserPictureWithNameProps) => {
  return (
    <div className="flex flex-row items-center">
      <Image
        src={pictureUrl}
        alt="user profil"
        className="rounded-full w-10 h-10"
        width={100}
        height={100}
      />
      <span className="ml-2 text-lg font-semibold">{username}</span>
    </div>
  );
};
