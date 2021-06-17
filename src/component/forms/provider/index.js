import React, { useState } from 'react'
import InputText from '../../Input/InputText';
import SubmitButton from '../../buttons/submit';
import { useCreateProvider } from '../../../hooks/mutation/mutation';
import providerImg from '../../../resources/provider.svg';
import { inputsValidate2 } from '../../validations';
import { notify } from '../../notification';

export default function ProviderForm() {
    
    const [messageE,] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        result: false,
    })

    const [data, setData] = useState({
        nombre: "",
        direccion: "",
        telefono: "",
        correo: "",
    });

    const createProvider = useCreateProvider(data);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        inputsValidate2([event.target.name], event.target.value, messageE);
    };

    const send = (event) => {
        event.preventDefault();
        if (messageE.result) {
            createProvider.mutate();
        }
        else {
            notify("info", "La información ingresada no es válida.")
        }
    };

    return (
        <div className="flex w-full justify-center">
            <div className="h-full flex grid-cols-6 shadow-2xl">
                <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Módulo proveedor</h3>
                    <div className="my-6 relative w-full h-64" style={{ textAlign: "-webkit-center" }}>
                        <img
                            className=""
                            width={200}
                            src={providerImg}
                            alt="Nuevos proveedores"
                        />
                        <p className="w-4/5 mt-4 text-sm text-white">Agrega a un proveedor más a tu equipo</p>
                    </div>
                    
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
                                message={messageE.name}
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
                                message={messageE.address}
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
                                message={messageE.phone}
                                max={10}
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
                                message={messageE.email}
                            />
                        </div>
                        <SubmitButton
                            isLoading={createProvider.isLoading}
                            mode={"create"}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
