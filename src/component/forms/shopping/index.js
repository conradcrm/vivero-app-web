import React, { useState } from 'react'
import Inputs from '../../data/inputs';
import InputText from '../../Input/InputText';
import SubmitButton from '../../buttons/submit';
import { useMutation } from '../../../hooks/mutation';
import { useQuery } from 'react-query';
import { getPlants, getProvider } from '../../../hooks/query';
import Select from 'react-dropdown-select';

export default function ShoppingForm({selectedshopping,mode}) {
    const { datos, method ,query } = Inputs("shopping", mode, selectedshopping);
    const [, fetchData] = useMutation(query, "shopping")
    const [data, setData] = useState(datos);
    const [isLoading, setIsLoading] = useState(false);
    
    const PlantQuery = useQuery('plants', getPlants);
    const providerQuery = useQuery('providers', getProvider);
    
    let dataPlant = []
    let dataProv = []
    
    if (PlantQuery.data !== undefined ) {
        dataPlant = PlantQuery.data.data
    }

    if (providerQuery.data !== undefined ) {
        dataProv = providerQuery.data.data
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const send = (event) => {
        event.preventDefault();
        console.log(data, method, query)
        fetchData(method, data, setIsLoading)
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
                <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Módulo compra</h3>
                </div>
                <div className="col-span-4 bg-white rounded-r-xl">
                    <form className="m-auto my-7 mx-24" onSubmit={send}>

                    <div style={{ marginTop: 22, marginBottom: 22, width:"25rem"}}>
                                <label className="block mb-2 font-semibold">
                                    Proveedor<span className={`ml-1 text-mediumred`}>*</span>
                                </label>
                                <Select
                                    name="id_proveedor"
                                    multi={false}
                                    placeholder="Selecionar Proveedor"
                                    searchable={true}
                                    Style={styleSelect}
                                    color= "#000"
                                    options={dataProv}
                                    labelField="nombre"
                                    valueField="nombre"
                                    disabled={providerQuery.isLoading}
                                    onChange={(value) => {
                                        setData({ ...data, id_proveedor: value[0].id_proveedor });
                                    }}
                                    values={
                                        dataProv.filter((opt) => opt.nombre === data.nombre)
                                    }
                                />
                            </div>
                            <div className="flex justify-between items-center gap-4" style={{ marginTop: 22, marginBottom: 22 }}>
                                <div>
                                <label className="block mb-2 font-semibold">
                                    Planta<span className={`ml-1 text-mediumred`}>*</span>
                                </label>    
                                <Select
                                    name="id_planta"
                                    multi={false}
                                    placeholder="Selecionar Planta"
                                    searchable={true}
                                    Style={styleSelect}
                                    color= "#000"
                                    options={dataPlant}
                                    labelField="nombre"
                                    valueField="nombre"
                                    disabled={PlantQuery.isLoading}
                                    onChange={(value) => {
                                        setData({ ...data, id_planta: value[0].id_planta });
                                    }}
                                    values={
                                        dataPlant.filter((opt) => opt.nombre === data.nombre)
                                    }
                                />
                                </div>
                                <InputText
                                    width="9.5rem"
                                    title="Cantidad"
                                    required={true}
                                    name="cantidad"
                                    placeholder="0"
                                    value={data.cantidad}
                                    onChange={handleChange}
                                    type="number"
                                />
                            </div>
                        <SubmitButton
                            isLoading={isLoading}
                            mode={mode}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
