import React from 'react'

export default function InputText({width, title, name, placeholder, value, onChange, type, marginTop, marginBottom, required, message, max, automcomplete}) {
    return (
        <div style={{marginTop:marginTop, marginBottom:marginBottom}}>
            <label className="block mb-2 font-semibold">
                {title}<span className={`ml-1 ${required ? "text-mediumred":"hidden"}`}>*</span>
            </label>
            <input
                style={{width:width}}
                className={`noscroll rounded border-icon_gray py-2 px-4 text-sm
                border border-transparent focus:outline-none focus:ring-1 focus:ring-gray focus:border-transparent
                `}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                type={type}
                min="1"
                max={max}
                autoComplete={automcomplete}
            />
            <span className="block text-mediumred text-sm font-medium pt-0.5">{message}</span>
        </div>
    )
}
