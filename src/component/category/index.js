import React from "react";
import { useQuery } from "../../hooks";
import ServerError from "../error/server";
import Loading from "../loading";
import LoadingData from "../loading/data/loadingData";
import CategoryItem from "./item";

export default function Categories() {
  const { status, data } = useQuery("api/categories");
  return (
    <>
      {
        status === "error" ? <ServerError /> :
          (
            <div className="grid grid-cols-12 gap-1 w-full bg-white justify-center">
              {
                status === "loading" ? <LoadingData /> : (
                  !data.data.length > 0 ? <p>Aún no hay registros</p> : (
                    <>
                      <div className="col-span-9 bg-white p-6">
                        <div className="grid grid-cols-2 gap-4">
                          {status === "fetched" &&
                            (data.data.length > 0
                              ? data.data.map((category) => <CategoryItem {...category} key={category.id_categoria} class="col-span-1" />)
                              : "")}
                        </div>
                      </div>
                      <div className="col-span-3 bg-white py-3"></div>
                    </>
                  )
                )
              }
            </div>
          )}
    </>
  );
}
