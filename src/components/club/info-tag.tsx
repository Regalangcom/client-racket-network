// /components/InfoTag.tsx
import Image, { StaticImageData } from "next/image";

type InfoTagProps = {
  icon: StaticImageData;
  label: string | number;
};

const InfoTag: React.FC<InfoTagProps> = ({ icon, label }) => (
  <div className="flex items-center gap-1">
    <Image src={icon} alt="icon" width={16} height={16} />
    <span>{label}</span>
  </div>
);

export default InfoTag;
