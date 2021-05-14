import React from "react";
import Sidebar from "../component/sidebar";

export default function Layout(props) {
  return (
    <div className="bg-ligth_gray grid grid-cols-6 h-screen">
      <Sidebar />
      <div className="col-span-5 h-full overflow-y-auto bg-ligth_gray pt-5 px-8">
        {props.children}
      </div>
    </div>
  );
}
