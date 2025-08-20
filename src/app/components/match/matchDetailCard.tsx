import Image from "next/image";
import { Calendar, MapPin, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimeSelector from "@/app/components/match/timeSelector";

interface MatchDetailCardProps {
  title: string;
  logo: string;
  date: string;
  location: string;
  price: string;
  club: string;
  description: string;
  times: string[];
}

const MatchDetailCard: React.FC<MatchDetailCardProps> = ({
  title,
  logo,
  date,
  location,
  price,
  club,
  description,
  times,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
      {/* Left side image */}
      <div className="w-full sm:w-[40%] flex justify-center items-center">
        <Image
          src={logo}
          alt={`${title} logo`}
          width={600}
          height={400}
          className="rounded-2xl object-cover w-full h-full"
          priority
        />
      </div>

      {/* Right side content */}
      <div className="w-full sm:w-[60%] bg-white p-6 rounded-3xl shadow-md">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-green-600" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-5 h-5 text-green-600" />
            <span>{price}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5 text-green-600" />
            <span>{club}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{description}</p>

        {/* Times */}
        <TimeSelector times={times} />

        {/* Join button */}
        <Button className="w-full py-3 bg-background-button-rc text-white font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2">
          Join
        </Button>
      </div>
    </div>
  );
};

export default MatchDetailCard;
