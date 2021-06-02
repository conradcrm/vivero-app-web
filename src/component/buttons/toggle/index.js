import React from 'react'

export default function ToggleButton({activate,click,selected,changeState}) {

    return (
        <div className="flex">
        <button onClick={()=>{changeState(!activate);click(!activate); selected();}} 
                className={`
                px-3 rounded-3xl flex outline-none border-none focus:outline-none
                ${activate ? "bg-ligthgreen":"bg-darkred"}`}>
                <div
                style={{marginTop:"0.1rem", marginBottom: "0.1rem"}}
                className={`
                rounded-full h-4 w-4 bg-white
                ${activate ? "bg-ligthgreen transform transition-transform translate-x-3 mr-0.5":"bg-darkred transform transition-transform -translate-x-3 ml-0.5"}`}></div>
        </button>
        </div>
    )
}
