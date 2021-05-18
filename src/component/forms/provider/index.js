import React, { useState } from 'react'
import Inputs from '../../data/inputs';
import ImageInput from '../../Input/Image'

export default function ProviderForm() {
    const { data, query } = Inputs("provider", "create");
    const [changeImage, setChangeImage] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [datos, setDatos] = useState(data);

    const sendData = (event) => {
        event.preventDefault();
        console.log(datos)
    };

    const handleInput = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="">
            <div className="h-full grid grid-cols-6 shadow-2xl">
            <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                <h3 className="p-5 px-12 w-full text-center font-semibold text-2xl text-white">Modulo proveedor</h3>
                <ImageInput
                    value={previewImage}
                    onChange={({ target }) => {
                        handleInput({ target: { name: "imagen", value: target.files[0] } });
                        setChangeImage(true);
                        setPreviewImage(URL.createObjectURL(target.files[0]));
                    }}
                />
            </div>
            <div className="col-span-4 bg-white rounded-r-xl">
                
            </div>
        </div>
        </div>
    )
}
