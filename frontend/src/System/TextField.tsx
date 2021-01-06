import React from "react";

type TextFieldProps = {
  label: string;
  placeholder?: string;
};

const TextField: React.FC<TextFieldProps> = ({ label, placeholder }) => {
  return (
    <label className="block font-bold mb-2">
      <div>{label}</div>
      <input
        placeholder={placeholder}
        type="text"
        className="w-full py-3 px-2 focus:border-blue-400 border rounded outline-none"
      />
    </label>
  );
};

export default TextField;
