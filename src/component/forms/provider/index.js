import React, { useState } from 'react'
//import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';
import SubmitButton from '../../buttons/submit';
import { useCreateProvider } from '../../../hooks/mutation/mutation';
//import { handleUpload } from '../../../files';
import providerImg from '../../../resources/provider.svg';

export default function ProviderForm() {
    //  const [, setChangeImage] = useState(false);
    //    const [previewImage, setPreviewImage] = useState();
    //   const [file, setFile] = useState();

    const [data, setData] = useState({
        nombre: "",
        direccion: "",
        telefono: "",
        correo: "",
        imagen: "",
    });

    const createProvider = useCreateProvider(data);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    // function handleChangeFile(target) {
    //     setFile(target.files[0]);
    // }

    const send = (event) => {
        event.preventDefault();
        //handleUpload(file);
        createProvider.mutate();
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
                    {/* <ImageInput
                        value={previewImage}
                        onChange={({ target }) => {
                            handleChange({ target: { name: "imagen", value: target.files[0].name } });
                            setChangeImage(true);
                            handleChangeFile(target)
                            setPreviewImage(URL.createObjectURL(target.files[0]));
                        }}
                    /> */}
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
                            mode={"create"}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
