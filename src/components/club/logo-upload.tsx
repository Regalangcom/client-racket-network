import React from "react";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

interface LogoUploadProps {
  logoPreview: string;
  onLogoChange: (file: File) => void;
  label?: string;
}

const DEFAULT_LOGO =
  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 150%22%3E%3Crect fill=%22%2388c057%22 width=%22400%22 height=%22150%22/%3E%3Cpath fill=%22%2376b34a%22 d=%22M0,75 Q100,50 200,75 T400,75 L400,150 L0,150 Z%22/%3E%3Cpath fill=%22%23a8d47f%22 d=%22M0,90 Q100,70 200,90 T400,90 L400,150 L0,150 Z%22/%3E%3Ccircle fill=%22%23ff6b6b%22 cx=%2250%22 cy=%2260%22 r=%2212%22/%3E%3Cpath fill=%22%23ffd93d%22 d=%22M100,30 L110,50 L130,50 L115,65 L120,85 L100,70 L80,85 L85,65 L70,50 L90,50 Z%22/%3E%3C/svg%3E')";

export const LogoUpload: React.FC<LogoUploadProps> = ({
  logoPreview,
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
            backgroundImage: logoPreview ? `url(${logoPreview})` : DEFAULT_LOGO,
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
