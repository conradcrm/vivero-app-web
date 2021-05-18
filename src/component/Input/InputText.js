import React from 'react'

export default function InputText({width, title, name, placeholder, value, onChange, type, style, marginTop, marginBottom, required}) {
    return (
        <div style={{marginTop:marginTop, marginBottom:marginBottom}}>
            <label className="block mb-2 font-semibold">
                {title}<span className={`ml-1 ${required ? "text-mediumred":"hidden"}`}>*</span>
            </label>
            <input
                style={{width:width}}
                className={style}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                type={type}
            />
        </div>
    )
}
