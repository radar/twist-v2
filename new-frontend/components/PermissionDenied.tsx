import React from "react";

export type PermissionDeniedType = { __typename?: "PermissionDenied" };

export const isDeniedPermission = (object: any): object is PermissionDeniedType => {
  return true;
}


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
