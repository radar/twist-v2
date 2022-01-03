import React from "react";

const PermissionDenied: React.FC = ({ children }) => {
  return (
    <div
      className={`text-red-600`}
    >
      {children || "You do not have permission to see that book."}
    </div>
  );
};

export default PermissionDenied;
