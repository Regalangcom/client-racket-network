import React from "react";

// Interface untuk menerima props
interface InputErrorProps {
  error?: string;
}

const InputError: React.FC<InputErrorProps> = ({ error }) => {
  if (!error) return null;

  return <p className="text-destructive text-xs">{error}</p>;
};

export default InputError;
