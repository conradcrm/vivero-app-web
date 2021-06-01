import React, { useState } from 'react'
import Inputs from '../../data/inputs';
import SubmitButton from '../../buttons/submit';
import { useMutation } from '../../../hooks/mutation';
import { useQuery } from 'react-query';
import { getPlants, getProvider } from '../../../hooks/query';
import Select from 'react-dropdown-select';
import DynamicInputs from '../../dynamicInput';

export default function ShoppingForm({selectedshopping,mode}) {
    const { datos, method ,query } = Inputs("shopping", mode, selectedshopping);
    const [, fetchData] = useMutation(query, "shopping")
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({id_proveedor:undefined, inputs:undefined});
    
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

    const send = (event) => {
        event.preventDefault();
        console.log(method, query)
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
                <div className="col-span-4 bg-white rounded-r-xl overflow-y-auto overflow-x-auto" style={{ maxHeight: "32em" }}>
                    <form className="m-auto my-7 mx-20" onSubmit={send} >
                            <div style={{ marginTop: 22, marginBottom: 22}}>
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
                            <DynamicInputs 
                                plantas={dataPlant} 
                                isLoading={PlantQuery.isLoading}
                                data={data}
                                setData= {setData}
                                />
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
