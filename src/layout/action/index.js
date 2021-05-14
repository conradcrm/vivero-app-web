import React from "react";
import { useHistory } from "react-router";
import ButtonGoBack from "../../component/buttons/goBack";

export default function LayoutAction(props) {
  let history = useHistory();

  return (
    <div className="bg-ligth_gray h-screen">
      <div className= "w-full h-14 flex">
        <ButtonGoBack goBack={history.goBack}/>
      </div>
      <div className="flex justify-center items-center m-2 h-full">
        {props.children}
      </div>
    </div>
  );
}
