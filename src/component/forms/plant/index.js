import React, { useState } from 'react';
import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';
import Select from "react-dropdown-select";
import SubmitButton from '../../buttons/submit';
import { useCategories, useProviders } from '../../../hooks/query';
import { useCreatePLant } from '../../../hooks/mutation/mutation';
import { inputsValidate3 } from '../../validations';
import { notify } from '../../notification';
import storage from "../../../firebase.js";

export default function PlantForm() {
    const categoryQuery = useCategories();
    const providerQuery = useProviders();
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState();
    const [file, setFile] = useState();

    const [messageE,] = useState({
        name: "",
        description: "",
        p_venta: "",
        p_compra: "",
        image: "",
        result: false,
    })

    const [data, setData] = useState({
        nombre: "",
        descripcion: "",
        precio_venta: "",
        precio_compra: "",
        imagen: "",
        id_categoria: undefined,
        id_proveedor: undefined,
    });

    const createPlant = useCreatePLant(data);
    let dataC = []
    let dataP = []

    if (categoryQuery.data !== undefined) {
        dataC = categoryQuery.data.data
    }

    if (providerQuery.data !== undefined) {
        dataP = providerQuery.data.data
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        inputsValidate3([event.target.name], event.target.value, messageE);
    };

    function handleChangeFile(target) {
        setFile(target.files[0]);
    }

    function handleUploadFile(event) {
        setIsLoading(true)
        event.preventDefault();
        if (previewImage) {
            try {
                const uploadTask = storage.ref(`/images/${file.name}`).put(file);
                uploadTask.on("state_changed", snapshot => {
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
                }, error => {
                    setIsLoading(false)
                    notify("error", `Ha ocurrido un error al intentar subir la imagen, inténtelo más tarde. ${error}`)
                },
                    () => {
                        storage.ref("images").child(file.name).getDownloadURL()
                            .then(url => {
                                setData({ ...data, imagen: url })
                                sendData()
                            });
                    }
                );
            } catch (error) {
                setIsLoading(false)
                notify("error", "Ha ocurrido un error al intentar subir la imagen, inténtelo más tarde.")
            }
        } else {
            sendData()
        }
    };


    function sendData() {
        if (messageE.result) {
            if (data.id_categoria !== undefined) {
                if (data.id_proveedor !== undefined) {
                    createPlant.mutate();
                    if (!createPlant.isLoading) {
                        setIsLoading(false)
                    }
                }
                else {
                    notify("info", "Seleccione un proveedor")
                }
            }
            else {
                notify("info", "Seleccione una categoría")
            }
        }
        else {
            notify("info", "La información ingresada no es válida.")
        }
        setIsLoading(false)
    };

    const styleSelect = {
        borderRadius: "0.25rem",
        borderWidth: "2px",
        borderColor: "rgba(194, 207, 224, var(--tw-border-opacity));",
        padding: "0.5rem 1rem 0.5rem 1rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
    };

    return (
        <div className="flex w-full justify-center">
            <div className="h-full flex grid-cols-6 shadow-2xl">
                <div className=" bg-mediumgreen col-span-2 rounded-l-xl px-8">
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Módulo planta</h3>
                    <ImageInput
                        value={previewImage ? previewImage : data.imagen}
                        preview={previewImage}
                        text="Seleccione una imagen"
                        cancel={() => setPreviewImage(undefined)}
                        onChange={({ target }) => {
                            handleChange(
                                { target: target.name && { name: "imagen", value: target.files[0].name } }
                            );
                            handleChangeFile(target)
                            if (target.files.length !== 0) {
                                setPreviewImage(URL.createObjectURL(target.files[0]));
                            }
                        }}
                    />
                </div>
                <div className="col-span-4  rounded-r-xl bg-white overflow-y-auto" style={{ height: "32em" }}>
                    <form className="my-7 mx-24" onSubmit={handleUploadFile}>
                        <div>
                            <InputText
                                width="21.5rem"
                                title="Nombre"
                                required={true}
                                name="nombre"
                                placeholder="Echeveria elegans"
                                value={data.nombre}
                                onChange={handleChange}
                                type="text"
                                message={messageE.name}
                            />
                            <div className="flex justify-between" style={{ marginTop: "22px" }}>
                                <InputText
                                    width="9.5rem"
                                    title="Precio de compra"
                                    required={true}
                                    name="precio_compra"
                                    placeholder="120.00"
                                    value={data.precio_compra}
                                    onChange={handleChange}
                                    type="number"
                                    message={messageE.p_compra}
                                />
                                <InputText
                                    width="9.5rem"
                                    title="Precio de venta"
                                    required={true}
                                    name="precio_venta"
                                    placeholder="240.00"
                                    value={data.precio_venta}
                                    onChange={handleChange}
                                    type="number"
                                    message={messageE.p_venta}
                                />
                            </div>
                            {/* <InputText
                                width="21.5rem"
                                title="Cantidad"
                                marginTop={22}
                                required={false}
                                marginBottom={22}
                                name="cantidad"
                                placeholder="0"
                                value={data.cantidad}
                                onChange={handleChange}
                                type="number"
                            /> */}
                            <div style={{ marginTop: 22, marginBottom: 22 }}>
                                <label className="block mb-2 font-semibold">
                                    Categoría<span className={`ml-1 text-mediumred`}>*</span>
                                </label>
                                <Select
                                    name="id_categoria"
                                    multi={false}
                                    placeholder="Selecionar categoría"
                                    searchable={true}
                                    color="#000"
                                    Style={styleSelect}
                                    options={dataC}
                                    labelField="nombre"
                                    valueField="nombre"
                                    disabled={categoryQuery.isLoading}
                                    onChange={(value) => {
                                        setData({ ...data, id_categoria: value[0].id_categoria });
                                    }}
                                    values={
                                        dataC.filter((opt) => opt.nombre === dataC.nombre)
                                    }
                                />
                            </div>
                            <div style={{ marginTop: 22, marginBottom: 22 }}>
                                <label className="block mb-2 font-semibold">
                                    Proveedor<span className={`ml-1 text-mediumred`}>*</span>
                                </label>
                                <Select
                                    name="id_proveedor"
                                    multi={false}
                                    placeholder="Selecionar Proveedor"
                                    searchable={true}
                                    Style={styleSelect}
                                    color="#000"
                                    options={dataP}
                                    labelField="nombre"
                                    valueField="nombre"
                                    disabled={providerQuery.isLoading}
                                    onChange={(value) => {
                                        setData({ ...data, id_proveedor: value[0].id_proveedor });
                                    }}
                                    values={
                                        dataP.filter((opt) => opt.nombre === data.nombre)
                                    }
                                />

                            </div>
                            <div style={{ marginTop: 22, marginBottom: 22 }}>
                                <label className="block mb-2 font-semibold">
                                    Decripción<span className={`ml-1 text-mediumred`}>*</span>
                                </label>
                                <textarea
                                    className="rounded resize-none border-icon_gray py-1 px-4 text-sm bg-gray w-full"
                                    rows="4"
                                    value={data.descripcion}
                                    onChange={handleChange}
                                    name="descripcion"
                                    placeholder="Es una de las plantas crasas más bonitas y fáciles de cuidar del mundo" />
                                <span className="block text-mediumred text-sm font-medium pt-0.5">{messageE.description}</span>
                            </div>
                        </div>
                        <SubmitButton
                            isLoading={createPlant.isLoading || isLoading}
                            mode={"create"}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
