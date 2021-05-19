import React from "react";
import { useQuery } from "../../hooks";
import CategoryItem from "./item";

export default function Categories() {
  const { status, data } = useQuery("api/categories");
  console.log(data);
  return (
    <div className="grid grid-cols-12 gap-1 bg-gray w-full">
      <div className="col-span-9 bg-white p-6">
        <div className="grid grid-cols-2 gap-4">
          {status === "fetched" &&
            (data.data.length > 0
              ? data.data.map((category) => <CategoryItem {...category} key={category.id_categoria} class="col-span-1" />)
              : "")}
        </div>
      </div>
      <div className="col-span-3 bg-white py-3"></div>
    </div>
  );
}
