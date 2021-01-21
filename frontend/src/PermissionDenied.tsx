import React from "react";

const PermissionDenied: React.FC = ({ children }) => {
  return (
    <div
      className={`bg-white p-4 border-gray-400 border rounded md:w-1/2 text-red-600`}
    >
      {children || "You do not have permission to see that book."}
    </div>
  );
};

export default PermissionDenied;
