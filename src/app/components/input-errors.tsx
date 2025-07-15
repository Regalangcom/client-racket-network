import React from "react";

// Interface untuk menerima props
interface InputErrorProps {
  error?: string;
}

const InputError: React.FC<InputErrorProps> = ({ error }) => {
  if (!error) return null;

  return <p className="text-destructive text-sm mt-1">{error}</p>;
};

export default InputError;
