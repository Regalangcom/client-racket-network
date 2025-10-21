import React from "react";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { DEFAULT } from "@/public";

interface LogoUploadProps {
  pictureUrl?: string;
  onLogoChange: (file: File) => void;
  label?: string;
}

const DEFAULT_LOGO = DEFAULT.src;

export const LogoUpload: React.FC<LogoUploadProps> = ({
  pictureUrl,
  onLogoChange,
  label = "Club Logo",
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-normal text-gray-700">{label}</Label>
      <div className="relative">
        <div
          onClick={handleClick}
          className="w-full h-20 rounded-lg overflow-hidden cursor-pointer relative hover:opacity-90 transition-opacity"
          style={{
            backgroundImage: pictureUrl ? `url(${pictureUrl})` : DEFAULT_LOGO,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-7 right-40 bg-gray-300 rounded-full p-1.5 hover:bg-gray-400 transition-colors">
            <Pencil className="w-4 h-4 text-[#174038]" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
