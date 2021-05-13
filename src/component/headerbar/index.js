import React from "react";
export default function HeaderBar({module, name, isHidden}) {
  return (
    <div>
      <div class="flex justify-between">
        <h3>{module}</h3>
        <button className={`${isHidden ? "invisible" : "visible"}`}>
            {name}
        </button>
      </div>
    </div>
  );
}
