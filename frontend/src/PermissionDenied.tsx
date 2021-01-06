import React from "react";

const PermissionDenied = () => {
  return (
    <div
      className={`bg-white p-4 border-gray-400 border rounded md:w-1/2 text-red-600`}
    >
      You do not have permission to see that book.
    </div>
  );
};

export default PermissionDenied;
