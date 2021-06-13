import React from "react";
import { useHistory } from "react-router";
import Sidebar from "../component/sidebar";
import ButtonGoBack from "../component/buttons/goBack";

export function Layout(props) {
  return (
    <div className="bg-ligth_gray grid grid-cols-6">
      <Sidebar />
      <div className="col-span-5 h-screen overflow-y-auto py-6 px-8">
        {props.children}
      </div>
    </div>
  );
}


export function LayoutForm(props) {
  let history = useHistory();
  return (
    <div className="bg-ligth_gray h-screen">
      <div className=" px-4 pb-3 pt-6">
        <ButtonGoBack goBack={history.goBack} />
      </div>
      <div className="flex justify-center items-center" style={{ height: "89%", maxHeight: "90%" }}>
        {props.children}
      </div>
    </div>
  );
}
