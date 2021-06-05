import React, { useState } from 'react'
import Inputs from '../../data/inputs';
import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';
import SubmitButton from '../../buttons/submit';
import { useCreateProvider } from '../../../hooks/mutation/mutation';

export default function ProviderForm({selectedProvider,mode}) {
    const { datos } = Inputs("provider", mode, selectedProvider);
    const [, setChangeImage] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [data, setData] = useState(datos);
    const createProvider = useCreateProvider(data);
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const send = (event) => {
        event.preventDefault();
        createProvider.mutate();
    };

    return (
        <div className="flex w-full justify-center">
            <div className="h-full flex grid-cols-6 shadow-2xl">
                <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Módulo proveedor</h3>
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
                    <form className="m-auto my-7 mx-28" onSubmit={send}>
                        <div>
                            <InputText
                                width="21.5rem"
                                title="Nombre"
                                required={true}
                                name="nombre"
                                placeholder="Invernadero San Ángel"
                                value={data.nombre}
                                onChange={handleChange}
                                type="text"
                            />
                            <InputText
                                width="21.5rem"
                                marginTop={22}
                                required={true}
                                marginBottom={22}
                                title="Dirección"
                                name="direccion"
                                placeholder="Avenida las Golondrinas No 12"
                                value={data.direccion}
                                onChange={handleChange}
                                type="text"
                            />
                            <InputText
                                width="21.5rem"
                                title="Teléfono"
                                required={true}
                                name="telefono"
                                placeholder="XXXXXXXXXX"
                                value={data.telefono}
                                onChange={handleChange}
                                type="text"
                            />
                            <InputText
                                width="21.5rem"
                                title="Correo electrónico"
                                marginTop={22}
                                required={true}
                                marginBottom={22}
                                name="correo"
                                placeholder="sanangel12@gmail.com"
                                value={data.correo}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <SubmitButton
                            isLoading={createProvider.isLoading}
                            mode={mode}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
