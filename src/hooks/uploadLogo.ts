import { useState, useCallback } from "react";

interface UseLogoUploadReturn {
  logoPreview: string;
  logoFile: File | null;
  handleLogoChange: (file: File) => void;
  resetLogo: () => void;
}

export const useLogoUpload = (): UseLogoUploadReturn => {
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleLogoChange = useCallback((file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetLogo = useCallback(() => {
    setLogoPreview("");
    setLogoFile(null);
  }, []);

  return {
    logoPreview,
    logoFile,
    handleLogoChange,
    resetLogo,
  };
};
