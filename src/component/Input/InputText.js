import React from 'react'

export default function InputText({width, title, name, placeholder, value, onChange, type, marginTop, marginBottom, required}) {
    return (
        <div style={{marginTop:marginTop, marginBottom:marginBottom}}>
            <label className="block mb-2 font-semibold">
                {title}<span className={`ml-1 ${required ? "text-mediumred":"hidden"}`}>*</span>
            </label>
            <input
                style={{width:width}}
                className="rounded border-icon_gray border-2 py-2 px-4 text-sm"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                type={type}
                min="0"
            />
        </div>
    )
}
