import React from "react";
export default function HeaderBarTitle({ module }) {
    return (
        <div className="flex justify-start">
            <h3 className="font-bold text-2xl">{module}</h3>
        </div>
    );
}
