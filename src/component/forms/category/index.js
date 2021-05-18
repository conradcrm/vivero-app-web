import React, { useState } from 'react'
import Inputs from '../../data/inputs';
import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';

export default function CategoryForm() {
    const { datos, query } = Inputs("category", "create");
    const [changeImage, setChangeImage] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [data, setData] = useState(datos);

    const sendData = (event) => {
        event.preventDefault();
        mutation()
    }; 

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    async function mutation() {
        await fetch(query, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                response.json();
            })
            .catch((err) => {
            });
    }


    return (
        <div className="flex w-full justify-center">
            <div className="h-full flex grid-cols-6 shadow-2xl">
                <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Modulo categoría</h3>
                    <ImageInput
                        value={previewImage}
                        onChange={({ target }) => {
                            handleChange({ target: { name: "imagen", value: target.files[0].name } });
                            setChangeImage(true);
                            setPreviewImage(URL.createObjectURL(target.files[0]));
                        }}
                    />
                </div>
                <div className="col-span-4 bg-white rounded-r-xl">
                    <form className="m-auto my-7 mx-28" onSubmit={sendData}>
                        <div>
                            <InputText
                                width="21.5rem"
                                style="rounded border-icon_gray border-2 py-2 px-4 text-sm"
                                title="Nombre"
                                required={true}
                                name="nombre"
                                placeholder="Suculentas"
                                value={data.nombre}
                                onChange={handleChange}
                                type="text"
                            />
                            <div style={{ marginTop: 22, marginBottom: 22 }}>
                                <label className="block mb-2 font-semibold">
                                    Decripción<span className={`ml-1 text-mediumred`}>*</span>
                                </label>
                                <textarea
                                    className="rounded border-icon_gray py-1 px-4 text-sm bg-gray w-full"
                                    rows="9"
                                    value={data.descripcion}
                                    onChange={handleChange}
                                    name="descripcion"
                                    placeholder="Las suculentas son plantas perfectas para decorrar por su elegante forma" />

                            </div>
                        </div>
                        <button className="bg-mediumgreen block text-lg w-full mt-8 py-2 rounded text-white font-semibold hover:bg-darkgreen">
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
