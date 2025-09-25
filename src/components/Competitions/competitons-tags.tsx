// /components/CompetitionTag.tsx
import Image from "next/image";
import { IconsCompetitonsProps } from "@/constant/types";

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
