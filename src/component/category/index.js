import React from "react";
import CategoryItem from "./item";

export default function Categories({ data }) {
  return (
    <div className="grid grid-cols-12 gap-1 w-full bg-white justify-center">
      <div className="col-span-9 bg-white p-6">
        <div className="grid grid-cols-3 gap-8">
          {data.length > 0
            ? data.map((category) => <CategoryItem {...category} key={category.id_categoria} className="col-span-1" />)
            : ""}
        </div>
      </div>
      <div className="col-span-3 bg-white py-3"></div>
    </div>
  );
}