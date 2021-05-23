import React from "react";
import CategoryItem from "./item";

export default function Categories({ data }) {
  return (
    <div className="w-full bg-white rounded-lg p-8">
      <div className="grid grid-cols-4 gap-3">
        {data.length > 0
          ? data.map((category) => <CategoryItem {...category} key={category.id_categoria} />)
          : ""}
      </div>
    </div>
  );
}