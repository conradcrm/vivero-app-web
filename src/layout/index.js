import React from "react";
import Sidebar from "../component/sidebar";

export default function Layout(props) {
  return (
    <div className="bg-ligth_gray grid grid-cols-6">
      <Sidebar />
      <div className="col-span-5 h-screen overflow-y-auto bg-ligth_gray px-8">
        {props.children}
      </div>
    </div>
  );
}
