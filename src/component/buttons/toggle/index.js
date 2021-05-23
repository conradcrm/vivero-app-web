import React from 'react'

export default function ToggleButton({activate,click,selected,changeState}) {

    return (
        <div className="flex">
        <button onClick={()=>{changeState(!activate);click(!activate); selected();}} 
                className={`
                px-4 py-1 rounded-3xl flex outline-none border-none focus:outline-none
                ${activate ? "bg-ligthgreen":"bg-darkred"}`}>
                <div
                className={`
                rounded-full h-4 w-4 bg-white
                ${activate ? "bg-ligthgreen transform transition-transform translate-x-3":"bg-darkred transform transition-transform -translate-x-3"}`}></div>
        </button>
        </div>
    )
}
