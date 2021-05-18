import React from "react";
import { useHistory } from "react-router";
import ButtonGoBack from "../../component/buttons/goBack";

export default function LayoutAction(props) {
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
