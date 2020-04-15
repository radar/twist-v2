import React from "react";

export default (props: any) => {
  return (
    <div className="bg-gray-200">
      <div className="my-4 mx-auto px-4">
        <menu>
          <a href="#">
            <strong>Twist</strong>
          </a>
          &nbsp; | &nbsp; Signed in as radar
        </menu>
        {props.children}
      </div>
    </div>
  );
};
