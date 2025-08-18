// "use client";

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar, MapPin } from "lucide-react";
// import Image from "next/image";
// import { sampeImage } from "@/public";

// const MatchCard: React.FC = () => {
//   return (
//     <Card className="w-full sm:w-[290px] md:w-[290px] h-[466px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
//       {/* Header */}
//       <div className="bg-gray-200 flex items-center px-6 py-3">
//         <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//           {/* Gambar */}
//         </div>
//         <span className="font-medium text-gray-800 px-7">Green Club</span>
//       </div>

//       {/* Event image */}
//       <div className="w-full h-[180px] relative">
//         <Image
//           src={sampeImage}
//           alt="Tennis Thursday Night"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Content */}
//       <CardContent className="flex flex-col justify-between flex-1 p-4">
//         <div className="space-y-3">
//           <p className="font-bold text-base text-black">
//             Tennis Thursday Night
//           </p>
//           <div className="flex items-center text-sm text-gray-600 gap-2">
//             <Calendar size={16} />
//             <span className="font-semibold">30 April, 19:15</span>
//           </div>
//           <div className="flex items-center text-sm text-gray-600 gap-2">
//             <MapPin size={16} />
//             <span className="font-semibold">Smes Sport Bintaro</span>
//           </div>
//         </div>
//         <Button className="mt-4 w-full bg-background-button-rc text-white rounded-lg">
//           View
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default MatchCard;

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { sampeImage } from "@/public";

const MatchCard: React.FC = () => {
  return (
    <Card className="w-full sm:w-[290px] md:w-[290px] h-[466px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* Header */}
      <div className="bg-gray-200 flex items-center px-6 py-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {/* Gambar */}
        </div>
        <span className="font-medium text-gray-800 px-7">Green Club</span>
      </div>

      {/* Event image */}
      <div className="w-full h-[180px] relative">
        <Image
          src={sampeImage}
          alt="Tennis Thursday Night"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className="flex flex-col justify-between flex-1 p-4">
        <div className="space-y-3">
          <p className="font-bold text-base text-black">
            Tennis Thursday Night
          </p>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <Calendar size={16} />
            <span className="font-semibold">30 April, 19:15</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <MapPin size={16} />
            <span className="font-semibold">Smes Sport Bintaro</span>
          </div>
        </div>
        <Button className="mt-4 w-full bg-background-button-rc text-white rounded-lg">
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
