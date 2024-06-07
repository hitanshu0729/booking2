import React from "react";

const Item = ({ add, title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full h-48 object-cover"
        src={"http://localhost:4000/uploads/" + add}
        alt={title}
      />
      console.log({"http://localhost:4000/uploads/" + add});
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default Item;
