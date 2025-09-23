// /components/CompetitionTag.tsx
import Image, { StaticImageData } from "next/image";

type IconsCompetitonsProps = {
  icon: StaticImageData;
  label: string | number;
  textClass?: string;
  containerClass?: string;
};

const CompetitionTag: React.FC<IconsCompetitonsProps> = ({
  icon,
  label,
  textClass,
  containerClass,
}) => (
  <div
    className={`flex items-center font-semibold gap-3 text-black ${containerClass}`}
  >
    <Image src={icon} alt="icon" width={16} height={16} />
    <span className={textClass}>{label}</span>
  </div>
);

export default CompetitionTag;
