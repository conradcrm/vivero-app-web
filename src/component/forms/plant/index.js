import React, { useState } from 'react';
import Inputs from '../../data/inputs';
import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';
import Select from "react-dropdown-select";
import { useQuery } from '../../../hooks';

export default function PlantForm() {
    const { dataCategories, statusCategories } = useQuery("api/categories", true, "Categories");
    const { dataProviders, statusProviders } = useQuery("api/providers", true, "Providers");
    const { datos, query } = Inputs("plant", "create");
    const [changeImage, setChangeImage] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [data, setData] = useState(datos);
    let dataC = []
    let dataP = []
    if (statusCategories === "fetched" && dataCategories.data.length > 0) {
        dataC = dataCategories.data
    }

    if (statusProviders === "fetched" && dataProviders.data.length > 0) {
        dataP = dataProviders.data
    }

    const sendData = (event) => {
        event.preventDefault();
        console.log(data)
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
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Modulo planta</h3>
                    <ImageInput
                        value={previewImage}
                        onChange={({ target }) => {
                            handleChange({ target: { name: "imagen", value: target.files[0].name } });
                            setChangeImage(true);
                            setPreviewImage(URL.createObjectURL(target.files[0]));
                        }}
                    />
                </div>
                <div className="col-span-4  rounded-r-xl bg-white overflow-y-auto" style={{ height: "30em" }}>
                    <p className="w-full absolute bg-white mx-28 h-8" style={{ width: "21.5rem" }}></p>
                    <form className="my-7 mx-28" onSubmit={sendData}>
                        <div>
                            <InputText
                                width="21.5rem"
                                style="rounded border-icon_gray border-2 py-2 px-4 text-sm"
                                title="Nombre"
                                required={true}
                                name="nombre"
                                placeholder="Echeveria elegans"
                                value={data.nombre}
                                onChange={handleChange}
                                type="text"
                            />
                            <InputText
                                width="21.5rem"
                                style="rounded border-icon_gray border-2 py-2 px-4 text-sm"
                                title="Precio de compra"
                                marginTop={22}
                                required={true}
                                marginBottom={22}
                                name="precio_compra"
                                placeholder="$120.00"
                                value={data.precio_compra}
                                onChange={handleChange}
                                type="number"
                            />
                            <InputText
                                width="21.5rem"
                                style="rounded border-icon_gray border-2 py-2 px-4 text-sm"
                                title="Precio de venta"
                                required={true}
                                name="precio_venta"
                                placeholder="$240,00"
                                value={data.precio_venta}
                                onChange={handleChange}
                                type="number"
                            />
                            <InputText
                                width="21.5rem"
                                style="rounded border-icon_gray border-2 py-2 px-4 text-sm"
                                title="Cantidad"
                                marginTop={22}
                                required={true}
                                marginBottom={22}
                                name="existencia"
                                placeholder="0"
                                value={data.existencia}
                                onChange={handleChange}
                                type="number"
                            />
                            <div style={{ marginTop: 22, marginBottom: 22 }}>
                                <label className="block mb-2 font-semibold">
                                    Categoría<span className={`ml-1 text-mediumred`}>*</span>
                                </label>
                                <Select
                                    name="id_categoria"
                                    multi={false}
                                    placeholder="Selecionar categoría"
                                    searchable={true}
                                    options={dataC}
                                    labelField="nombre"
                                    valueField="nombre"
                                    disabled={statusCategories === "loading"}
                                    onChange={(value) => {
                                        setData({ ...data, id_categoria: value[0].id_categoria });
                                    }}
                                    values={
                                        dataC.filter((opt) => opt.nombre === data.nombre)
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
                                    options={dataP}
                                    labelField="nombre"
                                    valueField="nombre"
                                    disabled={statusProviders === "loading"}
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
                                    className="rounded border-icon_gray py-1 px-4 text-sm bg-gray w-full"
                                    rows="4"
                                    value={data.descripcion}
                                    onChange={handleChange}
                                    name="descripcion"
                                    placeholder="Es una de las plantas crasas más bonitas y fáciles de cuidar del mundo" />
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
