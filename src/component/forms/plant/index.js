import React, { useState } from 'react';
import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';
import Select from "react-dropdown-select";
import SubmitButton from '../../buttons/submit';
import { useCategories, useProviders } from '../../../hooks/query';
import { useCreatePLant } from '../../../hooks/mutation/mutation';

export default function PlantForm() {
    const categoryQuery = useCategories();
    const providerQuery = useProviders();
    const [, setChangeImage] = useState(false);
    const [previewImage, setPreviewImage] = useState();
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
    };

    const send = (event) => {
        event.preventDefault();
        createPlant.mutate();
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
                        value={previewImage}
                        onChange={({ target }) => {
                            handleChange({ target: { name: "imagen", value: target.files[0].name } });
                            setChangeImage(true);
                            setPreviewImage(URL.createObjectURL(target.files[0]));
                        }}
                    />
                </div>
                <div className="col-span-4  rounded-r-xl bg-white overflow-y-auto" style={{ height: "32em" }}>
                    <form className="my-7 mx-24" onSubmit={send}>
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
                            </div>
                        </div>
                        <SubmitButton
                            isLoading={createPlant.isLoading}
                            mode={"create"}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
