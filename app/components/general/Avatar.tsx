import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
  image?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
  if (image) {
    return (
      <div className="relative w-7 h-7 rounded-full overflow-hidden">
        <Image src={image} alt="Avatar" fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="text-gray-500">
      <RxAvatar size={24} />
    </div>
  );
};

export default Avatar;